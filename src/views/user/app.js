import Vue from '../layout/index'
import App from '../layout/index.vue'
import router from '../../router'
import store from '../../store'

export default new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

