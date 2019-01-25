import Vue from '@/views/layout/index'
import { Loading } from 'element-ui'
import { gotoCacheScrollTop } from '@/lib/utils'
import '@/lib/freelog-core/index'

import AppView from './App.vue'
import PageBuildeParser from './parser'

import AppCenter from './event-center'

// 页面loading
const loadingInstance = Loading.service({
  fullscreen: true,
  background: 'rgba(255, 255, 255, .6)'
})

export default new Vue({
  el: '#app',
  methods: {
    // app-view mounted
    onReady(appUiVm) {
      this.appUiVm = appUiVm

      AppCenter.setOptions({ appUiVm })
      appUiVm.$on('close', () => {
      })

      PageBuildeParser.init({
        loadingInstance
      })
      gotoCacheScrollTop()
    }
  },
  mounted() {
    this.onReady(this.$children[0])
  },
  render: h => h(AppView)
})

