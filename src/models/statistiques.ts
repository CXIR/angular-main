export class Statistiques {

    hitPoints: number;
    attack: number;
    defense: number;
    special_defense: number;
    special_attack: number;
    speed: number;

    constructor(hitPoints: number, attack: number, defense: number, special_defense: number, special_attack: number, speed: number) {
        this.hitPoints = hitPoints;
        this.attack = attack;
        this.defense = defense;
        this.special_defense = special_defense;
        this.special_attack = special_attack;
        this.speed = speed;
    }

}