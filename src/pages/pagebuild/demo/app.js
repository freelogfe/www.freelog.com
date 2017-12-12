import Vue from '@/layout'

import AppView from '../app.vue'

import PageBuildeParser from '../parser'
import ExceptionCode from '../exception_code'

const DEFAULT_EVENT_NAME = 'freelogSystemService';

var App = {
    initApp() {
        var app = new Vue({
            el: '#app',
            render: h => h(AppView)
        });
        this.$app = document.querySelector('#app')
        this.$app.addEventListener(DEFAULT_EVENT_NAME, this.eventDispatcher.bind(this))
    },
    eventDispatcher(event) {
        var detail = event.detail
        var handlerName = detail.eventName
        var opts = detail.opts
        if(handlerName) {
            console.log('handlerName',handlerName)
            //todo
        } else {
            console.warn('不存在对应的错误处理函数')
        }
        console.log(handlerName, opts)
    },
    main() {
        window.QI = document.querySelector('.js-lib-qi');

        this.initApp()
        PageBuildeParser.start()
    },
    isValidResponse(res) {
        return (res && (res.ret === 0 && res.errcode === 0))
    },
    trigger(eventName, opts) {
        var event = new CustomEvent(DEFAULT_EVENT_NAME, {
            detail: {
                eventName: eventName,
                opts: opts
            }
        })
        this.$app.dispatchEvent(event)
    }
}

window.FreeLogApp = App;
window.FreeLogApp.ExceptionCode = ExceptionCode
App.main()


export default App