import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {BasePokemon} from '../../models/basePokemon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    PokemonService
  ]
})
export class HomeComponent implements OnInit {

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {

    const pokemons: BasePokemon[] = [];

    this.pokemonService.getPokemons().subscribe(
      data => console.log(data),
      err => console.log('ERR : ' + err),
      () => console.log('done loading pokemons')
    );
    /*
    this.pokemonService.getOnePokemon('pikachu').subscribe(
      data => console.log(data),
      err => console.log('ERR : ' + err),
      () => console.log('done loading pikachu')
    );


    this.pokemonService.getPokemons().subscribe(data => {
      data
    });

     */


  }

}
