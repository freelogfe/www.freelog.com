/**
 * https://github.com/axios/axios
 * https://github.com/superman66/vue-axios-github
 */
//cors bug :https://github.com/axios/axios/issues/891

import axios from 'axios'

const instance = axios.create({
    baseURL: '//api.freelog.com/',
    timeout: 3e3,
    // crossdomain: true,
    // withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

instance.interceptors.request.use(config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    });


instance.interceptors.response.use(response => {
        return response
    },
    err => {
        err.response = err.response || {}
        return Promise.reject(err);
    });

export default instance
