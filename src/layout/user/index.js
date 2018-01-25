import Vue from '../index'
import App from './index.vue'
import store from '../../store'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

export default Vue
