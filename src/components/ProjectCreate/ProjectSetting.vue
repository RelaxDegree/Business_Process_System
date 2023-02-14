<template>

        <!-- 默认打开的阶段栏 -->
    <el-container style="height: 580px;">
      <el-header>
        <div style="margin-top : 10px"><i class="el-icon-setting"></i>项目配置</div>
      </el-header>

      <el-main>
        <el-menu @open="handleOpen"> 
          <el-submenu index="default" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
            <template slot="title"><i class="el-icon-menu"></i>项目基本信息</template>
            <div style="margin: 20px 0;">
              <el-form label-width="70px"  :model="projectMessage">
                <el-form-item label="项目名称">
                  <el-input v-model="projectMessage.projectName"></el-input>
                </el-form-item>

                <div><p></p></div>
                <el-form-item label="项目描述">
                  <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  :width="70"
                  v-model="projectMessage.projectDetail">
                </el-input>
                </el-form-item>
                
              </el-form>
            </div>
          </el-submenu>
            <!-- s 是阶段对象  index是顺序索引值 -->
          <project-stage
                  v-for="(s,index) of this.$store.state.proCreate.stage"
                  :key="(index+1).toString()"
                  :stageId="(index+1).toString()"
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
            :data="this.$store.state.proCreate.user"
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
              <el-button plain @click="openForm" style="margin-right: 10px">创建阶段</el-button>
                <!-- 点击加号键  弹出新增阶段的表单 -->
              <el-dialog title="阶段创建" :visible.sync="dialogFormVisible"  width="40%">
                <el-form :model="form">
                    <el-form-item label="阶段名称" :label-width="formLabelWidth">
                            <el-input v-model="form.name" style="width : 100%" ></el-input>
                    </el-form-item>
                    <el-form-item label="阶段起止时间" :label-width="formLabelWidth">
                        <el-col :span="11">
                        <div class="block" style="width : 100%">
                            <el-date-picker
                              v-model="form.time"
                              type="datetimerange"
                              range-separator="至"
                              start-placeholder="发布日期"
                              end-placeholder="结束日期"
                              >
                            </el-date-picker>
                        </div>
                    </el-col>
                    </el-form-item>
                    <el-form-item label="阶段描述" :label-width="formLabelWidth">
                      <el-col :span="11">
                        <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        style="width : 170%"
                        placeholder="请输入内容"
                        v-model="form.detail">
                      </el-input>

                      </el-col>
                        
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.stop="closeForm">取 消</el-button>
                    <el-button type="primary" @click.stop="getFormInfo">确 定</el-button>
                </div>
              </el-dialog>
              <el-button type="primary" @click="save">发布项目</el-button>
            </div>
          </el-col>
        </el-row>
          
      </el-footer>

    </el-container>
  
  
</template>

<script>
import ProjectStage from './ProjectStage.vue';
import { procreateRelease } from '@/api/proCreateApi';
import { timestampToTime } from '../../utils/time.js'
import {store} from '../../store/index';
export default {
    store,
    name : "proj-set",
    data(){
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        formvisible : false,
        stage:[],
        task:[],
        // 项目信息
        projectMessage: {
          projectName: "吉林大学业务流程系统软件项目",
          projectDesignerId: 2,
          projectCreateTime: "1977-01-14 13:19:52",
          projectEmitTime: "2022-11-21 21:00:45",
          projectDetail:'2020级软件工程课程大作业',
          projectSaveTime: "2022-11-21 21:00:45",
          projectIsdone: false,
          isEmit : 0,
        },
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
          if (!this.form.time)
          {
            this.$message({
              type : 'warning',
              message : "请填写日期"
            })
            return;
          }
            const oneStage = {  stageName:this.form.name,
                                stageId : this.$store.state.proCreate.stage.length + 1,
                                stageDetail:this.form.detail,
                                stageIsdone:false,
                                stageOpenTime:timestampToTime(this.form.time[0].toLocaleString('en-US',{hour12 : false}).split(" ")), // 时间是数组 包含起止时间 格式
                                stageCloseTime:timestampToTime(this.form.time[1].toLocaleString('en-US',{hour12 : false}).split(" ")), // 时间是数组 包含起止时间 格式
                                stageTime : this.form.time,
                                // Sun Jan 01 2023 00:00:00 GMT+0800 (中国标准时间)
                              }
            // this.stage.push(oneStage)
            this.$store.commit('proCreate/ADDSTAGE',oneStage);
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
        // 当打开一个项目submenu时 右边的拓扑图做相应的切换
        handleOpen(key, keyPath) {
            this.$store.commit('proCreate/SETNOWSTAGE', key)
            // console.log(key)
        },
        // 发布项目信息 
        save(){
          // 提交项目信息
          // 首先更新projectMessage的时间信息
          var time = new Date();
          var timestr = timestampToTime(time.toLocaleString('en-US',{hour12 : false}).split(" "));
          this.projectMessage.projectCreateTime = timestr;
          this.projectMessage.projectSaveTime = timestr;
          this.projectMessage.projectEmitTime = timestr;
          this.$store.commit("proCreate/SETPROJECT", this.projectMessage);
          let that = this;
          var data = {
            project : this.$store.state.proCreate.projectMessage,
            stage : this.$store.state.proCreate.stage,
            task : this.$store.state.proCreate.task
          };

          console.log(JSON.stringify(data));
          procreateRelease(data).then(res => {
              console.log(JSON.stringify(res.data.code));
              if (res.data.code == 200)
              {
                that.$message({
                type: 'success',
                message: '项目保存成功!'
              });
              }
              else if (res.data.code == 401){
                that.$message({
                type: 'warning',
                message: '项目基本信息未填写!'
              });
              }
          })
          .catch(function (error) {
            console.log(error);
            that.$message.error(
               '项目保存失败!'
          );
          });
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