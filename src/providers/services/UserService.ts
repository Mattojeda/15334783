import User from '@/models/User';
import Data from '@/constants/Data';
import Uris from '@/constants/Uris';
import Instance from './ServiceInstance';
import Subject from '@/models/Subject';
import ProfessionalCard from '@/models/ProfessionalCard';
import IdentityStatus from '@/models/IdentityStatus';

export default class UserService {
    public static get(user: User): User | undefined {
        for (let item of Data.users) {
            if (item.document == user.document
                && item.documentType.id == user.documentType.id) {
                return item
            }
        }
    }
    public static getSubject(user: Subject): Subject | undefined {
        for (let item of user.type!.company ? Data.usersAndCompanies : Data.users) {
            if (item.document == user.document
                && item.documentType.id == user.documentType.id) {
                let person = new Subject()
                person.birthDate = item.birthDate
                person.document = item.document
                person.documentType = item.documentType
                person.firstName = item.firstName
                person.gender = item.gender
                person.lastName = item.lastName
                person.secondLastName = item.secondLastName
                person.secondName = item.secondName
                person.identityStatus = item.identityStatus
                person.studyLevel = item.studyLevel
                return person
            }
        }
    }

    public static getByUserName(user: User): User | undefined {
        for (let item of Data.users) {
            if (item.userName == user.userName) {
                return item
            }
        }
    }

    public static save(user: User) {
        return Instance.post(Uris.user, user)
    }

    public static getProfessionalCard(card: ProfessionalCard): ProfessionalCard | undefined {
        for (let item of Data.professionalCards) {
            if (item.id == card.id) {
                const ret: any = {}
                Object.assign(ret, item)
                return ret
            }
        }
    }
}