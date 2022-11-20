<template>

        <!-- 默认打开的阶段栏 -->
    <el-container style="height: 535px;">
      <el-header>
        <p>项目配置</p>
      </el-header>

      <el-main>
        <el-menu> 
          <el-submenu index="0" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
            <template slot="title"><i class="el-icon-menu"></i>项目基本信息</template>
            <div style="margin: 20px 0;">
              <el-form :label-position="left" label-width="70px"  :model="projectMessage">
                <el-form-item label="项目名称">
                  <el-input v-model="projectMessage.name"></el-input>
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
          <project-stage></project-stage>
          
          
        </el-menu>
      </el-main>
      <el-footer>
        <p height="10px"></p>
        <el-row>
          <el-col :span="2" :offset="0">
            <div>
              <el-avatar icon="el-icon-user-solid" ></el-avatar>
            </div>
          </el-col>
          <el-col :span="16" :offset="6">
            <div>
              <el-button plain @click="openForm">+</el-button>
              <el-dialog title="阶段创建" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="阶段名称" :label-width="formLabelWidth">
                        <el-col :span="11">
                            <el-input v-model="form.name" style="width : 400px"></el-input>
                        </el-col>
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
                              align="right">
                            </el-date-picker>
                        </div>
                    </el-col>
                    </el-form-item>
                    <el-form-item label="阶段描述" :label-width="formLabelWidth">
                        <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="form.detail">
                    </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.stop="closeForm">取 消</el-button>
                    <el-button type="primary" @click.stop="closeForm">确 定</el-button>
                </div>
            </el-dialog>
              <el-button type="primary" @click="save">保存项目</el-button>
              <el-button type="success" @click="push">发布项目</el-button>
            </div>
          </el-col>
        </el-row>
          
      </el-footer>

    </el-container>
  
  
</template>

<script>
import ProjectStage from './ProjectStage.vue';
export default {
    name : "proj-set",
    data(){
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        projectMessage: {
          name: '吉林大学业务流程系统软件项目',
          projectDesigner: '朱晓东',
          projectCreateTime: '2022-10-29',
          projectTime : '',
          projectDetail : '2020级软件工程课程大作业',
          projectIsdone : '0'
        },
        form :{
          time: '',
          name: '',
          detail: '',

        },
      }
    },
    components : {
        ProjectStage
    },
    methods : {
        save(){
            this.$message({
            type: 'success',
            message: '项目保存成功!'
          });
        },
        push(){
            this.$message({
            type: 'success',
            message: '项目发布成功!'
          });
        },
        openForm(){
            if (!this.dialogFormVisible)
                this.dialogFormVisible = true; 
            // if (this.dialogFormVisible)
            // {
            //     this.dialogFormVisible = false;
            // } 
        },
        closeForm(){
            this.dialogFormVisible = false;
        },
    }

}
</script>

<style>

</style>