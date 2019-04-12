import { Component, Vue, Emit } from 'vue-property-decorator';
import Messages from "@/constants/Messages";
import Alert from '@/models/Alert';
import Descriptor from '@/models/Descriptor';

@Component
export default class BaseController extends Vue {
    Messages = Messages;
    rules = {
        required: (value: any) => this.requiredValidation(value),
        min10: (value: string) => this.minValidation(value, 10),
        email: (value: string) => new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
            .test(value) || Messages.errors.email,
        optionalEmail: (value: string) => this.optionalEmail(value)
    }

    minValidation(value: string, length: number): string | true {
        return !value || value.length < length ? Messages.errors.Minimun + ' ' + length + ' ' + Messages.errors.character : true
    }

    requiredValidation(value: any) {
        if (value instanceof Descriptor) {
            return !!value.id || Messages.required
        }
        return !!value || Messages.required
    }

    optionalEmail(value: string) {
        if (!value) {
            return true
        } else {
            return new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
                .test(value) || Messages.errors.email
        }
    }

    @Emit("showMessage")
    showMessage(alerts: Alert[]) {
    }
}