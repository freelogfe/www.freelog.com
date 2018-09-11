import Vue from 'vue'
import { HANDLE_INVALID_RESPONSE, HANDLE_INVALID_AUTH, GO_TO_LOGIN, REPORT_ERROR, NOTIFY_NODE, SHOW_ERROR_MESSAGE, SHOW_SIGN_DIALOG  } from './event-name.js'
import exceptionCode from './exception-code.js'
import services from '../services'
import { gotoLogin } from "@/lib/utils"

export default function initialEventCenter (options){
    var vm = new Vue()
    var EC = window.EC = {
        trigger,
        exceptionCode,
        appUiVm : options.appUiVm,                  // app实例：app.vue 
        ventName : {
            HANDLE_INVALID_RESPONSE, HANDLE_INVALID_AUTH, GO_TO_LOGIN, REPORT_ERROR, NOTIFY_NODE
        }
    }

    // 监听事件：
    vm.$on(HANDLE_INVALID_RESPONSE, handleInvalidResponse)
    vm.$on(HANDLE_INVALID_AUTH, services.handleAuthError)
    vm.$on(SHOW_SIGN_DIALOG, services.showResourceSignDialog)

    vm.$on(GO_TO_LOGIN, function (inValidResponse, callback){
        gotoLogin()
    })
    vm.$on(NOTIFY_NODE, function (msg){
        msg = typeof msg == 'string' ? msg : '节点资源合同未生效，已通知节点'
        EC.appUiVm.$message({
            type: 'error',
            message:  msg
        })
    })
    vm.$on(REPORT_ERROR, function (error){})
    vm.$on(SHOW_ERROR_MESSAGE, function (){})


    function trigger(){
        vm.$emit.apply(vm, Array.prototype.slice.call(arguments))
    }

    function handleInvalidResponse (inValidResponse, callback){
        var eventName = getEventName(inValidResponse)
        vm.$emit(eventName, inValidResponse, callback)
    }

    function getEventName (inValidResponse){
        const event = exceptionCode[inValidResponse.errcode]
        return (event && event.eventName) || HANDLE_INVALID_AUTH
    }
}