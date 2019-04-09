import Descriptor from './Descriptor';
import Departament from './Departament';

export default class City extends Descriptor {
    departament?: Departament

    constructor() {
        super()
        this.departament = new Descriptor()
    }
}