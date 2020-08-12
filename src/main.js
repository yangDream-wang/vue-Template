import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './request'
Vue.prototype.$request = request;
import {
  Lazyload,
  Toast,
  Button
} from 'vant'
import 'vant/lib/button/style';
Vue.use(Toast).use(Button).use(Lazyload, {
  lazyComponent: true,
  // loading: require('./assets/images/common/placeholder.gif')
})

/******解决移动端300毫秒的延迟******** */
import FastClick from 'fastclick'/** */
FastClick.attach(document.body);/** */
/*********************************** */
/**********取消启动时生产提示******** */
Vue.config.productionTip = false;
/*********************************** */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

