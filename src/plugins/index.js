/**
 * vue plugins
 */

import axios from './axios'
import filters from './filters'
import eventBus from './event-bus'
import store from './store'

export default {
  install(Vue) {
    filters(Vue)
    axios(Vue)
    store(Vue)
    eventBus(Vue)
  }
}
