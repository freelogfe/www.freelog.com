import Vue from '@/layout/default/index'

import AppView from './app.vue'

import PageBuildeParser from './parser'
import EventCode from './event-code'
import EventDispatcher from './event-dispatcher'
import ExceptionCode from './exception-code'

//对外接口服务
var App = {
  isValidResponse(res) {
    return (res && (res.ret === 0 && res.errcode === 0))
  },
  trigger() {
    EventDispatcher.trigger.apply(EventDispatcher, arguments)
  },
  handleErrorResponse(response, callback){
    var App = window.FreeLogApp
    var exception = App.ExceptionCode[response.errcode] || {}
    var event = exception.action || App.EventCode.invalidResponse
    App.trigger(event, {
      data: response,
      callback: callback
    });
  },
  EventCode,
  ExceptionCode
}

function main() {
  window.QI = document.querySelector('.js-lib-qi');
  //render app view
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
      },
      notify(opt){
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
