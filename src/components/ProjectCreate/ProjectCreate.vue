<template>
  <div>
    
    <el-container style="height: 550px; border: 1px solid #eee">
      <el-aside width="450px" style="background-color: rgb(238, 241, 246)">
          <!-- 左侧任务部署 -->
        <project-setting></project-setting>
      </el-aside>
      <!-- 右侧可视化任务图 -->
      <project-graph></project-graph>
  </el-container>

  </div>
</template>

<script>
  import ProjectGraph from './ProjectGraph.vue'
  import ProjectSetting from './ProjectSetting.vue'
  import { procreateSetUser } from '@/api/api';
  import {store} from '../../store/index';

  export default {
    store : store,
    name : 'proj-create',
    components : {
      ProjectSetting,
      ProjectGraph
    },
    data(){
      return{
        stage:[],
      }
    },
    mounted(){
      this.setUser();
    },
    methods: {
      // 从后端获取项目人员 mounted函数中启动
      setUser()
      {
        let users = []
        // console.log("初始化用户列表")
        let params = {
                ID: 12345
            }
        procreateSetUser(params).then(res=>{
          for (var i of res.data.data.user)
          {
              i.choice = "NULL"
              users.push(i)
              // console.log(i)
          }
          this.$store.commit('SETUSER',users);
          console.log(this.$store.state.user)

        }).catch(function (error) {
            console.log(error);
        });
      } 
    }
  }
</script>


<style>
  .el-header {
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

