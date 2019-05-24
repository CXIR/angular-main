import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
import { BasePokemon } from '../models/basePokemon';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
	beforeEach(() => TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
  }));

	it('should get a Pokemon', async() => {
      const pokemonService = TestBed.get(PokemonService);

      pokemonService.getOnePokemon('pikachu').subscribe(
        (data: BasePokemon) =>{
  		  expect(data.name).toBe('pikachu');
  	  }
      );

    });

  it('should get all Pokemons', async() => {
    const pokemonService = TestBed.get(PokemonService);

    let result = [];
    pokemonService.getPokemonsNames().subscribe(
      data => result = data.results,
      err => console.log('ERR : ' + err),
      () => console.log('done loading foods')
    );
    expect(result.length).toBe(974);
    console.log(result);

  });


});
