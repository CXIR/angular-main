import * as Pokedex from 'pokedex.js';

import {BasePokemon} from '../models/basePokemon';

const pokedex = new Pokedex('en');

export function getPokemon(name: string): BasePokemon {
    return JSON.parse(pokedex.name(name).get())[0];
}



