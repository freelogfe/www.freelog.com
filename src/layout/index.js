import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/static/css/reset.css';
import '@/static/css/global.less';
import '@/static/css/element-ui.less';
import plugins from '../plugins';
import store from '../store'

function shouldGotoIndex() {
  var loginPath = '/pages/user/login.html'
  if (location.pathname === loginPath) {
    location.replace('/pages/user/index.html')
  }
}

function checkLoginStatus() {
  var user = store.getters.session || {}
  if (!user || !user.userId) {
    store.dispatch('checkUserSession').then((valid) => {
      if (valid) {
        shouldGotoIndex()
      }
    })
  } else {
    shouldGotoIndex()
  }
}

checkLoginStatus()

Vue.use(ElementUI)
Vue.use(plugins)

export default Vue
