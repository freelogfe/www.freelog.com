import Vue from '@/views/layout/index'
import { gotoCacheScrollTop } from '@/lib/utils'
import '@/lib/freelog-core/index'

import AppView from './App.vue'
import PageBuildeParser from './parser'

import AppCenter from './event-center'

document.body.querySelector('#js-page-container').classList.add('freelog-app-loading')

export default new Vue({
  el: '#app',
  methods: {
    // app-view mounted
    onReady(appUiVm) {
      this.appUiVm = appUiVm

      AppCenter.setOptions({ appUiVm })
      appUiVm.$on('close', () => {
      })

      PageBuildeParser.start()
      gotoCacheScrollTop()
    }
  },
  mounted() {
    this.onReady(this.$children[0])
  },
  render: h => h(AppView)
})

