import { TestBed } from '@angular/core/testing';
import { Pokemon } from '../models/pokemon';
import { BasePokemon } from '../models/basePokemon';
import { AttackLog } from '../models/attack-log';
import { BattleService } from './battle.service';
import { PokemonService } from './pokemon.service';

describe('BattleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        BattleService,
		PokemonService
      ]
    })

  });

  it('should win', async() => {
    const battle: BattleService = TestBed.get(BattleService);
	const pokemon: PokemonService = TestBed.get(BattleService);
	let pikachu: Pokemon = new Pokemon(pokemon.getOnePokemon('pikachu'));
	let raichu: Pokemon = new Pokemon(pokemon.getOnePokemon('raichu'));


	battle.configureBattle(pikachu, raichu);

	battle.fight(2).subscribe((attacks: AttackLog) => {
		expect(attacks).toBe('winner');
	});

  });
});
