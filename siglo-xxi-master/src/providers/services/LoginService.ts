import Uris from '@/constants/Uris';
import Instance from './ServiceInstance';
import User from '@/models/User';
import Axios from 'axios';

export default class LoginService {
    public static createLogin(user: User) {
        return Axios.get("https://jsonip.com").then(
            response => {
                return Instance.post(Uris.login, user, {
                    headers: {
                        ip: response.data.ip
                    }
                })
            }
        );
    }

    public static createForget(user: User) {
        return Instance.post(Uris.forget, user)
    }

    public static createRecover(user: {}) {
        return Instance.post(Uris.recover, user)
    }
}