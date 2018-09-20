import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'
import '@/styles/global.less'
import '@/styles/element-ui.less'
import plugins from '../../plugins'
// import store from '../../store'
// import router from '../../router'
// import App from './index.vue'

Vue.use(ElementUI)
Vue.use(plugins)

window.G_FreelogConfig = {
  isTest: /\.testfreelog\.com$/.test(window.location.host)
}
window.G_FreelogConfig.mainDomain = window.G_FreelogConfig.isTest ? 'testfreelog.com' : 'freelog.com'

export default Vue
