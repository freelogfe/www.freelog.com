import Vue from '@/layout/index'
import App from './app.vue'

window.QI = document.querySelector('.js-lib-qi');

new Vue({
    el: '#app',
    render: h => h(App)
})
