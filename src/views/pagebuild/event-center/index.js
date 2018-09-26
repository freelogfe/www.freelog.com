
import { Error } from '@/plugins/error'
import Vue from 'vue'
import exceptionCodes from './exception-code'
import eventSet from './event-map'

function initEnv() {
  const win = window
  var isTest = /\.testfreelog\.com$/.test(win.location.host)
  win.FreelogApp.Env = win.FreelogApp.Env || {}

  Object.assign(win.FreelogApp.Env, {
    nodeId: win.__auth_info__.__auth_node_id__,
    userId: win.__auth_info__.__auth_user_id__,
    isTest,
    mainDomain:isTest ? 'testfreelog.com' : 'freelog.com'
  })
}

initEnv()

export default function initialEventCenter(options) {
  const vm = new Vue()
  const appUiVm = options.appUiVm // app实例：app.vue
  const eventNames = {}
  const win = window

  win.FreelogApp = win.FreelogApp || {}
  win.FreelogApp = Object.assign(win.FreelogApp, {
    trigger,
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

  // 注册监听事件：
  eventSet.forEach((event) => {
    eventNames[event.name] = event.name
    vm.$on(event.name, resolveEventHandler(event.name, event.handler))
  })

  function trigger(...args) {
    vm.$emit(...args)
  }

  function resolveEventHandler(name, handler) {
    return function handle(opts, callback) {
      if (typeof callback === 'undefined') {
        if (opts.callback && typeof opts.callback === 'function') {
          callback = options.callback
        }
      }
      if (typeof callback !== 'function') {
        callback = () => {}
      }
      opts = opts || {}
      try {
        handler({ appUiVm }, opts, callback)
      } catch (err) {
        Error.showErrorMessage(err)
      }
    }
  }
}
