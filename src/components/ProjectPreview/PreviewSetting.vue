<template>

  <!-- 默认打开的阶段栏 -->
  <el-container style="height: 580px;">
    <el-header>
      <div style="margin-top : 10px"><i class="el-icon-setting"></i>项目审阅</div>
    </el-header>
    <!-- 项目信息 -->
    <el-main>
      <el-menu @open="handleOpen">
        <el-submenu index="default" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
          <template slot="title"><i class="el-icon-menu"></i>项目基本信息</template>
          <div style="margin: 20px 0;">
            <el-form label-width="70px"  :model="this.project">
              <el-form-item label="项目名称">
                <el-input v-model="project.projectName" readonly></el-input>
              </el-form-item>
              <el-form-item label="负责人">
                <el-input v-model="project.projectDesignerId" readonly></el-input>
              </el-form-item>
              <div><p></p></div>
              <el-form-item label="项目描述">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    :width="70"
                    v-model="project.projectDetail"
                    readonly>
                </el-input>
              </el-form-item>

            </el-form>
          </div>
        </el-submenu>
        <!-- s 是阶段对象  index是顺序索引值 -->
        <preview-stage
            v-for="(s,index) of this.stage"
            :key="(index+1).toString()"
            :stageId="(index+1).toString()"
            :thisStage="s"
        ></preview-stage>
      </el-menu>
    </el-main>


    <el-footer>
      <p height="10px"></p>
      <el-row>
        <el-col :span="2" :offset="0">
        </el-col>
        <el-col :span="16" :offset="6">
        </el-col>
      </el-row>

    </el-footer>

  </el-container>


</template>

<script>
import PreviewStage from './PreviewStage.vue';

import {store} from '../../store/index';
import {propreviewGet} from "@/api/api";
export default {
  store,
  name : "proj-set",
  components : {PreviewStage},
  data(){
    return {
      project:{},
      stage:[],
      task:[],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      formvisible : false,

/*       项目信息
      projectMessage: {
        projectName: "吉林大学业务流程系统软件项目",
        projectDesignerId: 2,
        projectCreateTime: "1977-01-14 13:19:52",
        projectEmitTime: "2022-11-21 21:00:45",
        projectDetail:'2020级软件工程课程大作业',
        projectSaveTime: "2022-11-21 21:00:45",
        projectIsdone: false,
        isEmit : 0,
      },*/


    }
  },

  methods : {
    /*关闭dialog*/
    closeForm(){
      this.form ={time: '',name: '',detail:''}
      this.dialogFormVisible = false;
    },
    /*打开dialog*/
    openForm(){
      if (!this.dialogFormVisible)
        this.dialogFormVisible = true;
    },
    // 当打开一个项目submenu时 右边的拓扑图做相应的切换
    handleOpen(key, keyPath) {
      this.$store.commit('SETNOWSTAGE', key)
      // console.log(key)
    },
    // 从后端获取全部项目 用于阅览
    propreviewGet(){
      let params = {
        projectId: 1
      }
      propreviewGet(params).then(res=>{
        console.log("projectGet:")
        console.log(res.data)
        this.stage = res.data.data.stage;
        this.task = res.data.data.task;
        this.project = res.data.data.project;
        this.$store.commit("SETPROPREVIEW", {
          'stage' : this.stage,
          'task' : this.task,
          'project' : this.project,
        })
        console.log(this.$store.state.proPreview);
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted(){
    //取要审阅的项目的基本信息
    this.propreviewGet();
  }

}
</script>

<style scoped>

</style>