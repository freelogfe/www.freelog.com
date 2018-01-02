/**
 * vue plugins
 */

import axios from './axios'
import filters from './filters'

export default {
    install(Vue) {
        filters(Vue)
        axios(Vue)
    }
}
