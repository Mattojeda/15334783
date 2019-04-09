import Descriptor from './Descriptor';
import ProcessClass from './ProcessClass';

export default class SubProcessClass extends Descriptor {
    processClass?:ProcessClass
    
    constructor() {
        super()
        this.processClass = new Descriptor()
    }
}