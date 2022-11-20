<template>
  <div class="hello">
    
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


<style>
  .el-header {
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  import ProjectGraph from './ProjectGraph.vue'
  import ProjectSetting from './ProjectSetting.vue'
  export default {
    name : 'proj-create',
    components : {
      ProjectSetting,
      ProjectGraph
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
    }
</script>