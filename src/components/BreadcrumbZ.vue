<template>
    <div class="sticky">
        <el-card class="box-card" shadow="always">
            <el-row :gutter="20">
                <!-- 第一列 图片Logo -->
                <el-col :span="1" style="height : 15px; margin-top : -14px">
                    <div>
                        <el-image style="width: 50px; height: 50px" :src="require('@/assets/logo.png')"></el-image>
                    </div>
                </el-col>
                <!-- 第二列 系统名称 + 面包屑 -->
                <el-col :span="21" style="height : 15px">
                    <div>
                        <el-descriptions title="通用业务管理系统" style="height : 15px;margin-top : -15px;" :colon=false>
                            <el-descriptions-item>
                                <el-breadcrumb style="margin-top : -10px;" separator="/">
                                    <el-breadcrumb-item v-for="item in tablist" :key="item.path"
                                        :to="{ path: item.path }">
                                        {{ item.label }}
                                    </el-breadcrumb-item>
                                </el-breadcrumb>
                                <!-- <el-tag v-for="tag in this.breadList" @click="changeMenu(tag)" :key="tag.name"
                                    :closable="tag.name !== '概览'" effect="dark">
                                    {{ tag.name }}
                                </el-tag> -->
                            </el-descriptions-item>
                        </el-descriptions>
                    </div>
                </el-col>
                <!-- 人物头像 点击后跳转到修改个人信息界面 -->
                <el-col :span="1" style="height : 15px">
                    <div shadow="always">
                        <el-avatar :size="50" style="margin-top:-18px"
                            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                            @click.native="usermsg">
                        </el-avatar>

                    </div>
                </el-col>
                <!-- ... 更多操作  点击后弹出下拉菜单 -->
                <el-col :span="1" style="height : 15px">
                    <div>

                        <el-dropdown trigger="click" :divided=true>
                            <el-button type="info" icon="el-icon-more" size="mini" circle
                                style="margin-top:-10px"></el-button>
                            <el-dropdown-menu slot="dropdown" :divided=true>
                                <el-dropdown-item style="height : 55px">Sign in as<P style="margin-top : -10px">{{$store.state.xzwxzw.userInfo.name}}</P>
                                </el-dropdown-item>

                                <el-dropdown-item :divided=true @click.native="usermsg">Your profile</el-dropdown-item>
                                <el-dropdown-item>Your repositories</el-dropdown-item>
                                <el-dropdown-item>Your projects</el-dropdown-item>
                                <el-dropdown-item :divided=true>Settings</el-dropdown-item>
                                <el-dropdown-item>About us</el-dropdown-item>
                                <el-dropdown-item>Help</el-dropdown-item>
                                <el-dropdown-item @click.native="logout" :divided=true>Sign out</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>

                    </div>
                </el-col>
            </el-row>


        </el-card>


    </div>
</template>

<script>
import { mapState } from 'vuex'
import {store} from '@/store/index'
export default {
    store,
    name: "BreadcrumbNav",
    data: function () {
        return {
            breadList: [
                { name: '概览', type: '' },
                { name: '文档管理', type: 'success' },
                { name: '项目创建', type: 'info' },
            ]

        };
    },
    mounted: function () {
        this.getBreadList(this.$route);
    },
    computed: {
        // ...mapState({
        //     tags: state => state.xzwxzw.xzwxzwlist
        // })
        tablist() {
            return this.$store.state.xzwxzw.tablist
        }

    },
    watch: {
        $route(val) {
            this.getBreadList(val);
        },
    },
    methods: {
        changeMenu() {
            this.$router.push({ name: item.name })
        },
        clickMenu(item) {
            if(this.$route.path !== item.path && !(this.$route.path === '\home' && (item.path === '/') ))
            {
                this.$router.push(item.path)
            }
            this.$store.commit('selectMenu', item)
        },
        usermsg() {
            // this.$message({
            //     type: 'success',
            //     message: "成功"
            // })
            this.$router.push("/userInfo")
        },
        logout() {
            this.$router.push("/login")
            localStorage.setItem("token", "")
            logout().then(res => {

            })

        },
        getBreadList(val) {
            if (val.matched) {
                let matched = val.matched.filter(
                    (item) => item.meta && item.meta.title
                );
                this.breadList = matched;
            }
        },
        getPath(path) {
            if (path === "") {
                return "/";
            }
            return this.digestParams(path, this.$route.params);
        },
        digestParams(breadcrumbName, params) {
            if (!breadcrumbName) {
                return null;
            }
            var paramsKeys = Object.keys(params).join("|");
            return breadcrumbName.replace(
                new RegExp(":(".concat(paramsKeys, ")"), "g"),
                function (replacement, key) {
                    return params[key] || replacement;
                }
            );
        },
    },
};
</script>