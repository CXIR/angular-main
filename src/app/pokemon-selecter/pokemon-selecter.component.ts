import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/models/pokemon';

@Component({
  selector: 'app-pokemon-selecter',
  templateUrl: './pokemon-selecter.component.html',
  styleUrls: ['./pokemon-selecter.component.css']
})
export class PokemonSelecterComponent implements OnInit {

  collection : Pokemon[]
  pokemon1 : Pokemon
  pokemon2 : Pokemon

  constructor() { }

  ngOnInit() {
    this.collection = []
  }

  selectPokemon(pokemon : Pokemon){

    if(!this.pokemon1) this.pokemon1 = pokemon
    else if(!this.pokemon2) {
      this.pokemon2 = pokemon

      //ArenaComponent(pokemon1, pokemon2)
    }
  }

  pokemonSelected(pokemon : Pokemon){

    if(pokemon == this.pokemon1 || pokemon == this.pokemon2) {
      return 'border-info'
    }
  }

}
