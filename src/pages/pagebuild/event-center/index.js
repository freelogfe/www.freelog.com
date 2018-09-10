import Vue from 'vue'
import { INVALID_RESPONSE, INVALID_AUTH, GO_TO_LOGIN, REPORT_ERROR, NOTIFY_NODE, SHOW_ERROR_MESSAGE  } from './event-name.js'
import exceptionCode from './exception-code.js'
import servives from '../services'
import { gotoLogin } from "@/lib/utils";

export default function initialEventCenter (options){
    var vm = new Vue()
    var EC = window.EC = {
        trigger,
        exceptionCode,
        appUiVm : options.appUiVm,                  // app实例：app.vue 
        ventName : {
            INVALID_RESPONSE, INVALID_AUTH, GO_TO_LOGIN, REPORT_ERROR, NOTIFY_NODE
        }
    }

    // 监听事件：
    vm.$on(INVALID_RESPONSE, handleInvalidResponse)
    vm.$on(INVALID_AUTH, servives.handleAuthError)
    vm.$on(GO_TO_LOGIN, function (inValidResponse, callback){
        gotoLogin()
    })
    vm.$on(REPORT_ERROR, function (error){})
    vm.$on(NOTIFY_NODE, function (){
        EC.appUiVm.$message({
            type: 'error',
            message: '节点资源合同未生效，已通知节点'
        })
    })
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
        return (event && event.eventName) || INVALID_AUTH
    }
}