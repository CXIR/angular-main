import { TestBed } from '@angular/core/testing';
import { Pokemon } from '../models/pokemon'
import { BattleService } from './battle.service';

describe('BattleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        BattleService
      ]
    })

  });

  it('should be created', () => {
    const battle: BattleService = TestBed.get(BattleService);
	let pikachu: Pokemon = new Pokemon('pikachu');
	let raichu: Pokemon = new Pokemon('raichu');


	battle = new battle();

	battle.configureBattle(pikachu, raichu);

	battle.fight(2).subscribe(attacks: AttackLog => {
		expect(attacks).toBe('df');
	});

  });
});
