import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/static/css/reset.css';
import '@/static/css/global.less';
import '@/static/css/element-ui.less';
import plugins from '../plugins';

Vue.use(ElementUI)
Vue.use(plugins)

export default Vue
