<template>

        <!-- 默认打开的阶段栏 -->
    <el-container style="height: 535px;">
      <el-header>
        <p>项目配置</p>
      </el-header>

      <el-main>
        <el-menu @open="handleOpen"> 
          <el-submenu index="abcd" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
            <template slot="title"><i class="el-icon-menu"></i>项目基本信息</template>
            <div style="margin: 20px 0;">
              <el-form label-width="70px"  :model="projectMessage">
                <el-form-item label="项目名称">
                  <el-input v-model="projectMessage.projectName"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                  <el-input v-model="projectMessage.projectDesigner"></el-input>
                </el-form-item>
                
                <div class="block">
                  <el-date-picker
                    v-model="projectMessage.projectTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="发布日期"
                    end-placeholder="结束日期"
                    align="right">
                  </el-date-picker>
                </div>
                <div><p></p></div>
                <el-form-item label="项目描述">
                  <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="projectMessage.projectDetail">
                </el-input>
                </el-form-item>
                
              </el-form>
            </div>
          </el-submenu>
            <!-- s 是阶段对象  index是顺序索引值 -->
          <project-stage
                  v-for="(s,index) of this.$store.state.stage"
                  :key="(index+1).toString()"
                  :stageNum="(index+1).toString()"
                  :thisStage="s"
          ></project-stage>
        </el-menu>
      </el-main>
<!-- 点击左下角头像 查看项目组人员 -->
      <el-dialog
        width="40%"
        title="查看项目组人员"
        :visible.sync="formvisible"
        append-to-body>
        <el-table
            :data="this.$store.state.user"
            style="width: 100%">
            <!-- 头像列 -->
            <el-table-column
            label="头像"
            width="90">
              <template slot-scope="scope">
                    <div>
                        <el-avatar :size="40" shape="circle" :src="scope.row.headPic"></el-avatar>
                        <!-- <p>{{ scope.row.name }}</p> -->
                    </div>
                          <!-- <div slot="reference" class="name-wrapper">
                              <el-tag size="medium">{{ scope.row.name }}</el-tag>
                          </div> -->
                      
                  
                  <!-- <p>姓名: {{ scope.row.name }}</p> -->
              </template>
            </el-table-column>
            <!-- 姓名列 -->
            <el-table-column
            label="姓名"
            width="180">
              <template slot-scope="scope">
                    <div>
                      <el-tag>{{ scope.row.name }}</el-tag>
                    </div>

              </template>
            </el-table-column>
            <!-- 个人简介列 -->
            <el-table-column
            label="个人简介"
            width="280">
              <template slot-scope="scope">
                    <div>
                        <p>{{ scope.row.otherInfo }}</p>
                    </div>

              </template>
            </el-table-column>
        </el-table>
      </el-dialog>
<!-- 设置组件的页脚 有圆形头像 点击查看人员、+按钮 创建项目 保存项目、发布项目按钮 -->
      <el-footer>
        <p height="10px"></p>
        <el-row>
          <el-col :span="2" :offset="0">
            <div>
              <!-- <el-avatar icon="el-icon-user-solid" ></el-avatar> -->
              <el-button type="info" icon="el-icon-user-solid" circle @click="openUserForm"></el-button>
            </div>
          </el-col>
          <el-col :span="16" :offset="6">
            <div>

              <el-button type="success" @click="push">发布项目</el-button>
            </div>
          </el-col>
        </el-row>
          
      </el-footer>

    </el-container>
  
  
</template>

<script>
import ProjectStage from '../ProjectCreate/ProjectStage.vue';
import { procreateRelease } from '@/api/api';
import {store} from '../../store/index';
export default {
    store,
    name : "proj-set",
    props : ['projectMessage'],
    data(){
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        formvisible : false,
        stage:[],
        task:[],
        // 项目信息
        // projectMessage: {
        //   projectID: "56",
        //   projectDesignerName: '朱晓东',
        //   projectName: "吉林大学业务流程系统软件项目",
        //   projectDesignerID: 450000197704085570,
        //   projectCreateTime: "1977-01-14 13:19:52",
        //   projectEmitTime: "2022-11-21 21:00:45",
        //   projectDetail:'2020级软件工程课程大作业',
        //   projectSaveTime: "2022-11-21 21:00:45",
        //   projectIsdone: false,
        // },
        // 新建项目的项目信息表单
        form :{
          time: '',
          name: '',
          detail: '',
        },
      }
    },
    components : {ProjectStage},
    methods : {
      // 点击头像 查看项目组用户
        openUserForm(){
          this.formvisible = true;
        },
        /*阶段表收集并传入Create*/
        getFormInfo(){
            const oneStage = {  stageName:this.form.name,
                                stageDetail:this.form.detail,
                                stageIsdone:false,
                                stageTime:this.form.time, // 时间是数组 包含起止时间 格式
                                // Sun Jan 01 2023 00:00:00 GMT+0800 (中国标准时间)
                              }
            // this.stage.push(oneStage)
            this.$store.commit('ADDSTAGE',oneStage);
            // console.log(this.form.time)
            this.closeForm()
        },
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
        /*接受阶段表的数据*/ 
        addStage(value){
          this.$stage.commit('ADDSTAGE',value)
        },
        // 当打开一个项目submenu时 右边的拓扑图做相应的切换
        handleOpen(key, keyPath) {
            this.$store.commit('SETNOWSTAGE', key)
        },
        // 发布项目信息 还未完成
        push(){
            this.$message({
            type: 'success',
            message: '项目发布成功!'
          });
        },
    }

}
</script>

<style>

</style>