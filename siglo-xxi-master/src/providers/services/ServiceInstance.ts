
import Axios from 'axios';
import Uris from '@/constants/Uris';
import Config from '@/constants/Config';
import SessionManage from '../SessionManage';
import router from '@/router';

const Instance = Axios.create({
    baseURL: Uris.base,
    timeout: Config.timeoutServices,
    headers: Config.commonHeaders
});

Instance.interceptors.request.use(function (config) {
    config.headers[Config.AuthHeader] = SessionManage.get()
    return config;
});

// Add a response interceptor
Instance.interceptors.response.use(response => {
    if (response.status == 401) {
        SessionManage.delete()
        router.push({ path: "/" })
    }
    return response
}, data => {
    if (data.response.status == 401) {
        SessionManage.delete()
        router.push({ path: "/" })
    }
    return data.response
});

export default Instance