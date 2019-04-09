import City from './City';
import Address from './Address';

export default class Ubication {
    city: City
    address: Address
    name?: string
    constructor() {
        this.city = new City()
        this.address = new Address();
    }
}