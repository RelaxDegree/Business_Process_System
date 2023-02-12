<template>
    <div>
        <el-row>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>项目1</span>
                        <el-button style="float: right; padding: 3px 0" type="text">打开</el-button>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        {{ '列表内容 ' + o }}
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>项目2</span>
                        <el-button style="float: right; padding: 3px 0" type="text">打开</el-button>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        {{ '列表内容 ' + o }}
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <div calss="right">
                    <el-card>
                        <i class="icon"></i>
                    </el-card>
                </div>
            </el-col>
        </el-row>
        <!-- backTop -->
        <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
    </div>

</template>
<script>
import { getData } from '../api'; 
export default {
    data() {
        return {}
    },
    mounted() {
        getData().then((data) => {
            console.log(data)
        })
    }
}
</script>