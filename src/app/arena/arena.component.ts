import { Component, OnInit, OnDestroy } from '@angular/core';

import { Pokemon    }  from 'src/models/pokemon'
import { AbilityLog }  from 'src/models/ability-log'

import { BattleService } from 'src/services/battle.service'
import { Subscription  } from 'rxjs';
import { PokemonService } from 'src/services/pokemon.service';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css'],
  providers: [
    BattleService,
    PokemonService
  ]
})
export class ArenaComponent implements OnInit, OnDestroy {

  title = 'Les Trois Cafés Gourmand'

  winner : string

  pokemon1 : Pokemon
  pokemon2 : Pokemon

  attacks   : AbilityLog[] = []
  attack    : AbilityLog

  stopped : boolean
  start   : Date

  subscription : Subscription

  constructor( private battleService  : BattleService,
               private pokemonService : PokemonService ) { }

  ngOnInit(){
    this.pokemon1 = new Pokemon("Pikachu")
    this.pokemon2 = new Pokemon("Raichu")

    this.battleService.configureBattle(this.pokemon1, this.pokemon2)
    this.stopped = true
  }

  actOnFight() {

    if(this.start == undefined) this.start = new Date()
    
    this.stopped = !this.stopped
    this.battleService.isStopped = this.stopped

    if(!this.subscription) {

      this.subscription = this.battleService
      .fight(1000)
      .subscribe({
  
        next : ability => {
  
        this.attacks.push(ability)
        this.attack = ability
        },
        complete : () => this.winner = this.battleService.winner.base.name
        })
    }
  }

  pokemonProcessing(){
    return 'text-muted'
  }

  ngOnDestroy(){

    this.battleService.isStopped = true

    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }
}