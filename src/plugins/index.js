/**
 * vue plugins
 */

import axios from './axios'
import filters from './filters'
import eventBus from './event-bus'

export default {
  install(Vue) {
    filters(Vue)
    axios(Vue)
    eventBus(Vue)
  }
}
