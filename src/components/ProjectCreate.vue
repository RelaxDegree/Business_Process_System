<template>
  <div class="hello">
    
    <el-container style="height: 550px; border: 1px solid #eee">
      <el-aside width="450px" style="background-color: rgb(238, 241, 246)">
          <!-- 左侧任务部署 -->
        <project-setting @addStage="addStage"></project-setting>
      </el-aside>
      <!-- 右侧可视化任务图 -->
      <project-graph></project-graph>
  </el-container>

  </div>
</template>

<script>
  import ProjectGraph from './ProjectGraph.vue'
  import ProjectSetting from './ProjectSetting.vue'

import {store} from '../store/index';

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
      /*接受阶段表的数据*/ // 此函数貌似没有用到
      addStage(value){
        this.$stage.commit('ADDSTAGE',value)
      },
      /*handleClick(tab, event) {
        console.log(tab, event);
      }*/
      setUser()
      {
        let users = []
        // console.log("初始化用户列表")
        this.$axios.get('https://mock.apifox.cn/m2/1954906-0-default/51521746', {
            params: {
                ID: 12345
            }
            }).then((response)=> {

                // this.users = JSON.parse(JSON.stringify(response.data.data.user))
                for (var i of response.data.data.user)
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

