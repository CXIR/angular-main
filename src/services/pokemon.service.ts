import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BasePokemon} from '../models/basePokemon';
import {SpeciesPokemon} from '../models/speciesPokemon';
import {Statistiques} from '../models/statistiques';
import {Attack} from '../models/attack';
import {map} from 'rxjs/operators';


@Injectable()
export class PokemonService {
  baseURL: string;
  constructor(private http: HttpClient) {
    this.baseURL = 'https://pokeapi.co/api/v2/';
  }

  getPokemons() {
    return this.http.get(this.baseURL + 'generation/1').pipe(map(data => (
      this.parseList(data)
    )));
  }

  parseList(data) {
    const pokemons: BasePokemon[] = [];
    const results = data.pokemon_species;
    for (const res of results) {
      const p = this.getOnePokemon(res.name);
      p.toPromise().then(response => pokemons.push(response));
    }
    return pokemons;
  }

  getOnePokemon(name) {
    return this.http.get(this.baseURL + 'pokemon/' + name).pipe(map(base => (
      this.parseBasePokemon(base)
    )));
  }

  getPokemonSpecies(name) {
    return this.http.get(this.baseURL + 'pokemon-species/' + name).pipe(map(species => (
      this.parsePokemonSpecies(species)
    )));
  }

  getAttack(name) {
    return this.http.get(this.baseURL + 'move/' + name).pipe(map(attack => (
      this.parseAttack(attack)
    )));
  }

  parseBasePokemon = (base) => {
    const baseStat = this.getPokemonBaseStat(base.stats);
    const EVStat = this.getPokemonEVStat(base.stats);
    const types = this.getPokemonTypes(base.types);
    const colors = this.getColors(base.name);
    const imgFront = base.sprites.front_default;
    const imgBack = base.sprites.back_default;
    const attacks = this.getPokemonAttacks(base.moves);
    return new BasePokemon(base.id, base.name, types, colors, attacks, baseStat, EVStat, imgFront, imgBack);
  }

  parseAttack = (attack) => {
    const id = attack.id;
    const name = attack.name;
    const type = attack.type.name;
    const pp = attack.pp;
    const power = attack.power;
    const accuracy = attack.accuracy;
    return new Attack(id, name, type, pp, power, accuracy);
  }

  parsePokemonSpecies = (species) => {
    const id = species.id;
    const name = species.name;
    const color = species.color.name;
    return new SpeciesPokemon(id, name, color);
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

  getPokemonAttacks(attacks): Attack[] {
    const data: Attack[] = [];
    for (const attack of attacks) {
      const name = attack.move.name;
      this.getAttack(name).subscribe(res => data.push(res));
    }
    return data;
  }

  getColors(name): string[] {
    const data: string[] = [];
    this.getPokemonSpecies(name).subscribe(res => data.push(res.color));
    return data;
  }
}
