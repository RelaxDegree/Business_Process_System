<template>
    <el-submenu :index=stageNum style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <template slot="title">
            <!--<el-button @click="delStage" type="danger" class="el-icon-delete" style="height: 28px; width:28px" circle></el-button>-->
            <i class="el-icon-message"></i>阶段{{stageNum}}
        </template>
        <el-menu-item-group>
            <!-- 查看阶段信息 -->
            <el-menu-item
                    @click="stageDialogFormVisible = true"
                    index="-2">
                阶段信息
            </el-menu-item>
            <!-- 点击查看阶段后显示阶段信息 -->
                <el-dialog title="阶段信息" :visible.sync="stageDialogFormVisible">
                <el-form :model="thisStage">
                    <el-form-item label="阶段名称" :label-width="formLabelWidth">
                        <el-col :span="11">
                            <el-input v-model="thisStage.stageName" style="width : 400px"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="阶段起止时间" :label-width="formLabelWidth">
                        <el-col :span="11">
                        <div class="block" style="width : 100%">
                            <el-date-picker
                              v-model="thisStage.stageTime"
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
                          v-model="thisStage.stageDetail">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.stop="stageDialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click.stop="updateStage">确 定</el-button>
                </div>
                </el-dialog>
            <el-menu-item
                    @click="openForm"
                    index="-1"
                    style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                新建任务
            </el-menu-item>

<!-- 点击后 填写任务详细信息 -->
            <el-dialog title="任务详细信息" :visible.sync="dialogFormVisible">
                <!-- 二级对话框 添加项目组人员-->
                <el-dialog
                    width="40%"
                    title="添加项目组人员"
                    :visible.sync="innerVisible"
                    append-to-body>
                    <el-table
                        :data="users"
                        style="width: 100%">

                        <el-table-column
                        label="姓名"
                        width="180">
                        
                        <template slot-scope="scope">
                                <!-- <el-col>
                                    <div>
                                        <el-avatar :size="40" :src="scope.row.headPic"></el-avatar>
                                        <p>{{ scope.row.name }}</p>
                                    </div>
                                </el-col> -->
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                    </div>
                                
                            
                            <!-- <p>姓名: {{ scope.row.name }}</p> -->
                            
  
                        </template>
                        </el-table-column>
                        <el-table-column label="操作">
                        <template slot-scope="scope">
                            <div>
                                <el-radio-group v-model="scope.row.choice">
                                  <el-radio-button label="NULL"></el-radio-button>
                                  <el-radio-button label="编辑"></el-radio-button>
                                  <el-radio-button label="审批"></el-radio-button>
                                  <el-radio-button label="会签"></el-radio-button>
                                </el-radio-group>
                              </div>
                        </template>
                        </el-table-column>
                    </el-table>
                </el-dialog>
                <el-form :model="form">
                    <el-form-item label="任务名称" :label-width="formLabelWidth">
                        <el-col >
                            <el-input v-model="form.name" style="width : 400px"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="任务起止时间" :label-width="formLabelWidth">
                        <el-col >
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
                    <el-form-item label="参与编写人员" :label-width="formLabelWidth">
                        <el-col >
                            <el-tag
                            :key="tag"
                            v-for="tag in form.Compileusers"
                            closable
                            :disable-transitions="false"
                            @close="closeCompileusers(tag)">
                            {{tag}}
                            </el-tag>
                            <el-button type="primary" style="margin-left : 10px" size="mini" @click="getUserList(0)">+</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="参与审阅人员" :label-width="formLabelWidth">
                        <el-col >
                            <el-tag
                            :key="tag"
                            v-for="tag in form.Reviewusers"
                            type="warning"
                            closable
                            :disable-transitions="false"
                            @close="closeReviewusers(tag)">
                            {{tag}}
                            </el-tag>
                            <el-button type="primary" style="margin-left : 10px" size="mini" @click='getUserList(1)'>+</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="参与会签人员" :label-width="formLabelWidth">
                        <el-col  >
                            <el-tag
                            :key="tag"
                            v-for="tag in form.Signusers"
                            type="success"
                            closable
                            :disable-transitions="false"
                            @close="closeSignusers(tag)">
                            {{tag}}
                            </el-tag>
                            <el-button type="primary" style="margin-left : 10px" size="mini" @click="getUserLis(2)">+</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="任务描述" :label-width="formLabelWidth">
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
                    <el-button type="primary" @click.stop="getFormInfo">确 定</el-button>
                </div>
            </el-dialog>

