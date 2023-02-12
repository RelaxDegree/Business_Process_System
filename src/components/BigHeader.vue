<template>
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item @click="clickMenu()" index="1">概览</el-menu-item>
            <el-submenu index="2">
                <template slot="title">任务管理</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3">人员管理</el-menu-item>
            <el-menu-item index="4">文档管理</el-menu-item>
        </el-menu>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            menuData: [

            ]
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        clickMenu() {
            this.$router.push("/Login")
        }
    },
    computed: {
        //没有子菜单
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        //有子菜单
        hasChildren() {
            return this.menuData.filter(item => item.children)
        }
    }
}
</script>