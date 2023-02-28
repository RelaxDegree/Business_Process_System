<template>
    <div>
        <BreadcrumbZ></BreadcrumbZ>
        <el-menu :default-active="activeIndex2" class="el-menu" mode="horizontal" @select="handleSelect">
            <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" v-if="item.role === '1'" :key="item.name"
                :index="item.name">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>
            <el-menu-item @click="clickMenu(item)" v-for="item in noChildren"
                v-if="item.role === '0'" :key="item.name" :index="item.name">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>
        </el-menu>
        
    </div>
</template>
<script>
import Cookie from 'js-cookie'
import {Store} from 'vuex'
// import { it } from 'node:test';
import BreadcrumbZ from './BreadcrumbZ.vue';

export default {
    components: {
        BreadcrumbZ
    },
    data() {
        return {
            activeTab: '',
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
                    path: '/create',
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
        handleSelect() {
            console.log("handSelect")
        },
        clickMenu(item) {
            //console.log(item)
            if (this.$route.path !== item.path && !(this.$route.path === '\home' && (item.path === '/'))) {
                this.$router.push(item.path)
            }
            this.$store.commit('selectMenu', item)
        }
    },
    computed: {
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        hasChildren() {
            return this.menuData.filter(item => item.children)
        },
        nowtoken() {
            return Cookie.get('token')
        }
    }
};
</script>
<style lang="less" scoped>
.el-tabs__nav-wrap {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
}

.el-tab-pane {
    padding-top: 0px;
    height: calc(100vh - 80px);
}
</style>