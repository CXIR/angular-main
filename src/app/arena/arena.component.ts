import { Component, OnInit, OnDestroy } from '@angular/core';

import { Pokemon    }  from 'src/models/pokemon'
import { AttackLog }  from 'src/models/attack-log'

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

  winner : Pokemon

  pokemon1 : Pokemon
  pokemon2 : Pokemon

  attacks   : AttackLog[] = []
  log       : AttackLog

  stopped : boolean
  start   : Date

  subscription : Subscription

  constructor( private battleService  : BattleService,
               private pokemonService : PokemonService ) { }

  ngOnInit(){
    this.pokemonService.getOnePokemon('pikachu').subscribe({
      next: pokemon => {
        this.pokemon1 = new Pokemon(pokemon)
      },
      complete: () => {
        this. configureBattle()
      }
    })

    this.pokemonService.getOnePokemon('raichu').subscribe({
      next: pokemon => {
        this.pokemon2 = new Pokemon(pokemon)
      },
      complete: () => {
        this. configureBattle()
      }
    })

    this.stopped = true
  }

  configureBattle(){

    if(this.pokemon1 && this.pokemon2) {
      this.battleService.configureBattle(this.pokemon1, this.pokemon2)
    }
  }

  actOnFight() {

    if(this.start == undefined) this.start = new Date()
    
    this.stopped = !this.stopped
    this.battleService.isStopped = this.stopped

    if(!this.subscription) {

      this.subscription = this.battleService
      .fight(1000)
      .subscribe({
  
        next : log => {
  
        this.attacks.push(log)
        this.log = log
        },
        complete : () => this.winner = this.battleService.winner
        })
    }
  }

  setColor(color : string){
    return { 'color' : color }
  }


  ngOnDestroy(){

    this.battleService.isStopped = true

    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }
}