import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './request'
Vue.prototype.$request = request;
import {
  Lazyload,
  Toast,
} from 'vant'
Vue.use(Toast,).use(Lazyload,{
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

/*******路由发生变化修改页面title***** */
router.beforeEach((to, from, next) => {
  if (to.meta.title) { document.title = to.meta.title }
  next()
})
/*********************************** */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

