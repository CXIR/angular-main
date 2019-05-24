import {Attack} from './attack';

export class AttackLog {

    name: string;
    color: string;
    attack: Attack;

    constructor( _name: string,
                 _color: string,
                 _attack: Attack) {

        this.name    = _name;
        this.color   = _color;
        this.attack  = _attack;
    }
}
