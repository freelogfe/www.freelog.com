import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/static/css/reset.css';
import '@/static/css/global.less';
import '@/static/css/element-ui.less';
import plugins from '../plugins';

Vue.use(ElementUI)
Vue.use(plugins)


window.G_FreelogConfig = {
  isTest: /\.testfreelog\.com$/.test(location.host)
};
G_FreelogConfig.mainDomain = G_FreelogConfig.isTest? 'testfreelog.com': 'freelog.com'


function supportsWebComponent() {
  return !!window.customElements
}

function supportsImports() {
  return 'import' in document.createElement('link');
}

function supportsFetch() {
  return !!window.fetch;
}

function detectSupports() {
  var win = window
  win.__supports = false
  win.__supportMsg = ''

  if (!supportsWebComponent()) {
    win.__supportMsg = '不支持window.customElements'
  } else if (!supportsImports()) {
    win.__supportMsg = '不支持link import属性'
  } else if (!supportsFetch()) {
    win.__supportMsg = '不支持fetch'
  } else {
    win.__supports = true
  }

  return win.__supports
}


function alertTip() {
  var errMsg = '不支持当前浏览器访问，请使用PC最新版chrome浏览器访问！'

  if (/debug/.test(location.search)) {
    errMsg += window.__supportMsg
  }
  alert(errMsg)
}

if (!detectSupports()) {
  alertTip()
}


export default Vue
