import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common';

const DUPLICATED_ITEM_ERROR_CODE = 11000;

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error: any) {
      this.handleExceptions(error);
    }
  }

  async findAll({ limit = 10, offset = 0 }: PaginationDto) {
    return await this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ number: 1 })
      .select('-__v');
  }

  async findOne(term: string) {
    let query;

    if (!isNaN(Number(term))) {
      query = { number: term };
    } else if (isValidObjectId(term)) {
      query = { _id: term };
    }

    let pokemon = await this.pokemonModel.findOne(query);

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term });
    }

    if (!pokemon) {
      throw new NotFoundException(`The pokemon cannot be found`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    try {
      await pokemon.updateOne(updatePokemonDto);

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error: any) {
      this.handleExceptions(error);
    }
  }

  async remove(term: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: term });

    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with ID: ${term} was not found`);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === DUPLICATED_ITEM_ERROR_CODE) {
      throw new BadRequestException(
        `The pokemon: ${JSON.stringify(error.keyValue)} it already exists`,
      );
    }

    console.error(error);

    throw new InternalServerErrorException(
      'Can not create Pokemon - Check server logs',
    );
  }
}
