import Descriptor from './Descriptor';
import ActType from './ActType';

export default class Act extends Descriptor {
    cicle?: Descriptor
    status?: string
    date?: string
    creationDate: Date | string
    type: ActType
    description?: string
    providence?: Descriptor
    precision?: Descriptor

    constructor() {
        super()
        this.type = new ActType();
        this.creationDate = new Date();
        this.status = 'ACTIVE'
    }
}