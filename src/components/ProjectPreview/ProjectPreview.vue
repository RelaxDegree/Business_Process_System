<template>
    <div>
      
      <el-container style="height: 550px; border: 1px solid #eee">
        <el-aside width="450px" style="background-color: rgb(238, 241, 246)">
            <!-- 左侧任务部署 -->
          <project-setting :projectMessage="this.project"></project-setting>
        </el-aside>
        <!-- 右侧可视化任务图 -->
        <project-graph></project-graph>
    </el-container>
  
    </div>
</template>
  
  <script>
    import ProjectGraph from './ProjectGraph.vue'
    import ProjectSetting from './ProjectSetting.vue'
    import { store } from '../../store/index';
    import { procreateSetUser } from '@/api/api';
    import { propreviewGet } from '@/api/api';
    export default {
      store : store,
      name : 'proj-preview',
      components : {
        ProjectSetting,
        ProjectGraph
      },
      data(){
        return{
          project : {},
          stage : [],
          task : [],

        }
      },
      mounted(){
        this.setUser();
        this.propreviewGet();
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
            // console.log(this.$store.state.user)
  
          }).catch(function (error) {
              console.log(error);
          });
        }, 
        // 从后端获取全部项目 用于阅览
        propreviewGet(){
            let params = {
                  ID: 12345
            }
            propreviewGet(params).then(res=>{
              this.stage = res.data.data.stage;
              this.task = res.data.data.task;
              this.project = res.data.data.project;
              this.$store.commit("SETPROPREVIEW",{
                'stage' : this.stage,
                'task' : this.task,
                'project' : this.project,
              })
            console.log(this.$store.state.propreview);
              
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
  
  