import { Component, OnInit } from '@angular/core';

import { Pokemon }  from 'src/models/pokemon'
import { Ability }  from 'src/models/abilily'
import { Battle  }  from 'src/models/battle'

import { BattleService } from 'src/services/battle.service'

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit {

  title = 'Les Trois Cafés Gourmand'

  winner : string

  pokemon1 : Pokemon;
  pokemon2 : Pokemon;

  p1Attacks : Ability[] = [];
  p2Attacks : Ability[] = [];

  battle : Battle;

  toggle : boolean

  start : Date

  constructor(private battleService : BattleService) { }

  ngOnInit(){
    this.pokemon1 = this.battleService.pokemon1
    this.pokemon2 = this.battleService.pokemon2

    this.toggle = true
  }

  actOnFight() {

    if(this.start == undefined) this.start = new Date()

    this.toggle = !this.toggle

    this.battleService.fight(this.p1Attacks, this.p2Attacks, this.toggle)
    .then(win => {
      if(win) this.winner = win
    })
  }
}
