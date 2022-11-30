<template>
    <el-submenu :index=stageNum style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <template slot="title">
            <!--<el-button @click="delStage" type="danger" class="el-icon-delete" style="height: 28px; width:28px" circle></el-button>-->
            <i class="el-icon-message"></i>阶段{{stageNum}}
        </template>
        <el-menu-item-group>
            <el-menu-item
                    @click="openForm"
                    index="-1"
                    style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                新建任务
            </el-menu-item>


            <el-dialog title="任务详细信息" :visible.sync="dialogFormVisible">
                <!-- 二级对话框 -->
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
                        width="260">
                        
                        <template slot-scope="scope">
                            <el-row>
                                <el-col>
                                    <div>
                                        <el-avatar :size="40" :src="scope.row.headPic"></el-avatar>
                                        <p>{{ scope.row.name }}</p>
                                    </div>
                                </el-col>
                                <el-col>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                    </div>
                                </el-col>
                                
                                
                            </el-row>
                            
                            <!-- <p>姓名: {{ scope.row.name }}</p> -->
                            
  
                        </template>
                        </el-table-column>
                        <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">审批</el-button>
                            <el-button
                            size="mini"
                            type="warning"
                            @click="handleDelete(scope.$index, scope.row)">会签</el-button>
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


          <project-task
                  v-for="(t,index) of task"
                  :key="index"
                  :taskNum="index"
                  :taskNum1="stageNum"
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
        dialogFormVisible: false,
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
            }
            this.task.push(oneTask);
            this.$store.commit('ADDTASK',oneTask);
            this.closeForm()
        },
        closeForm(){
            this.form = {name: '', time: '', detail: '',
                        Compileusers : ['小明','小红','只因','坤坤'],
                        Reviewusers : ['2233','7788'],
                        Signusers : ['boss','god'],}
            this.dialogFormVisible = false;
        },
        getUserList(type){
            this.innerVisible = true;
            this.$axios.get('http://127.0.0.1:4523/m1/1954906-0-default/checkuser', {
            params: {
                ID: 12345
            }
            }).then((response)=> {

                // this.users = JSON.parse(JSON.stringify(response.data.data.user))
                for (var i of response.data.data.user)
                {
                    this.users.push(i)
                    console.log(i)
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
    },
}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
</style>