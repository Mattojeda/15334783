import Ubication from './Ubication';
import Descriptor from './Descriptor';

export default class Fact extends Descriptor {
    ubication?: Ubication
    longitude?: string
    latitude?: string
    placeDescription?: string
    description?: string
    date?: Date

    constructor() {
        super()
        this.ubication = new Ubication()
    }
}