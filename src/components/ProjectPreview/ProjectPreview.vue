<template>
  <div>

    <el-container style="height: 550px; border: 1px solid #eee">
      <el-aside width="450px" style="background-color: rgb(238, 241, 246)">
        <!-- 左侧任务部署 -->
        <ProjectSetting></ProjectSetting>
      </el-aside>
      <!-- 右侧可视化任务图 -->
      <PreviewGraph></PreviewGraph>
    </el-container>

    <footer>
      <DFooter></DFooter>
    </footer>

  </div>
</template>
  
<script>
import PreviewGraph from './PreviewGraph.vue'
import ProjectSetting from './PreviewSetting.vue'
import { store } from '../../store/index';
import DFooter from './footer'
export default {
  store: store,
  name: 'proj-preview',
  components: {
    DFooter,
    ProjectSetting,
    PreviewGraph
  },
  data() {
    return {
      project: {},
      stage: [],
      task: [],
    }
  },
  methods: {
  },

}
</script>
  
  
<style scoped>
.el-header {
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
  
