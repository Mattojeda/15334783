import Especiality from './Especiality';
import Descriptor from './Descriptor';

export default class SubEspeciality extends Descriptor {
    especiality?:Especiality
    
    constructor() {
        super()
        this.especiality = new Descriptor()
    }
}