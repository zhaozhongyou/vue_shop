import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import Element, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'

Vue.use(Element)
Vue.prototype.$message = Message

// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
