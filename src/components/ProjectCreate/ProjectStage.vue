<template>
    <el-submenu :index=stageId style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <template slot="title">
            <i class="el-icon-message"></i>阶段{{stageId}}
        </template>
        <el-menu-item-group>
            <!-- 查看阶段信息 -->
            <el-menu-item
                    @click="stageDialogFormVisible = true"
                    index="-2">
                阶段信息
            </el-menu-item>
            <!-- 点击查看阶段后显示阶段信息 并可以编辑-->
                <el-dialog title="阶段信息" :visible.sync="stageDialogFormVisible" width="40%">
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
            <!-- 点击进行新建任务 -->
            <el-menu-item
                    @click="openNewTaskForm"
                    index="-1"
                    style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                新建任务
            </el-menu-item>

<!-- 点击后 填写任务详细信息 内含二级表单 进行人员选择  -->
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
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.name }}</el-tag>
                            </div>
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
                    <!-- <el-form-item label="任务名称" :label-width="formLabelWidth">
                        <el-col >
                            <el-input v-model="form.name" style="width : 400px"></el-input>
                        </el-col>
                    </el-form-item> -->
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
                    <el-form-item label="参与任务人员" :label-width="formLabelWidth">
                        <el-col >
                            <el-tag v-for="(params,index) in tagUser" :key="index" :type="params.type" >{{params.name}}</el-tag>
                            <el-button type="primary"  size="mini" @click="openUserForm">+</el-button>
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
                    <el-button type="primary" @click.stop="addTask">确 定</el-button>
                </div>
            </el-dialog>

<!-- 子任务 -->
          <project-task
                  v-for="(onetask,index) of task"
                  :key="index"
                  :taskNum="index"
                  :stageId="stageId"
                  :thisTask=onetask
          ></project-task>
        </el-menu-item-group>
    </el-submenu>
      
</template>

<script>
import {store} from '../../store/index';
import ProjectTask from './ProjectTask.vue';
import { timestampToTime } from '../../utils/time.js'
export default {
    name : 'proj-stage',
    store ,
    components : {ProjectTask},
    props:['stageId','thisStage'],
    data() {
      return {
        // 新建任务表单
        dialogFormVisible: false,
        // 阶段信息表单
        stageDialogFormVisible: false,
        taskNum : 0,
        innerVisible : false,
        formLabelWidth: '120px',
        task:[],
        form: {
          name: '',
          time: '',
          detail: '',
          follower : []
        },
        users : [],
      };
    },
    mounted(){
    },
    computed:{
        tagUser(){
            var tempList = []
            for (var i = 0; i <  this.users.length ; i ++)
            {
                var user = this.users[i];
                if (user.choice == "编辑")
                {
                    tempList.push({
                        name : user.name,
                        type : "success"
                    })
                }
                else if (user.choice == "审批")
                {
                    tempList.push({
                        name : user.name,
                    })
                }
                else if (user.choice == "会签")
                {
                    tempList.push({
                        name : user.name,
                        type : "warning"
                    })
                }
            }
            // console.log("计算属性", tempList);
            return tempList;
        }
    },  
    methods : {
        /*获取task表单数据 同时传递所有的人员*/ 
        addTask(){
            if (!this.form.time)
            {
                this.$message({
                type : 'warning',
                message : "请填写日期"
                })
                return;
            }
            this.form.follower = []
            var cnta = 0, cntb = 0, cntc = 0;   // 统计三个人员的数量
            for (var i  = 0 ; i < this.users.length ; i ++)
            {
                var str = this.users[i];

                if (str.choice == "编辑")
                {
                    // console.log(str.userId)
                    this.form.follower.push({
                        userId : str.userId,
                        state : '1',
                    })
                    cnta ++;
                }
                else if (str.choice == "审批")
                {
                    this.form.follower.push({
                        userId : str.userId,
                        state : '2',
                    })
                    cntb++;
                    
                }
                else if (str.choice == "会签")
                {
                    this.form.follower.push({
                        userId : str.userId,
                        state : '3',
                    })
                    cntc++;
                }
            }
            if (!(cnta == 1 && cntb == 1 && (cntc >= 1 && cntc <= 2)))
            {
                this.$message({
                type : 'warning',
                message : "请重新配置人员，核查人员数量"
                })
                return;
            }
            const oneTask = {   taskDetail:this.form.detail,
                                taskTime : this.form.time,
                                taskOpenTime:timestampToTime(this.form.time[0].toLocaleString('en-US',{hour12 : false}).split(" ")), // 时间是数组 包含起止时间 格式
                                taskCloseTime:timestampToTime(this.form.time[1].toLocaleString('en-US',{hour12 : false}).split(" ")), // 时间是数组 包含起止时间 格式
                                // Sun Jan 01 2023 00:00:00 GMT+0800 (中国标准时间)
                                taskName:this.form.name,
                                taskProgress : 0,
                                follower:this.form.follower,
                                stageId:this.stageId,
                                taskNum : this.taskNum,
                                son : [],
                                px : 40,
                                py : 40,
            }
            this.taskNum += 1;
            this.task.push(oneTask);
            // console.log(oneTask)
            // console.log(oneTask)
            // 往全局总线上添加一个任务信息
            this.$store.commit('proCreate/ADDTASK',oneTask);
            this.closeForm()
        },
        // 关闭表单
        closeForm(){
            this.form = {name: '', time: '', detail: '',
                        follower : [],}
            this.dialogFormVisible = false;
        },
        // 新建任务表单中进行人员添加  点击+触发
        openUserForm(){
            this.innerVisible = true;

        },
        // 打开新建任务
        openNewTaskForm(){
            this.users = this.$store.state.proCreate.user;
            for (var i of this.users)
                {
                    i.choice = "NULL"
                    // console.log(i)
                }
            // console.log(this.users)
            if (!this.dialogFormVisible)
                this.dialogFormVisible = true;
            
        },
        /*删除一个任务*/
        deleteTask(value){
            this.task = this.task.filter((p)=>{
                return p !== value
            })
        },
        // 在全局总线上修改阶段信息
        updateStage(){
            if (!this.thisStage.stageTime)
            {
                this.$message({
                type : 'warning',
                message : "请填写日期"
                })
                return;
            }
            this.thisStage.stageOpenTime = timestampToTime(this.thisStage.stageTime[0].toLocaleString('en-US',{hour12 : false}).split(" ")), // 时间是数组 包含起止时间 格式
            this.thisStage.stageCloseTime= timestampToTime(this.thisStage.stageTime[1].toLocaleString('en-US',{hour12 : false}).split(" ")), // 时间是数组 包含起止时间 格式
            this.$store.commit("proCreate/UPDATESTAGE",this.thisStage, this.stageId);
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