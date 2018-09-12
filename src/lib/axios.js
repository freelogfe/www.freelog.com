/**
 * https://github.com/axios/axios
 * https://github.com/superman66/vue-axios-github
 */
//cors bug :https://github.com/axios/axios/issues/891

import axios from 'axios'
import {gotoLogin} from './utils'

const instance = axios.create({
  // baseURL: '/api/',
  timeout: 10e3,
  // crossdomain: true,
  // withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

instance.interceptors.request.use(config => {
    if (!/^\/qi\//.test(config.url) && !/^\/api\//.test(config.url)) {
      config.url = '/api' + config.url
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });


instance.interceptors.response.use(response => {
    var data = response.data
    if ([28, 30].indexOf(data.errcode) > -1 && location.pathname.indexOf('/pages/user/login.html') === -1) {
      gotoLogin(location.href)
    } else {
      return response
    }
  },
  err => {
    err.response = err.response || {}
    return Promise.reject(err);
  });

export default instance
