import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router/index';
import store from './store';
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.use(Vuex);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
// // 全局前置导航守卫
// router.beforeEach((to, from, next) => {
//   // 判断token
//   const token = Cookie.get('token')
//   if (!token && to.name === 'home') {
//     next({ name: 'login' })
//   } else if (!token && to.name !== 'login') {
//     next({ name: 'login' })
//   } else if (token && to.name === 'login') {
//     next({ name: 'home' })
//   } else {
//     next()
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
