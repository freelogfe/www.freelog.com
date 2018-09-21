
import { Error } from '@/plugins/error'
import Vue from 'vue'
import exceptionCode from './exception-code'
import eventSet from './event-map'

export default function initialEventCenter(options) {
  const vm = new Vue()
  const appUiVm = options.appUiVm // app实例：app.vue
  const eventNames = {}
  window.FreelogApp = window.FreelogApp || {}
  window.FreelogApp = Object.assign(window.FreelogApp, {
    trigger,
    exceptionCode,
    eventNames,
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
