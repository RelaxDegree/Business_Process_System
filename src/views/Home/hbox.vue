<template>
    <el-descriptions  :column="3" border>
        <el-descriptions-item label="项目名" label-class-name="my-label"
            content-class-name="my-content">kooriookami</el-descriptions-item>
        <el-descriptions-item label="项目负责人ID">18100000000</el-descriptions-item>
        <el-descriptions-item label="是否完成">
            <el-tag size="small">是</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="项目细节" :contentStyle="{ 'text-align': 'right' }">江苏省苏州市吴中区吴中大道 1188
            号</el-descriptions-item>
    </el-descriptions>
</template>
<style>
.my-label {
    background: #E1F3D8;
}

.my-content {
    background: #FDE2E2;
}
</style>