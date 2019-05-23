import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe(
      data => console.log(data),
      err => console.log('ERR : ' + err),
      () => console.log('done loading pokemons')
    );
    this.pokemonService.getOnePokemon('pikachu').subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('done loading pikachu')
    );
  }

}
