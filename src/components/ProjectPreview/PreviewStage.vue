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
                <el-form :model="this.thisStage">
                    <el-form-item label="阶段名称" :label-width="formLabelWidth">
                        <el-col :span="11">
                            <el-input v-model="thisStage.stageName" style="width : 400px" readonly></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="阶段开始时间" :label-width="formLabelWidth">
                        <el-col :span="11">
                          <el-input v-model="thisStage.stageOpenTime" style="width : 400px" readonly></el-input>
                    </el-col>
                    </el-form-item>
                  <el-form-item label="阶段结束时间" :label-width="formLabelWidth">
                    <el-col :span="11">
                      <el-input v-model="thisStage.stageCloseTime" style="width : 400px" readonly></el-input>
                    </el-col>
                  </el-form-item>
                    <el-form-item label="阶段描述" :label-width="formLabelWidth">
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          v-model="thisStage.stageDetail"
                          readonly>
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.stop="stageDialogFormVisible = false">关 闭</el-button>
<!--                    <el-button type="primary" @click.stop="updateStage">确 定</el-button>-->
                </div> 
                </el-dialog>

<!-- 点击后 填写任务详细信息 内含二级表单 进行人员选择  -->
<!--            <el-dialog title="任务详细信息" :visible.sync="dialogFormVisible">
                &lt;!&ndash; 二级对话框 添加项目组人员&ndash;&gt;
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
            </el-dialog>-->

<!-- 子任务 -->
          <preview-task
                  v-for="(onetask,index) of task"
                  v-if="thisStage.stageId === onetask.stageId"
                  :key="index"
                  :taskNum="index"
                  :stageId="stageId"
                  :thisTask=onetask
          ></preview-task>
        </el-menu-item-group>
    </el-submenu>
      
</template>

<script>
import {store} from '../../store/index';
import PreviewTask from './PreviewTask.vue';

export default {
    name : 'proj-stage',
    store ,
    components : {PreviewTask},
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
      this.task = this.$store.state.proCreate.proPreview.task;
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
        // // 打开新建任务
        // openNewTaskForm(){
        //     this.users = this.$store.state.proCreate.user;
        //     for (var i of this.users)
        //         {
        //             i.choice = "NULL"
        //             // console.log(i)
        //         }
        //     // console.log(this.users)
        //     if (!this.dialogFormVisible)
        //         this.dialogFormVisible = true;
        // },


    },
}
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
</style>