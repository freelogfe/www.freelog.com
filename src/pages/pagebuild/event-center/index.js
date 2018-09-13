import Vue from 'vue'
import exceptionCode from './exception-code.js'
import {Error} from '@/plugins/error'
import  { eventSet } from './event-map.js'

export default function initialEventCenter (options){
    var vm = new Vue()
    var appUiVm = options.appUiVm       // app实例：app.vue 
    var eventNames = {}
    var FreelogApp = window.FreelogApp = window.FreelogApp || {}
    FreelogApp = Object.assign(FreelogApp, {
        trigger,
        exceptionCode,   
        eventNames,
    })

    // 注册监听事件：
    for(let event of eventSet){
        eventNames[event.name] = event.name
        vm.$on(event.name, resolveEventHandler(event.name, event.handler))
    }


    function trigger(){
        vm.$emit.apply(vm, Array.prototype.slice.call(arguments))
    }

    function resolveEventHandler (name, handler){
        return function (options, callback){
            if(typeof callback == 'undefined'){
                if(options.callback && typeof otpions.callback == 'function'){
                    callback = options.callback
                }
            }
            if(typeof callback != 'function') {
                callback = function (){}
            }
            options = options || {}
            try{
                handler({ appUiVm }, options, callback)
            }catch(err){
                Error.showErrorMessage(err)
            }
            
        }
    }
}