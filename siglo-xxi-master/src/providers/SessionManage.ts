import Config from '@/constants/Config';
import User from '@/models/User';

export default class SessionManage {

    static get(): User | false {
        const user = sessionStorage.getItem(Config.session.direction)
        return !user ? false : JSON.parse(user)
    }

    static delete(): void {
        sessionStorage.removeItem(Config.session.direction)
    }

    static create(user: User): void {
        sessionStorage.setItem(Config.session.direction, JSON.stringify(user))
    }

    static saveForm(formName: string, propertiesTosave: string[], object: any) {
        const saveObject: any = {}
        for (const item of propertiesTosave) {
            saveObject[item] = object[item]
        }
        saveObject.timestamp = new Date().getTime()
        sessionStorage.setItem(formName, JSON.stringify(saveObject))
    }

    static getForm(formName: string): any {
        let form: any = sessionStorage.getItem(formName)
        if (!form) {
            return false
        } else {
            form = JSON.parse(form)
            if (form.timestamp && new Date().getTime() - form!.timestamp < Config.formSesionLimit) {
                return form
            } else {
                return false
            }
        }
    }
}