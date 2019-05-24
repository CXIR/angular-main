import {Pokemon} from './pokemon';
import {Attack} from './attack';

export class Battle {

    firstPokemon: Pokemon;
    secondPokemon: Pokemon;
    tour: number;
    isStopped: boolean;

    constructor(PokemonA: Pokemon, PokemonB: Pokemon) {
        this.firstPokemon = PokemonA.getSpeed() <= PokemonA.getSpeed() ? PokemonA : PokemonB;
        this.secondPokemon = PokemonA.getSpeed() <= PokemonB.getSpeed() ? PokemonB : PokemonA;
        this.tour = 1;
    }


    fight(): Pokemon {
        while (this.firstPokemon.life !== 0 && this.secondPokemon.life !== 0) {

            console.log('Tour n°' + this.tour.toString() + ':');

            if (this.tour % 2 === 0) {
                const attack: Attack = this.getAttack(this.secondPokemon.base.attacks);
                const isSpecial: boolean = Boolean(Math.round(Math.random()));

                this.secondPokemon.attack(this.firstPokemon, attack, isSpecial);
                console.log(this.secondPokemon.base.name + ' lance une attaque "' + attack.name + '" sur ' + this.firstPokemon.base.name);
            } else {
                const attack: Attack = this.getAttack(this.firstPokemon.base.attacks);
                const isSpecial: boolean = Boolean(Math.round(Math.random()));

                this.firstPokemon.attack(this.secondPokemon, attack, isSpecial);
                console.log(this.firstPokemon.base.name + ' lance une attaque "' + attack.name + '" sur ' + this.secondPokemon.base.name);
            }

            console.log(this.firstPokemon.base.name + ' - PV : ' + this.firstPokemon.life.toString());
            console.log(this.secondPokemon.base.name + ' - PV : ' + this.secondPokemon.life.toString());

            this.tour += 1;
        }

        if (this.firstPokemon.life > this.secondPokemon.life) {
            console.log('Le gagnant est : ' + this.firstPokemon.base.name);
            return this.firstPokemon;
        } else {
            console.log('Le gagnant est : ' + this.secondPokemon.base.name);
            return this.secondPokemon;
        }

    }

    private getAttack(attacks): Attack {
        const min = 0;
        const max: number = attacks.length - 1;
        const i: number = Math.floor(Math.random() * max) + min;
        return attacks[i];
    }



}
