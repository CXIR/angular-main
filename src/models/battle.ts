import {Pokemon} from "./pokemon";
import {Ability} from "./abilily";
import { delay } from 'q';

export class Battle {

    firstPokemon : Pokemon;
    secondPokemon : Pokemon;
    tour: number;
    isStopped = true;

    constructor(PokemonA: Pokemon, PokemonB: Pokemon) {
        this.firstPokemon = PokemonA.level <= PokemonB.level ? PokemonA : PokemonB;
        this.secondPokemon = PokemonA.level <= PokemonB.level ? PokemonB : PokemonA;
        this.tour = 1;
    }


    async fight(attacks1 : Ability[], attacks2 : Ability[]) : Promise<Pokemon> {

        while(this.firstPokemon.life !== 0 && this.secondPokemon.life !== 0) {

            //turn = this.tour
            if (this.isStopped) return; 

            if (this.tour % 2 === 0) {

                let min : number = 0;
                let max : number = this.secondPokemon.base.ability.length-1;
                let random_num : number = Math.floor(Math.random() * (+max - +min)) + +min;
                let ability : Ability = this.secondPokemon.base.ability[random_num];
                let isSpecial : boolean = Boolean(Math.round(Math.random()));

                this.secondPokemon.attack(this.firstPokemon, ability.name.length, isSpecial);
                
                attacks2.push(ability);
            } 
            else {
                let min : number = 0;
                let max : number = this.firstPokemon.base.ability.length-1;
                let random_num : number = Math.floor(Math.random() * (+max - +min)) + +min;
                let ability : Ability = this.firstPokemon.base.ability[random_num];
                let isSpecial : boolean = Boolean(Math.round(Math.random()));

                this.firstPokemon.attack(this.secondPokemon, ability.name.length, isSpecial);
                
                attacks1.push(ability);
            }

            this.tour += 1;
            await delay(1000);
        }

        if (this.firstPokemon.life > this.secondPokemon.life) {

            return this.firstPokemon;
        } else {

            return this.secondPokemon;
        }
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}