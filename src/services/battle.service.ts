import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import { Pokemon   } from 'src/models/pokemon'
import { AttackLog } from 'src/models/attack-log';

@Injectable()
export class BattleService {

  pokemon1: Pokemon;
  pokemon2: Pokemon;
  tour: number;
  isStopped: boolean;
  winner: Pokemon;
  cursor: number;

  constructor() {}

  configureBattle( PokemonA: Pokemon, PokemonB: Pokemon ) {

    this.pokemon1 = PokemonA.level <= PokemonB.level ? PokemonA : PokemonB;
    this.pokemon2 = PokemonA.level <= PokemonB.level ? PokemonB : PokemonA;
    this.tour     = 1;
  }

  fight(interval: number) {

    return new Observable<AttackLog>(observer => {

          setInterval(() => {

            if (!this.isStopped) {
              if (this.pokemon1.life !== 0 && this.pokemon2.life !== 0) {

                observer.next(this.attack());
              } else {
                this.winner = this.pokemon1.life === 0 ? this.pokemon2 : this.pokemon1;
                observer.complete();
              }
            }
          }, interval);
    });
  }

  attack(): AttackLog {

    let log: AttackLog;

    if (this.tour % 2 === 0) {

      const min  = 0;
      const max: number  = this.pokemon2.base.attacks.length - 1;

      const attack = this.pokemon2.base.attacks[ this.randomNumber(min, max) ];
      this.cursor = 2;
      this.pokemon2.attack(this.pokemon1, attack, this.isSpecial());

      log = new AttackLog(this.pokemon2.base.name, this.pokemon2.base.colors[0], attack);
      console.log(this.pokemon2.base.colors[0]);
    } else {
        const min  = 0;
        const max: number  = this.pokemon1.base.attacks.length - 1;

        const attack = this.pokemon1.base.attacks[ this.randomNumber(min, max) ];
        this.cursor = 1;
        this.pokemon1.attack(this.pokemon2, attack, this.isSpecial());

        log = new AttackLog(this.pokemon1.base.name, this.pokemon1.base.colors[0], attack);
        console.log(this.pokemon1.base.colors[0]);
    }
    this.tour += 1;

    return log;
  }

  randomNumber(min: number, max: number): number {

    return Math.floor(Math.random() * (+ max - + min)) + + min;
  }

  isSpecial(): boolean {

    return Boolean(Math.round(Math.random()));
  }
}
