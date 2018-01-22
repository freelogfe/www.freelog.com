/**
 * https://github.com/axios/axios
 * https://github.com/superman66/vue-axios-github
 */
//cors bug :https://github.com/axios/axios/issues/891

import axios from 'axios'

const instance = axios.create({
  baseURL: '/api/',
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
    var loginPath = '/pages/user/login.html'

    var data = response.data
    if (data.errcode === 28 && location.pathname !== loginPath) {
      location.replace(loginPath)
      //replace执行存在延迟
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(response)
        }, 5e2)
      })
    } else {
      return response
    }
  },
  err => {
    err.response = err.response || {}
    return Promise.reject(err);
  });

export default instance
