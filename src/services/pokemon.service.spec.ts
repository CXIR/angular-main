import {async, TestBed} from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Pokemon} from '../models/pokemon';
import {BasePokemon} from '../models/basePokemon';
import {HttpClient} from '@angular/common/http';




describe('PokemonService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [PokemonService]
  }));

  it('should get all Pokémons', async(() => {
    const pokemonService = TestBed.get(PokemonService);

    let result = [];
    pokemonService.getPokemons().subscribe(
      data => result = data.results,
      err => console.log('ERR : ' + err),
      () => console.log('done loading foods')
    );
    expect(result.length).toBe(974);
    console.log(result);

  }));

});
