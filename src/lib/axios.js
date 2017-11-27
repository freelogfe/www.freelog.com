/**
 * https://github.com/axios/axios
 * https://github.com/superman66/vue-axios-github
 */
//cors bug :https://github.com/axios/axios/issues/891

import axios from 'axios'

const instance = axios.create({
  baseURL: '//api.freelog.com/',
  timeout: 3000,
  crossdomain: true,
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
    var errorMsg
    var data = response.data

    if (response.status === 200 && data.ret === 0) {
      response.getData = () => {
        return data.data
      };
      return response
    } else {
      switch (response.status) {
        case 401:
          errorMsg = '未授权！'
          break;
        case 404:
          errorMsg = 'forbidden-禁止访问'
          break;
        case 500:
          errorMsg = '服务器内部异常，请稍后再试！'
          break;
        default:
          errorMsg = data.msg
      }

      response.errorMsg = errorMsg
      return Promise.reject({response})
    }
  },
  err => {
    err.response = err.response || {}
    return Promise.reject(err);
  });

export default instance
