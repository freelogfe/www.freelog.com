import Vue from '@/layout/default/index'

import AppView from './app.vue'
import '@/lib/freelog-core/index.js'
import PageBuildeParser from './parser'

import initialEventCenter from './event-center/index.js'

import {gotoCacheScrollTop} from '../../lib/utils'

function main() {

  document.body.querySelector('#js-page-container').classList.add('freelog-app-loading');

  Vue({
    el: '#app',
    template: '<app-view @ready="onReady"/>',
    components: {'app-view': AppView},
    methods: {
      // app-view mounted
      onReady(appUiVm) {
        this.appUiVm = appUiVm

        initialEventCenter({
          appUiVm
        })
        
        appUiVm.$on('close', function () {

        })

        PageBuildeParser.start()
        gotoCacheScrollTop()
      },
      notify(opt) {
        if (!opt.duration) {
          opt.duration = 3e3;
        }
        this.$notify(opt);
      }
    }
  })
}

main()

