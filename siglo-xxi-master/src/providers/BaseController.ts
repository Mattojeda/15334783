import { Component, Vue, Emit } from 'vue-property-decorator';
import Messages from "@/constants/Messages";
import Alert from '@/models/Alert';
import Descriptor from '@/models/Descriptor';
import Config from '@/constants/Config';

@Component
export default class BaseController extends Vue {
    Messages = Messages;
    rules = {
        required: (value: any) => this.requiredValidation(value),
        number: (value: string) => this.regexpOptionalValidation(value, Config.regexps.number) || Messages.errors.numberError,
        min10: (value: string) => this.minValidation(value, 10),
        email: (value: string) => this.regexpOptionalValidation(value, Config.regexps.email) || Messages.errors.email
    }

    regexpOptionalValidation(value: string, reg: RegExp) {
        if (!value) {
            return true
        } else {
            return new RegExp(reg)
                .test(value)
        }
    }

    minValidation(value: string, length: number): string | true {
        return !value || value.length < length ? Messages.errors.Minimun + ' ' + length + ' ' + Messages.errors.character : true
    }

    requiredValidation(value: any) {
        if (value instanceof Descriptor) {
            return !!value.id || Messages.errors.required
        }
        if (!value) {
            return Messages.errors.required
        } else if (value.length > Config.inputMaxCharacters) {
            return Messages.errors.appLength
        } else {
            return true
        }

    }

    @Emit("showMessage")
    showMessage(alerts: Alert[]) { }
}