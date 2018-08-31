import Vue from '@/layout/default/index'

import AppView from './app.vue'
import '@/lib/freelog-core/index.js'

import PageBuildeParser from './parser'
import EventCode from './event-code'
import EventDispatcher from './event-dispatcher'
import ExceptionCode from './exception-code'
import {gotoCacheScrollTop} from '../../lib/utils'
//对外接口服务
var App = {
  isValidResponse(res) {
    return (res && (res.ret === 0 && res.errcode === 0))
  },
  trigger() {
    EventDispatcher.trigger.apply(EventDispatcher, arguments)
  },
  handleErrorResponse(response, callback) {
    var exception = ExceptionCode[response.errcode] || {}
    var event = exception.action || EventCode.invalidResponse

    this.trigger(event, {
      data: response,
      callback: callback
    });
  },
  getErrorInfo(error) {
    return ExceptionCode[error.errcode] || {
      desc: `未定义的错误[${error.errcode}]`,
      tip: '上报错误',
      action: 'reportHandler',
    }
  },
  EventCode,
  ExceptionCode
}

// 废弃于2018/08/28
function initGlobalQI() {
  var $QI = document.querySelector('.js-lib-qi')
  Object.defineProperty(window, 'QI', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: Object.freeze($QI)
  })
  //  window.QI = $QI;
}

function main() {
  //render app view

  document.body.querySelector('#js-page-container').classList.add('freelog-app-loading');

  Vue({
    el: '#app',
    template: '<app-view @ready="onReady"/>',
    components: {'app-view': AppView},
    methods: {
      onReady(appUI) {
        //挂载UI
        this.appUI = appUI
        window.FreeLogApp = App;
        EventDispatcher.init({
          vm: this,
          ui: appUI,
          model: this.$store
        })
        if (window.__supports) {
          PageBuildeParser.start()
        }
        appUI.$on('close', function () {
        })

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

export default App
