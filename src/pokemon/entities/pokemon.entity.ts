import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// When it extends from Document the class will have capabilieties to work with MongoDB

@Schema()
export class Pokemon extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  number: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
