import Vue from '@/layout'
import AppView from './app.vue'
import PageBuildeParser from './parser'

const DEFAULT_EVENT_NAME = 'freelogSystemService';

var App = {
    initApp() {
        new Vue({
            el: '#app',
            render: h => h(AppView)
        });
        this.$app = document.querySelector('#app')
        this.$app.addEventListener(DEFAULT_EVENT_NAME, this.eventDispatcher.bind(this))
    },
    eventDispatcher(event) {
        var detail = event.detail
        var eventName = detail.eventName
        var data = detail.data

        console.log(event)
    },
    main() {
        window.QI = document.querySelector('.js-lib-qi');

        this.initApp()
        PageBuildeParser.start()
    },
    isValidResponse(res){
        return (res.ret === 0 && res.errcode === 0)
    },
    trigger(eventName, opts) {
        var event = new CustomEvent(DEFAULT_EVENT_NAME, {
            detail: {
                eventName: eventName,
                data: opts
            }
        })
        this.$app.dispatchEvent(event)
    }
}

window.FreeLogApp = App;
App.main()


export default App


