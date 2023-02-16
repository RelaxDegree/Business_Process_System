<template>
    <div>
        <el-menu default-active="1-4-1" class="el-menu" @open="handleOpen" @close="handleClose" style="color: darkgray;"
            :collapse="isCollapse">

            <h3>{{isCollapse ? '后台' : '办公流程系统'}}</h3>
            <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" v-if="item.role === '1'" :key="item.name" :index="item.name">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>
            <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" v-if="item.role === '0' && nowtoken==='iamatoken'" :key="item.name" :index="item.name">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"> </i>
                    <span slot="title">其它</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">子选项1</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

        </el-menu>
    </div>
</template>

<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 300px;
    min-height: 400px;
}
.el-menu {
    //width: 200px;
    height: 100vh;
    background-color: rgb(27, 165, 170);
    h3 {
        color: #671f1f;
        align-items: center;
    }
}
</style>

<script>
import Cookie from 'js-cookie'
export default {
    data() {
        return {
            menuData: [
                {
                    path: '/',
                    name: 'home',
                    label: '概览',
                    icon: 's-home',
                    role: '1',
                    url: 'Home/Home'
                },
                {
                    path: '/task',
                    name: 'task',
                    label: '任务管理',
                    icon: 'video-play',
                    role: '1',
                    url: 'MallManage/MallManage'
                },
                {
                    path: '/user',
                    name: 'user',
                    label: '人员管理',
                    icon: 'user',
                    role: '0',
                    url: 'UserManage/UserManage'
                },
                {
                    path: '/document',
                    name: 'document',
                    label: '文档管理',
                    icon: 'document',
                    role: '1',
                    url: 'Document/Document'
                },
                {
                    path: '/Creater',
                    name: 'creater',
                    label: '项目创建',
                    icon: 'document',
                    role: '0',
                    url: 'Creater/Creater'
                },
                {
                    label: '其他',
                    icon: 'location',
                    children: [
                        {
                            path: '/page1',
                            name: 'page1',
                            label: '首页',
                            icon: 'setting',
                            role: '1',
                            url: 'Other/PageOne'
                        },
                        {
                            path: '/page2',
                            name: 'page2',
                            label: '首页',
                            icon: 'setting',
                            role: '1',
                            url: 'Other/PageTwo'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        // 点击菜单
        clickMenu(item) {
            if(this.$route.path !== item.path && !(this.$route.path === '\home' && (item.path === '/') ))
            {
                this.$router.push(item.path)
            }
            this.$store.commit('selectMenu', item)
        }
    },
    computed: {
        // 无子菜单
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        // 有子菜单
        hasChildren() {
            return this.menuData.filter(item => item.children)
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse
        },
        nowtoken() {
            return Cookie.get('token')
        }

    }
}
</script>