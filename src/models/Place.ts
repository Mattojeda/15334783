import PlaceType from './PlaceType';
import Ubication from './Ubication';
import Descriptor from './Descriptor';
import PopulationStatus from './PopulationStatus';

export default class Place extends Descriptor {
    ubication?: Ubication
    register?: string
    type?: PlaceType
    population?: PopulationStatus
    area?: string
    measure?: string
    inspection?: string
    zone?: string
    description?: string
    district?: string
    vereda?: string
    corregimiento?: string

    constructor() {
        super()
        this.ubication = new Ubication()
    }
}