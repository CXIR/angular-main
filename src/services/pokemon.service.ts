import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BasePokemon} from '../models/basePokemon';
import {Statistiques} from '../models/statistiques';
import {Attack} from '../models/attack';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseURL: string;
  constructor(private http: HttpClient) {
    this.baseURL = 'https://pokeapi.co/api/v2/';
  }

  getPokemons() {
    return this.http.get(this.baseURL + 'pokemon/');
  }

  getOnePokemon(name) {
    return this.http.get<BasePokemon>(this.baseURL + 'pokemon/' + name);
  }


  getPokemonBaseStat(stats): Statistiques {

    let HP = 0;
    let A = 0;
    let D = 0;
    let SA = 0;
    let SD = 0;
    let S = 0;

    for (const stat of stats) {
      HP = stat.stat.name === 'hp' ? stat.base_stat : HP;
      A = stat.stat.name === 'attack' ? stat.base_stat : A;
      D = stat.stat.name === 'defense' ? stat.base_stat : D;
      SA = stat.stat.name === 'special-attack' ? stat.base_stat : SA;
      SD = stat.stat.name === 'special-defense' ? stat.base_stat : SD;
      S = stat.stat.name === 'speed' ? stat.base_stat : S;
    }

    return new Statistiques(HP, A, D, SA, SD, S);

  }

  getPokemonEVStat(stats): Statistiques {

    let HP = 0;
    let A = 0;
    let D = 0;
    let SA = 0;
    let SD = 0;
    let S = 0;

    for (const stat of stats) {
      HP = stat.stat.name === 'hp' ? stat.effort : HP;
      A = stat.stat.name === 'attack' ? stat.effort : A;
      D = stat.stat.name === 'defense' ? stat.effort : D;
      SA = stat.stat.name === 'special-attack' ? stat.effort : SA;
      SD = stat.stat.name === 'special-defense' ? stat.effort : SD;
      S = stat.stat.name === 'speed' ? stat.effort : S;
    }

    return new Statistiques(HP, A, D, SA, SD, S);

  }

  getPokemonTypes(types): string[] {

    const data: string[] = [];

    for (const type of types) {
      data.push(type.type.name);
    }

    return data;
  }

  getPokemonAbilities(abilities): Attack[] {

    const data: Attack[] = [];

    for (let i = 0; i < abilities.length; i++) {
      let id = 0;
      const name: string = abilities[i].move.name;
      let type = '';
      let pp = 0;
      let power = 0;
      let accuracy = 0;

      pokedex.getMoveByName(name)
        .then(function(response) {
          id = response.id;
          type = response.type.name;
          pp = response.pp;
          power = response.power;
          accuracy = response.accuracy;
        })
        .catch(function(error) {
          console.log('There was an ERROR: ', error);
        });


      const ability = new Attack(id, name, type, pp, power, accuracy);
      data.push(ability);
    }

    return data;
  }





}
