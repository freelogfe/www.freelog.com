import Vue from '@/layout'

import AppView from '../app.vue'

import PageBuildeParser from '../parser'
import ExceptionCode from '../exception_code'
import Service from '../service'

const DEFAULT_EVENT_NAME = 'freelogSystemService';

var App = {
    initApp() {
        var app = new Vue({
            el: '#app',
            render: h => h(AppView),
            mounted() {
                window.FreeLogUI.$on('close', function () {
                    debugger
                })
            }
        });
        this.bus = new Vue()
        //统一监听服务，根据action进行分发执行器
        this.bus.$on(DEFAULT_EVENT_NAME, this.eventDispatcher.bind(this))
    },
    eventDispatcher(event) {
        var detail = event.detail
        var handlerName = detail.eventName
        var opts = detail.opts
        var data = opts.data
        if (Service[handlerName]) {
            Service[handlerName](opts.data)
            console.log('handlerName',handlerName)
            //todo
        } else {
            console.warn('不存在对应的错误处理函数')
        }

        // window.FreeLogUI.checkAuthHandler(opts.data)
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
        // console.log(window.FreeLogUI)
        this.bus.$emit(DEFAULT_EVENT_NAME, {
            detail: {
                eventName: eventName,
                opts: opts
            }
        })
    }
}

window.FreeLogApp = App;
window.FreeLogApp.ExceptionCode = ExceptionCode
App.main()


export default App