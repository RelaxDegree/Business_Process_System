<template>
    <el-card class="box-card" shadow="always" body-style="padding: '0px 0px 0px'">
    <el-descriptions :column="3" border class="box-table">
        <el-descriptions-item label="项目名" label-class-name="my-label"
            content-class-name="my-content">吉林大学业务流程系统软件项目1</el-descriptions-item>
        <el-descriptions-item label="项目负责人ID">2</el-descriptions-item>
        <el-descriptions-item label="是否完成">
            <el-tag size="small">否</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="操作">
                <el-button size="mini" type="success" round @click="handleDetail()">审阅</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="项目细节" :contentStyle="{ 'text-align': 'right' }">2020级软件工程课程大作业 1188
            号</el-descriptions-item>
    </el-descriptions>
    </el-card>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {

    },
    methods: {
        handleDetail() {
            this.$router.push("/preview")
        }
    }
}
</script>
<style scoped>
.my-label {
    background: #E1F3D8;
}

.my-content {
    background: #FDE2E2;
}
.box-card {
    background: rgb(255, 255, 255);
    padding: 0px 0px 0px;
    margin-bottom: 32px;
}

.box-table {
    padding: 0px 0px 0px;
}

.dashboard-editor-container .chart-wrapper[data-v-1d9b105c] {
    background: #fff;
    padding: 0px 0px 0;
    margin-bottom: 32px;
}
</style>