import { Schema, model, models } from 'mongoose';

export interface IPokemon {
	pokemonId: number,
	name: string;
	evolutionName: string,
	evolutionMethod: string,
	type1: string,
	type2: string | null
}

const pokemonSchema = new Schema<IPokemon>({
	pokemonId: { type: Number, required: true },
	name: { type: String, required: true },
	evolutionName: { type: String, required: true },
	evolutionMethod: { type: String, required: true },
	type1: { type: String, required: true },
	type2: { type: String, required: true },
});

export let Pokemon = models['Pokemon'] || model('Pokemon', pokemonSchema, 'pokemon');