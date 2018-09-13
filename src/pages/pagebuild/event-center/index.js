import Vue from 'vue'
import { HANDLE_INVALID_RESPONSE, HANDLE_INVALID_AUTH, GO_TO_LOGIN, REPORT_ERROR, NOTIFY_NODE, SHOW_ERROR_MESSAGE, SHOW_SIGN_DIALOG  } from './event-name.js'
import exceptionCode from './exception-code.js'
import eventHandlers from '../event-handlers/index'

export default function initialEventCenter (options){
    var vm = new Vue()
    var EC = window.EC = {
        trigger,
        exceptionCode,
        appUiVm : options.appUiVm,                  // app实例：app.vue 
        eventName : {
            HANDLE_INVALID_RESPONSE, HANDLE_INVALID_AUTH, GO_TO_LOGIN, REPORT_ERROR, NOTIFY_NODE
        }
    }

    // 监听事件：
    vm.$on(HANDLE_INVALID_RESPONSE, eventHandlers.handleInvalidResponse)
    vm.$on(HANDLE_INVALID_AUTH, eventHandlers.handleAuthError)
    vm.$on(SHOW_SIGN_DIALOG, eventHandlers.showResourceSignDialog)
    vm.$on(GO_TO_LOGIN, eventHandlers.goToLogin)
    vm.$on(NOTIFY_NODE, eventHandlers.notifyNode)
    vm.$on(REPORT_ERROR, eventHandlers.reportError)

    function trigger(){
        vm.$emit.apply(vm, Array.prototype.slice.call(arguments))
    }

}