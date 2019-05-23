import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


export class PokemonService {
	pokemonurl: string;

	constructor(private http: HttpClient){
		this.pokemonurl = 'https://pokeapi.co/api/v2/pokemon';
	}

	getPokemon(name: string): string {
		return this.http.get(this.pokemonurl + name);
	}

	getPokemons(): any {
		return JSON.parse(this.http.get(this.pokemonurl));
	}
}
