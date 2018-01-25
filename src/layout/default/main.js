import Vue from '../user/index'
import store from '../../store'

export default function (opts) {
  return new Vue(Object.assign({
    el: '#main-app',
    store
  }, opts))
}
