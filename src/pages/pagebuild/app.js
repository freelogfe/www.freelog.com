import Vue from '@/layout/index'

import AppView from './app.vue'

import PageBuildeParser from './parser'
import EventCode from './event_code'
import EventDispatcher from './event-dispatcher'

//对外接口服务
var App = {
    isValidResponse(res) {
        return (res && (res.ret === 0 && res.errcode === 0))
    },
    trigger() {
        EventDispatcher.trigger.apply(EventDispatcher, arguments)
    },
    EventCode
}

function main() {
    window.QI = document.querySelector('.js-lib-qi');

    //render app view
    new Vue({
        el: '#app',
        template: '<app-view @ready="onReady"/>',
        components: {'app-view': AppView},
        methods: {
            onReady(appUI) {
                //挂载UI
                this.appUI = appUI
                window.FreeLogApp = App;
                EventDispatcher.init(appUI)
                PageBuildeParser.start()
                appUI.$on('close', function () {
                    console.log('close app ui dialog')
                })
            }
        }
    });
}

main()

export default App
