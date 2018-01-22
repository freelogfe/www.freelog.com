import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/static/css/reset.css';
import '@/static/css/global.less';
import '@/static/css/element-ui.less';
import plugins from '../plugins';
import store from '@/lib/storage';
import Axios from '@/lib/axios'

function loadUserInfo() {
  return Axios.get('/v1/userinfos/current').then(function (res) {
    return res.data;
  })
}

function shouldGotoIndex() {
  var loginPath = '/pages/user/login.html'
  if (location.pathname === loginPath) {
    location.replace('/pages/user/index.html')
  }
}

function checkLoginStatus() {
  var user = store.get('userInfo') || {}
  if (!user || !user.userId) {
    loadUserInfo().then((res) => {
      var data = res.data
      if (res.errcode === 0) {
        store.set('userInfo', data)
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
