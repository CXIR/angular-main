export class Attack {

    id: number;
    name: string;
    type: string;
    pp: number;
    power: number;
    accuracy: number;

    constructor(id: number, name: string, type: string, pp: number, power: number, accuracy: number) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.pp = pp;
        this.power = power;
        this.accuracy = accuracy;
    }

}