/**
 * https://github.com/axios/axios
 * https://github.com/superman66/vue-axios-github
 */
// cors bug :https://github.com/axios/axios/issues/891

import axios from 'axios'
// import { gotoLogin } from './utils'
import { tools } from '@/components/UserAuthority/index.vue';

const instance = axios.create({
  baseURL: window.FreelogApp.Env.qiOrigin,
  timeout: 1e4,
  withCredentials: true,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest'
  }
})

instance.interceptors.request.use(
  config => config,
  err => Promise.reject(err),
)


instance.interceptors.response.use(
  (response) => {

  },
  (err) => {
    err.response = err.response || {}
    return Promise.reject(err)
  },
)

tools.listenResponseAuth(instance);

export default instance
