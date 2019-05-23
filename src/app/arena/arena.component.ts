import { Component, OnInit } from '@angular/core';

import { Pokemon }  from 'src/models/pokemon'
import { AbilityLog }  from 'src/models/ability-log'

import { BattleService } from 'src/services/battle.service'

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit {

  title = 'Les Trois Cafés Gourmand'

  winner : string

  pokemon1 : Pokemon
  pokemon2 : Pokemon

  attacks   : AbilityLog[] = []
  attack    : AbilityLog

  stopped : boolean
  start : Date

  data : object

  constructor(private battleService : BattleService) { }

  ngOnInit(){
    this.pokemon1 = new Pokemon("Pikachu")
    this.pokemon2 = new Pokemon("Raichu")

    this.battleService.configureBattle(this.pokemon1, this.pokemon2)
    this.stopped = true
  }

  actOnFight() {

    if(this.start == undefined) this.start = new Date()

    this.stopped = !this.stopped
    
    let data = this.battleService
                    .fight(1000, this.stopped)
                    .subscribe({

      next : ability => {

        this.attacks.push(ability)
        this.attack = ability
      },
      complete : () => this.winner = this.battleService.winner.base.name
    })

    if(this.stopped) data.unsubscribe()
  }

  pokemonProcessing(){

    return 'text-muted'
  }
}
