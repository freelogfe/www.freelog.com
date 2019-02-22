import Vue from 'vue'
import I18n from 'vue-i18n'
import en from './locales/en'
import cn from './locales/cn'
Vue.use(I18n)

// https://kazupon.github.io/vue-i18n/dynamic.html

function initI18n() {
  const win = window
  // var language = 'zh-CN'
  var language = 'en'

  win.FreelogApp = win.FreelogApp || {}
  win.FreelogApp.Env = win.FreelogApp.Env || {}

  win.FreelogApp.Env.leaguage = language

  return new I18n({
    locale: language,
    messages: {
      en,
      cn,
      'zh-CN': cn
    }
  })
}

export default initI18n()
