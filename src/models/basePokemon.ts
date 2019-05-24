import {Statistiques} from './statistiques';
import {Attack} from './attack';
import * as pokemonGif from 'pokemon-gif';

export class BasePokemon {

    id: number;
    name: string;
    type: string[];
    attacks: Attack[];
    colors: string[];
    baseStats: Statistiques;
    EVStats: Statistiques;
    imgFront: string;
    imgBack: string;

    constructor(id: number, name: string, type: string[], colors: string[], attacks: Attack[], baseStats: Statistiques, EVStats: Statistiques, img_front: string, img_back: string) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.colors = colors;
        this.attacks = attacks;
        this.baseStats = baseStats;
        this.EVStats = EVStats;
        this.imgFront = img_front;
        this.imgBack = img_back;
    }

    getGif(): string {
      return pokemonGif(this.name) || '';
    }

}



