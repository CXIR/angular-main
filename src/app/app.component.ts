import { Component, OnInit, Input } from '@angular/core'
import {Pokemon}     from '../models/pokemon'
import {Ability} from '../models/abilily'
import { Battle } from 'src/models/battle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Les Trois Cafés Gourmand'

  turn   : number
  winner : string

  pokemon1 : Pokemon;
  pokemon2 : Pokemon;

  p1Attacks : Ability[];
  p2Attacks : Ability[];

  battle : Battle;

  constructor() {}

  ngOnInit(){

    this.pokemon1  = new Pokemon("Pikachu")
    this.pokemon2  = new Pokemon("Raichu")
    this.p1Attacks = [];
    this.p2Attacks = [];

    this.pokemon2.levelUp(20)
    this.battle = new Battle(this.pokemon1, this.pokemon2)

    this.turn = 0
  }

  actOnFight() {

    this.battle.isStopped = !this.battle.isStopped
    
    this.battle.fight(this.p1Attacks, this.p2Attacks)
    .then(win => {
      if(win) this.winner = win.base.name
    })
  }
}
