/**
 * Vuex docs
 * https://vuex.vuejs.org/zh-cn/getting-started.html
 */

import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import modules from './modules'

Vue.use(Vuex)

const strict = process.env.NODE_ENV !== 'production'

const plugins = [];

const store = new Vuex.Store({getters, modules, strict, plugins})

export default store
