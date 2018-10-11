import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'
import '@/styles/global.less'
import '@/styles/element-ui.less'
import plugins from '../../plugins'

function initEnv() {
  const win = window
  const isTest = /\.testfreelog\.com$/.test(win.location.host)
  win.FreelogApp = win.FreelogApp || {}
  win.FreelogApp.Env = win.FreelogApp.Env || {}

  if (win.__auth_info__) {
    Object.assign(win.FreelogApp.Env, {
      nodeId: win.__auth_info__.__auth_node_id__,
      userId: win.__auth_info__.__auth_user_id__
    })
  }
  Object.assign(win.FreelogApp.Env, {
    isTest,
    mainDomain: isTest ? 'testfreelog.com' : 'freelog.com'
  })
}

Vue.use(ElementUI)
Vue.use(plugins)

initEnv()
export default Vue
