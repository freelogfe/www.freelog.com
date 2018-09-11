import Vue from 'vue'
import Service from './services'
import {Error} from '../../plugins/error'
const DEFAULT_EVENT_NAME = 'freelogSystemService';

export default {
  init(app) {
    this.app = app
    this.bus = new Vue()
    //统一监听服务，根据action进行分发执行器
    this.bus.$on(DEFAULT_EVENT_NAME, this.dispatchHandler.bind(this))
  },
  showErrorMessage(err) {
    Error.showErrorMessage(err)
  },
  dispatchHandler(event) {
    var detail = event.detail
    var handlerName = detail.eventName
    var opts = detail.opts || {}
    var Handler = Service[handlerName]

    if (Handler) {
      try {
        Handler.handle(opts.data, this.app, opts.callback)
      } catch (err) {
        this.showErrorMessage(err)
      }
    } else {
      console.warn('不存在对应的异常处理函数')
    }
  },
  trigger(eventName, opts) {
    this.bus.$emit(DEFAULT_EVENT_NAME, {
      detail: {
        eventName: eventName,
        opts: opts
      }
    })
  }
}