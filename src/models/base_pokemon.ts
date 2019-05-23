import {Statistiques} from "./statistiques";
import {Ability} from "./abilily";

export class Base_pokemon {

    id: number;
    name : string;
    type: string[];
    ability: Ability[];
    eggGroup : string[];
    generation: number;
    baseStats: Statistiques;


    constructor(id: number, name: string, type: string[], ability: Ability[], eggGroup: string[], generation: number, baseStats: Statistiques) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.ability = ability;
        this.eggGroup = eggGroup;
        this.generation = generation;
        this.baseStats = baseStats;
    }
}