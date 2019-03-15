import Vue from '@/lib/vue'
import i18n from '../../lib/i18n/index'
import ElementUI from 'element-ui'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'
import '@/styles/global.less'
import '@/styles/element-ui.less'
import plugins from '../../plugins'

Vue.use(ElementUI, {locale: i18n.locale === 'en' ? enLocale : zhLocale})
Vue.use(plugins)

export default Vue
