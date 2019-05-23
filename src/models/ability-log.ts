import { Ability } from './abilily';

export class AbilityLog {

    name    : string
    color   : string
    ability : Ability

    constructor(_name: string, _color: string, _ability : Ability) {
        this.name    = _name
        this.color   = _color
        this.ability = _ability
    }
}