<!-- 子任务 -->
          <project-task
                  v-for="(t,index) of task"
                  :key="index"
                  :taskNum="index"
                  :stageNum="stageNum"
                  :thisTask=t
                  @deleteTask="deleteTask"
          ></project-task>

        </el-menu-item-group>
    </el-submenu>
      
</template>

<script>
import store from '../store/index';
import ProjectTask from './ProjectTask.vue';
export default {
    name : 'proj-stage',
    store ,
    components : {ProjectTask},
    props:['stageNum','thisStage'],
    data() {
      return {
        // 新建任务表单
        dialogFormVisible: false,
        // 阶段信息表单
        stageDialogFormVisible: false,

        innerVisible : false,
        formLabelWidth: '120px',
        taskMessage:{
              taskID:'',
              taskProgress:'',
        },
        task:[],
        form: {
          name: '',
          time: '',
          detail: '',
          Compileusers : [],
          Reviewusers : [],
          Signusers : [],
        },
        users : [],
        user : [],
      };
    },
    methods : {
        /*获取task表单数据*/
        getFormInfo(){
            const oneTask = {   taskDetail:this.form.detail,
                                taskTime:this.form.time,
                                taskFather:this.stageNum,
                                taskName:this.form.name,
                                taskCompileusers:this.form.Compileusers,
                                taskReviewusers:this.form.Reviewusers,
                                taskSignusers:this.form.Signusers,
                                stageNum:this.stageNum,
                                son : [],
                                x : 40,
                                y : 40,
            }
            this.task.push(oneTask);
            // 往全局总线上添加一个任务信息
            this.$store.commit('ADDTASK',oneTask);
            // console.log(this.$store.getters.getStage(this.stageNum));
            // this.$store.commit('GETSTAGE',"222");
            this.closeForm()
        },
        closeForm(){
            this.form = {name: '', time: '', detail: '',
                        Compileusers : [],
                        Reviewusers :[],
                        Signusers : [],}
            this.dialogFormVisible = false;
        },
        // type 0 是请求编写人员列表 1 是审批 2 是会签 
        getUserList(type){
            this.innerVisible = true;
            this.$axios.get('https://mock.apifox.cn/m2/1954906-0-default/51521746', {
            params: {
                ID: 12345
            }
            }).then((response)=> {

                // this.users = JSON.parse(JSON.stringify(response.data.data.user))
                for (var i of response.data.data.user)
                {
                    i.choice = "NULL"
                    this.users.push(i)
                    // console.log(i)
                }

            }).catch(function (error) {
            console.log(error);
            });
            


        },

        openForm(){
            if (!this.dialogFormVisible)
                this.dialogFormVisible = true;
        },
        /*删除一个任务*/
        deleteTask(value){
            this.task = this.task.filter((p)=>{
                return p !== value
            })
        },
        /*触发deleteStage事件*/
        delStage(){
            this.$emit('deleteStage',this.thisStage)
        },


        closeCompileusers(tag) {
            this.form.Compileusers.splice(this.form.Compileusers.indexOf(tag), 1);

        },
        closeReviewusers(tag) {
        this.form.Reviewusers.splice(this.form.Reviewusers.indexOf(tag), 1);
        },
        closeSignusers(tag) {
        this.form.Signusers.splice(this.form.Signusers.indexOf(tag), 1);
        },
        // 在全局总线上修改阶段信息
        updateStage(){
            this.$store.commit("UPDATESTAGE",this.thisStage, this.stageNum);
            this.stageDialogFormVisible = false;
        }
    },
}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
</style>