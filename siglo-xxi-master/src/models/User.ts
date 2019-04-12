import Role from './Role';
import Person from './Person';

export default class User extends Person {
    userName?: string
    email?: string
    password?: string
    roles: Role[]
    role?: Role
    phone?: string
    cellphone?: string
    img?: string
    status?: "ACTIVE" | "DISABLED" | "BLOCK"

    constructor() {
        super()
        this.roles = []
    }
}