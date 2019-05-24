import Vue from 'vue'
import I18n from 'vue-i18n'
import en from './locales/en'
import cn from './locales/cn'

Vue.use(I18n)

// https://kazupon.github.io/vue-i18n/dynamic.html
const LangMap = {
  cn: 'zh-CN',
  en: 'en'
}

function initI18n() {
  const win = window

  var language = window.localStorage.getItem('locale')

  if (!Object.values(LangMap).includes(language)) {
    if (/^zh(\-\w+)?/.test(navigator.language)) {
      language = LangMap.cn
    } else {
      language = LangMap.en
    }
  }

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
