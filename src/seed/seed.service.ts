import { PokemonResponse } from './interfaces/pokemon-response.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/api/api.service';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly apiService: ApiService,
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async runSeed() {
    await this.pokemonModel.deleteMany();

    const { results } = await this.apiService
      .fetchDataFromExternalApi<PokemonResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=1000',
        {},
      )
      .toPromise();

    const pokemonToInsert = results.map(({ name, url }) => {
      const number = Number(url.split('/')[url.split('/').length - 2]);

      return {
        name,
        number,
      };
    });

    this.pokemonModel.insertMany(pokemonToInsert);

    return pokemonToInsert;
  }
}
