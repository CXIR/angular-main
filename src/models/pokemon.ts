import {Base_pokemon} from "./base_pokemon";
import {Statistiques} from "./statistiques";
import * as PokemonService from "../services/pokemon.service";

export class Pokemon {

    base : Base_pokemon;
    level: number;
    life: number;
    max_life: number;
    private IVStats: Statistiques;

    constructor(name: string, stat : Statistiques = new Statistiques()) {
        this.base = PokemonService.getPokemon(name);
		console.log(this.base);
        this.IVStats = stat;
        this.level = 1;
        this.life = this.getHitPoints();
        this.max_life = this.getHitPoints();
    }

    levelUp(level:number = 1) {
        this.level += level;
        this.max_life = this.getHitPoints();
        this.fullLife();
    }

    fullLife() {
        this.life = this.max_life;
    }

    getHitPoints():number {

        let B : number = this.base.baseStats.H;
        let I : number = this.IVStats.H;
        let E : number = 1;
        let L : number = this.level;

        return Math.floor((2 * B + I + E) * L / 100 + L + 10);
    }

    getAttack():number {

        let B : number = this.base.baseStats.A;
        let I : number = this.IVStats.A;
        let E : number = 1;
        let L : number = this.level;
        let N : number = 1;

        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    }

    getDefense():number {

        let B : number = this.base.baseStats.B;
        let I : number = this.IVStats.B;
        let E : number = 1;
        let L : number = this.level;
        let N : number = 1;

        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    }

    getSpecialAttack():number {

        let B : number = this.base.baseStats.C;
        let I : number = this.IVStats.C;
        let E : number = 1;
        let L : number = this.level;
        let N : number = 1;

        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    }

    getSpecialDefense():number {

        let B : number = this.base.baseStats.D;
        let I : number = this.IVStats.D;
        let E : number = 1;
        let L : number = this.level;
        let N : number = 1;

        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    }

    getSpeed():number {

        let B : number = this.base.baseStats.S;
        let I : number = this.IVStats.S;
        let E : number = 1;
        let L : number = this.level;
        let N : number = 1;

        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    }


    attack(otherPokemon : Pokemon, bonus_attack: number = 1, isSpecial : boolean = false) {

        let L : number = this.level;
        let A : number = isSpecial === false ? this.getAttack() : this.getSpecialAttack();
        let P : number = bonus_attack;
        let D : number = isSpecial === false ? otherPokemon.getDefense() : this.getSpecialDefense();

        let damage : number = Math.floor(Math.floor(Math.floor(2 * L / 5 + 2) * A * P / D) / 50) + 2;

        otherPokemon.life -= damage;
        if (otherPokemon.life < 0) otherPokemon.life = 0;
    }


}
