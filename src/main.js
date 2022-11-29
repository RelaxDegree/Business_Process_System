// 该文件是整个项目的入口文件
import Vue from 'vue'
// 引入vue
import App from './App.vue'
// 引入app组件 是所有组件的父组件
// 引入elementUI组件库
import ElementUI from 'element-ui';
// 引入elementUI的全部样式
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'
import axios from 'axios';


Vue.config.productionTip = false
// 关闭vue的生产提示
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.prototype.$axios = axios
// 应用element
new Vue({
  store : store,
  render: h => h(App),
  // 完成了将app组件放入容器中
}).$mount('#app')
