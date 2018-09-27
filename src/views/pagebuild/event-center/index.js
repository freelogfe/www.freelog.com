import {Error} from '@/plugins/error'
import Vue from 'vue'
import exceptionCodes from './exception-code'
import eventsMap from './event-map'

class AppCenter {
  constructor(options) {
    const win = window
    win.FreelogApp = win.FreelogApp || {}
    this.options = options || {}
    this.$eventBus = new Vue()
    this.initEnv()
    this.initApp()
  }

  initEnv() {
    const win = window
    var isTest = /\.testfreelog\.com$/.test(win.location.host)
    win.FreelogApp.Env = win.FreelogApp.Env || {}

    Object.assign(win.FreelogApp.Env, {
      nodeId: win.__auth_info__.__auth_node_id__,
      userId: win.__auth_info__.__auth_user_id__,
      isTest,
      mainDomain: isTest ? 'testfreelog.com' : 'freelog.com'
    })
  }

  initApp() {
    const win = window
    const self = this
    const eventNames = Object.keys(eventsMap)

    Object.assign(win.FreelogApp, {
      trigger,
      on: this.$eventBus.$on.bind(this.$eventBus),
      exceptionCodes,
      eventNames,
      getErrorInfo(error) {
        return exceptionCodes[error.errcode] || {
          desc: `未定义的错误[${error.errcode}]`,
          tip: '上报错误',
          eventName: 'REPORT_ERROR',
        }
      }
    })

    function trigger(name, opts, callback) {
      opts = opts || {}

      if (typeof opts.callback === 'function') {
        callback = opts.callback
      }

      callback = callback || function () {
      }

      const handler = eventsMap[name]
      if (handler) {
        try {
          if (!self.options.appUiVm) {
            throw new Error('not set app ui instance')
          }
          handler({appUiVm: self.options.appUiVm}, opts, callback)
        } catch (err) {
          Error.showErrorMessage(err)
        }
      } else {
        console.error('不存在对应的事件处理函数')
      }
    }
  }

  setOptions(options) {
    Object.assign(this.options, options)
  }

  emit(...args){
    this.$eventBus.$emit(...args)
  }
}

const ins = new AppCenter()

export default ins