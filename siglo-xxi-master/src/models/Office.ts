import Corporation from './Corporation';
import Descriptor from './Descriptor';
import Especiality from './Especiality';

export default class Office extends Descriptor {
    corporation?: Corporation
    especiality?: Especiality
    
    constructor() {
        super()
        this.corporation = new Descriptor()
        this.especiality = new Descriptor()
    }
}