import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/services/pokemon.service';
import { BasePokemon } from 'src/models/basePokemon';
import { Router } from '@angular/router';

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

  pokemon1 : BasePokemon
  pokemon2 : BasePokemon

  constructor(private pokemonService : PokemonService, 
              private router : Router) { }

  ngOnInit() {

    this.pokemonService.getPokemonsNames().subscribe({
      next: pokemonNames => {

        for(let name of pokemonNames){

          this.pokemonService.getOnePokemon(name).subscribe({
            next: pokemon => {
              
              this.collection.push(pokemon)
            }
          })
        }
      }
    })
  }

  selectPokemon(pokemon : BasePokemon){

    if(!this.pokemon1) this.pokemon1 = pokemon
    else if(!this.pokemon2) {
      this.pokemon2 = pokemon

      this.router.navigateByUrl('/arena/' + this.pokemon1.name +'/' + this.pokemon2.name)
    }
  }

  pokemonSelected(pokemon : BasePokemon){

    if(pokemon == this.pokemon1 || pokemon == this.pokemon2) {
      return 'border-info'
    }
  }

  collectionIsEmpty(){
    return this.collection.length > 0 ? false : true
  }

}
