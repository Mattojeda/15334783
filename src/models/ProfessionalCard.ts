import Descriptor from './Descriptor';
import IdentityStatus from './IdentityStatus';

export default class ProfessionalCard extends Descriptor {
    status?: IdentityStatus
    constructor() {
        super()
    }
}