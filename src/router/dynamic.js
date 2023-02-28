import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Document from '../views/DocumentTable.vue'
import DocumentShow from '../views/DocumentShow.vue'
import Task from '../views/Task.vue'
import Login from '../views/login/index.vue'
import UserInfo from '../views/UserInfo/index.vue'
import Creater from '../views/Creater.vue'
import ProjectCreate from '../components/ProjectCreate/ProjectCreate.vue'
import ProjectPreview from '../components/ProjectPreview/ProjectPreview.vue'
import UserEdit from '../views/UserEdit.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        // 初始路由表
        { path: '/home', name: 'Home', component: Home },
        { path: '/login', name: 'login', component: Login },
        { path: '*', name: 'Error404', component: () => import('@/views/Error404.vue') }
    ]
})

// 项目经理路由表数据
const PRRoutes = [
    { path: '/user', component: User }, // 人员管理
    { path: '/document', component: Document }, // 文档管理
    { path: '/task', component: Task }, // 任务管理
    { path: '/cerater', component: Creater },
    { path: '/userinfo', name: 'userInfor', component: UserInfo },// 个人信息
    { path: '/create', component: ProjectCreate },
    { path: '/preview', component: ProjectPreview },
    { path: '/documentShow', component: DocumentShow }, // 文档展示
    { path: '/useredit', component: UserEdit }, // 人员编辑
]
// 普通员工路由表数据
const comRoutes = [
    { path: '/document', component: Document }, // 文档管理
    { path: '/documentShow', component: DocumentShow }, // 文档展示
    { path: '/userinfo', name: 'userInfor', component: UserInfo },// 个人信息
    { path: '/task', component: Task }, // 任务管理
]


// 导出路由实例
export default router
