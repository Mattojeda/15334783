import Descriptor from './Descriptor';

export default class SubjectType extends Descriptor {
    identified: boolean
    company: boolean
    autoDefense: boolean
    verifyProfessionalCard: boolean
    defense: boolean
    canBeDefended: boolean
    emplace: boolean
    studyLevel: boolean

    constructor() {
        super()
        this.defense = false
        this.identified = false
        this.autoDefense = false
        this.canBeDefended = false
        this.verifyProfessionalCard = false
        this.company = false
        this.emplace = false
        this.studyLevel = false
    }
}