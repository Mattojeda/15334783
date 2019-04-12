import Person from './Person';
import SubjectType from './SubjectType';
import ProfessionalCard from './ProfessionalCard';

export default class Subject extends Person {
    professionalCard?: ProfessionalCard
    type?: SubjectType
    phones?: string[] = ["", "", ""]
    emails?: {
        email: string
        notify: boolean
    }[] = [
            {
                email: "",
                notify: false
            },
            {
                email: "",
                notify: false
            },
            {
                email: "",
                notify: false
            }
        ]
    emplaced?: boolean
    private?: boolean
    tempId?: string | number

    constructor() {
        super()
        this.professionalCard = new ProfessionalCard()
        this.type = new SubjectType()
    }
}