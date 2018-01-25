import Vue from '../index'
import store from '../../store'

export default function (opts) {
  new Vue(Object.assign({
    el: '#app',
    store
  }, opts))
}
