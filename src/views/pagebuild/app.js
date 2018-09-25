import Vue from '@/views/layout/index'
import { gotoCacheScrollTop } from '@/lib/utils'
import '@/lib/freelog-core/index'

import AppView from './App.vue'
import PageBuildeParser from './parser'

import initialEventCenter from './event-center'


document.body.querySelector('#js-page-container').classList.add('freelog-app-loading')

new Vue({
  el: '#app',
  methods: {
    // app-view mounted
    onReady(appUiVm) {
      this.appUiVm = appUiVm

      initialEventCenter({
        appUiVm
      })

      appUiVm.$on('close', () => {

      })

      PageBuildeParser.start()
      gotoCacheScrollTop()
    },
    notify(opt) {
      if (!opt.duration) {
        opt.duration = 3e3
      }
      this.$notify(opt)
    }
  },
  mounted() {
    this.onReady(this.$children[0])
  },
  render: (h) => h(AppView)
})

