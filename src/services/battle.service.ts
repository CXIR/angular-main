import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { Pokemon } from 'src/models/pokemon'
import { AbilityLog } from 'src/models/ability-log';

@Injectable()
export class BattleService {

  pokemon1  : Pokemon
  pokemon2  : Pokemon
  tour      : number
  isStopped : boolean
  winner    : Pokemon
  cursor    : number

  constructor() {}

  configureBattle(PokemonA: Pokemon, PokemonB: Pokemon) {

    this.pokemon1 = PokemonA.level <= PokemonB.level ? PokemonA : PokemonB
    this.pokemon2 = PokemonA.level <= PokemonB.level ? PokemonB : PokemonA
    this.tour     = 1
  }

  fight(interval : number) {

    return new Observable<AbilityLog>(observer => {

          setInterval(() => {
            if(!this.isStopped) {
              if(this.pokemon1.life !== 0 && this.pokemon2.life !== 0) {

                observer.next(this.attack()) 
              }
              else {
                this.winner = this.pokemon1.life == 0 ? this.pokemon2 : this.pokemon1
                observer.complete()
              }
            }
          }, interval)
    })
  }

  attack() : AbilityLog {

    let log : AbilityLog

    if (this.tour % 2 === 0) {

      let min : number  = 0
      let max : number  = this.pokemon2.base.ability.length - 1

      let ability = this.pokemon2.base.ability[ this.randomNumber(min, max) ]
      this.cursor = 2
      this.pokemon2.attack(this.pokemon1, ability.name.length, this.isSpecial())

      log = new AbilityLog(this.pokemon2.base.name, 'text-warning', ability)
    } 
    else {
        let min : number  = 0
        let max : number  = this.pokemon1.base.ability.length - 1

        let ability = this.pokemon1.base.ability[ this.randomNumber(min, max) ]
        this.cursor = 1
        this.pokemon1.attack(this.pokemon2, ability.name.length, this.isSpecial())

        log = new AbilityLog(this.pokemon1.base.name, 'text-primary', ability)
    }
    this.tour += 1

    return log
  }

  randomNumber(min : number, max : number) : number {

    return Math.floor(Math.random() * (+ max - + min)) + + min
  }

  isSpecial() : boolean {

    return Boolean(Math.round(Math.random()))
  }

  delay(ms: number) {

      return new Promise( resolve => setTimeout(resolve, ms) )
  }
}
