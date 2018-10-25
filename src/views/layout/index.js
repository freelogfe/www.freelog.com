import Vue from '@/lib/vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'
import '@/styles/global.less'
import '@/styles/element-ui.less'
import plugins from '../../plugins'

Vue.use(ElementUI)
Vue.use(plugins)

export default Vue
