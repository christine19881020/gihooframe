// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//css import 
import '@/css/common.scss'
import '@/css/cssfix.scss'
import 'font-awesome/css/font-awesome.min.css'

import '@/css/color.scss'
import '@/css/button.scss'

//element-ui import
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
