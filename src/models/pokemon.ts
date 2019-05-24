import {BasePokemon} from './basePokemon';
import {Statistiques} from './statistiques';
import {Attack} from './attack';
import * as PokemonService from '../services/pokemonAPI';

export class Pokemon {

    base: BasePokemon;
    nickname: string;
    IVStats: Statistiques;
    level: number;
    life: number;
    maxLife: number;
    pp: number;
    maxPP: number;

    constructor(_base: BasePokemon, nickname: string = '') {
        /*PokemonService.getPokemonData(name, (basePokemon, err) => {
           this.base = basePokemon;
        });*/
        this.base = _base;
        this.nickname = nickname;
        this.IVStats = this.generate_randomStats();
        this.level = 1;

        this.life = this.getHitPoints();
        this.maxLife = this.getHitPoints();
        this.pp = 100;
        this.maxPP = 100;
    }

    private generate_randomStats(min: number = 0, max: number = 31) {
        return new Statistiques(Math.floor(Math.random() * max) + min,
                                Math.floor(Math.random() * max) + min,
                                Math.floor(Math.random() * max) + min,
                                Math.floor(Math.random() * max) + min,
                                Math.floor(Math.random() * max) + min,
                                Math.floor(Math.random() * max) + min);
    }

    levelUp(level: number = 1) {
        this.level += level;
        this.maxLife = this.getHitPoints();
        this.maxPP += (10 * level);
        this.fullLife();
        this.fullPP();
    }

    fullLife() {
        this.life = this.maxLife;
    }

    fullPP() {
        this.pp = this.maxPP;
    }

    getHitPoints(): number {

        const B: number = this.base.baseStats.hitPoints;
        const I: number = this.IVStats.hitPoints;
        const E: number = this.base.EVStats.hitPoints;
        const L: number = this.level;

        return Math.floor((2 * B + I + E) * L / 100 + L + 10);
    }

    getAttack(nature: number = 1): number {

        const B: number = this.base.baseStats.attack;
        const I: number = this.IVStats.attack;
        const E: number = this.base.EVStats.attack;
        const L: number = this.level;
        const N: number = nature;

        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    }

    getDefense(nature: number = 1): number {
        const B: number = this.base.baseStats.defense;
        const I: number = this.IVStats.defense;
        const E: number = this.base.EVStats.defense;
        const L: number = this.level;
        const N: number = nature;

        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    }

    getSpecialAttack(nature: number = 1): number {

        const B: number = this.base.baseStats.special_attack;
        const I: number = this.IVStats.special_attack;
        const E: number = this.base.EVStats.special_attack;
        const L: number = this.level;
        const N: number = nature;

        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    }

    getSpecialDefense(nature: number = 1): number {

        const B: number = this.base.baseStats.special_defense;
        const I: number = this.IVStats.special_defense;
        const E: number = this.base.EVStats.special_attack;
        const L: number = this.level;
        const N: number = nature;

        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    }

    getSpeed(nature: number = 1): number {

        const B: number = this.base.baseStats.speed;
        const I: number = this.IVStats.speed;
        const E: number = this.base.EVStats.speed;
        const L: number = this.level;
        const N: number = nature;

        return Math.floor(Math.floor((2 * B + I + E) * L / 100 + 5) * N);
    }

    attack(otherPokemon: Pokemon, attack: Attack, isSpecial: boolean = false) {

        this.pp -= attack.pp;

        const L: number = this.level;
        const A: number = isSpecial === false ? this.getAttack() : this.getSpecialAttack();
        const P: number = attack.power;
        const D: number = isSpecial === false ? otherPokemon.getDefense() : this.getSpecialDefense();

        const damage: number = Math.floor(Math.floor(Math.floor(2 * L / 5 + 2) * A * P / D) / 50) + 2;

        otherPokemon.life -= damage;
        if (otherPokemon.life < 0) { otherPokemon.life = 0; }
    }
}
