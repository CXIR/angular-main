import { Injectable } from '@angular/core';

import { Pokemon } from 'src/models/pokemon';
import { Attack } from 'src/models/attack';
import { Battle  } from 'src/models/battle';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  pokemon1: Pokemon;
  pokemon2: Pokemon;

  battle: Battle;

  constructor() {
    this.pokemon1  = new Pokemon('Pikachu');
    this.pokemon2  = new Pokemon('Raichu');

    // this.pokemon2.levelUp(40)
    this.battle = new Battle(this.pokemon1, this.pokemon2);
  }

  fight(p1Attacks: Attack[], p2Attacks: Attack[], toggle: boolean): Promise<string> {

    this.battle.isStopped = toggle;

    return new Promise( resolve => {

        this.battle.fight() // TODO: refactor
        /*.then(win => {
          if (win) { resolve(win.base.name); }
        });*/
     });

  }
}
