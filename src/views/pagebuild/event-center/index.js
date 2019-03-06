import { Error } from '@/plugins/error'
import Vue from 'vue'
import exceptionCodes from './exception-code'
import eventsMap from './event-map'
import * as eventNames from './event-name'

class AppCenter {
  constructor(options) {
    const win = window
    win.FreelogApp = win.FreelogApp || {}
    this.options = options || {}
    this.$eventBus = new Vue()
    this.initApp()
  }

  initApp() {
    const win = window
    const self = this

    Object.assign(win.FreelogApp, {
      trigger,
      on: this.$eventBus.$on.bind(this.$eventBus),
      eventNames,
      getErrorInfo(error) {
        return exceptionCodes[error.errcode] || {
          desc: self.options.$i18n.t('pagebuild.errors[1]') + `[${error.errcode}]`,
          tip: self.options.$i18n.t('pagebuild.tips[0]'),
          eventName: 'REPORT_ERROR',
        }
      }
    })

    function trigger(name, opts, callback) {
      opts = opts || {}

      if (typeof opts.callback === 'function') {
        callback = opts.callback
      }

      callback = callback || function cb() {}

      const handler = eventsMap[name]
      if (handler) {
        try {
          if (!self.options.appUiVm) {
            throw new Error('not set app ui instance')
          }
          handler({ appUiVm: self.options.appUiVm, $i18n: self.options.$i18n }, opts, callback)
        } catch (err) {
          Error.showErrorMessage(err)
        }
      } else {
        console.error(self.options.$i18n.t('pagebuild.errors[0]'))
      }
    }
  }

  setOptions(options) {
    Object.assign(this.options, options)
    this.resetExceptionCodes(options)
  }

  resetExceptionCodes(options) {
    Object.assign(window.FreelogApp, {
      exceptionCodes: options.$i18n.t('pagebuild.exceptionCodes')
    })
  }

  emit(...args) {
    this.$eventBus.$emit(...args)
  }
}

const ins = new AppCenter()

export default ins
