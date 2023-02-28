<template>
  <div>
    <!-- 项目名字从其他地方获取 -->
    <h3 class="title">项目{{$store.state.sja.taskId}}的文档如下</h3>

    <el-row>
      <el-col :span="3"><div class="hide">11111</div></el-col>
      <el-col :span="18">
        
      <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="文档名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="category"
        label="文档类别"
        width="140">
      </el-table-column>
      <el-table-column
        prop="taskId"
        label="所属任务id"
        width="120">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="280">
      </el-table-column>
      <el-table-column
        prop="editTime"
        label="最近编辑时间"
        width="280">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看文档</el-button>
        </template>
      </el-table-column>
      </el-table>

      </el-col>
      <el-col :span="3"><div></div></el-col>
    </el-row>



  </div>
</template>

<script>
import { getProjectAllDoc} from '@/api/api';
import {store} from '../store/sja';

export default {
  name: 'DocumentTable',
  store,
  data () {
    return {
      tableData:[]
    }
  },
  mounted(){
    this.getAllDoc();
  },
  methods: {
    
    handleClick(row) {
      console.log(row.taskId);
      this.$store.commit('getTaskId',row.taskId)

      // 路由跳转
      this.$router.push('/documentShow')

    },
    // 获取项目所有文档
    getAllDoc()
    {
      // 默认值，之后修改项目的id
      let params = {
        projectId : 1
      }
      getProjectAllDoc(params).then(res => {
        console.log(JSON.stringify(res.data))
        this.$store.commit("sja/getDocuments",res.data.data)
        this.tableData = res.data.data
      })
    },
  }
}
</script>

<style scoped>
.title {
  text-align: center;
}

.hide {
  visibility:hidden;
}

</style>
