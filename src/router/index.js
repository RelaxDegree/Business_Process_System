// src/router/index.js就是当前项目的路由模块
// 1 导入Vue 和VueRouter的包
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由要用到的组件
import ProjectCreate from '../components/ProjectCreate/ProjectCreate.vue'
import ProjectPreview from '../components/ProjectPreview.vue'

 
// 2 调用vue.use()函数，把VueRouter安装为vue插件
Vue.use(VueRouter)

// 3 创建路由的实例对象
const router = new VueRouter({
  // 定义数组routes[],对应哈希地址与组件之间的关系
  routes: [
  //路由规则
    { path: '/create', component: ProjectCreate },
    // { path: '/preview', component: ProjectPreview },
//     { path: '/movie', component: Movie },
//    {
//       path: '/about',
//       component: About,
//       // about组件里的嵌套路由
//       children: [
//         { path: 'tab1', component: Tab1 },
//         { path: 'tab2', component: Tab2 }
//       ]
//     },
    // 路由重定向：强制跳转
    // { path: '/', redirect: '/create' }
  ]
})

// 4 向外共享路由的实例对象
export default router
