/**
 * https://github.com/axios/axios
 * https://github.com/superman66/vue-axios-github
 */
// cors bug :https://github.com/axios/axios/issues/891

import axios from 'axios'
import { gotoLogin } from './utils'

const instance = axios.create({
  // baseURL: '/api/',
  timeout: 10e3,
  // crossdomain: true,
  // withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

instance.interceptors.request.use(
  (config) => {
    if (!/^\/qi\//.test(config.url) && !/^\/api\//.test(config.url)) {
      config.url = `/api${config.url}`
    }
    return config
  },
  err => Promise.reject(err),
)


instance.interceptors.response.use(
  (response) => {
    const { data } = response
    if ([28, 30].indexOf(data.errcode) > -1) {
      gotoLogin(window.location.href)
      return null
    }
    return response
  },
  (err) => {
    err.response = err.response || {}
    return Promise.reject(err)
  },
)

export default instance
