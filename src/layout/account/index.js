import Vue from '../default'
import App from './index.vue'
import store from '../../store'

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

export default Vue
