import Office from './Office';
import Descriptor from './Descriptor';

export default class Role extends Descriptor {
    office?: Office
    active?: boolean

    constructor() {
        super()
        this.office = new Office()
        this.active = false
    }
}