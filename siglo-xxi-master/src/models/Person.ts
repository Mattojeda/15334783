import Descriptor from './Descriptor';
import Ubication from './Ubication';
import IdentityStatus from './IdentityStatus';
import StudyLevel from './StudyLevel';

export default class Person {
    documentType: Descriptor
    document?: string
    firstName: string = ''
    secondName: string = ''
    lastName: string = ''
    secondLastName: string = ''
    gender: Descriptor
    birthDate?: string
    identityStatus?: IdentityStatus
    ubications?: Ubication[] = []
    asociate?: any
    selected?:boolean = false
    studyLevel?: StudyLevel

    constructor() {
        this.gender = new Descriptor()
        this.documentType = new Descriptor()
    }
}