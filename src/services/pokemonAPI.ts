import * as Pokedex from 'pokedex.js';

import {Base_pokemon} from "../models/base_pokemon";

const pokedex = new Pokedex('en');

export function getPokemon(name:string) : Base_pokemon {
    return JSON.parse(pokedex.name(name).get())[0];
}



