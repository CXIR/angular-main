import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/models/pokemon';
import { PokemonService } from 'src/services/pokemon.service';
import { BasePokemon } from 'src/models/basePokemon';

@Component({
  selector: 'app-pokemon-selecter',
  templateUrl: './pokemon-selecter.component.html',
  styleUrls: ['./pokemon-selecter.component.css'],
  providers: [
    PokemonService
  ]
})
export class PokemonSelecterComponent implements OnInit {

  collection : BasePokemon[] = []

  pokemon1 : Pokemon
  pokemon2 : Pokemon

  constructor(private pokemonService : PokemonService) { }

  ngOnInit() {

    this.pokemonService.getPokemonsNames().subscribe({
      next: pokemonNames => {

        for(let name of pokemonNames){

          this.pokemonService.getOnePokemon(name).subscribe({
            next: pokemon => {
              
              //this.collection.push(pokemon)
              console.log(pokemon)
            }
          })
        }
      }
    })
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

  collectionIsEmpty(){
    return this.collection.length > 0 ? false : true
  }

}
