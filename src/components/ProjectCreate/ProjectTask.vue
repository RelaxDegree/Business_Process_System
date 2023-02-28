<template>
    <el-menu-item>

        <el-menu-item :index="indexName" @click="openForm">
            任务{{taskNum+1}}
        </el-menu-item>
<!-- 点击打开任务信息表单 -->
        <el-dialog title="任务详细信息" :visible.sync="dialogFormVisible">
            <el-form :model="taskdata">
                <!-- <el-form-item label="任务名称" :label-width="formLabelWidth">
                    <el-col :span="11">
                        <el-input v-model="taskdata.taskName" style="width : 400px"></el-input>
                    </el-col>
                </el-form-item> -->
                <el-form-item label="任务起止时间" :label-width="formLabelWidth">
                    <el-col :span="11">
                    <div class="block" style="width : 100%">
                        <el-date-picker
                          v-model="taskdata.taskTime"
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
                    <el-col :offset="0">
                        <el-tag v-for="(params,index) in tagUser" :key="index" :type="params.type" >{{params.name}}</el-tag>
                         
                        <el-button type="primary" style="margin-left : 10px" size="mini" @click="openUserForm">+</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item label="任务描述" :label-width="formLabelWidth">
                    <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="taskdata.taskDetail">
                </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.stop="closeForm">取 消</el-button>
                <el-button type="primary" @click.stop="updateTask">确 定</el-button>
            </div>
        </el-dialog>
<!-- 二级对话框 添加项目组人员-->
                <el-dialog
                    width="40%"
                    title="修改项目组人员"
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
    </el-menu-item>
</template>

<script>
export default {
    name : 'proj-task',
    props:['taskNum','thisTask','stageId',],
    data() {
        return {
            formLabelWidth: '120px',
            innerVisible : false,
            dialogFormVisible: false,
            taskdata : {},
            users : [],
        }
    },
    mounted() {
        this.init();
    },
    computed : {
        // 计算属性  生成menuID
        indexName : {
            get(){
                return this.stageId + '-' + this.taskNum
            }
        },
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
        // 初始化函数 从父Stage中获取任务信息
        init(){
            this.taskdata = this.thisTask;
            // console.log(this.taskdata);
            this.users = this.$store.state.proCreate.user;
            for (var i = 0 ; i < this.taskdata.follower ; i ++)
            {
                var usid = this.taskdata.follower[i].userId
                var usst = this.taskdata.follower[i].state
                for (var j = 0 ; j < this.users.length ; i ++)
                {
                    var user = this.users[j]
                    if (user.userId === usid)
                    {
                        this.users[j].state = usst;
                    }
                }
            }
            // console.log(this.users)
        },
        openForm(){
            if (!this.dialogFormVisible)
                this.dialogFormVisible = true;
        },
        closeForm(){
            this.dialogFormVisible = false;
        },
        // 更新这个任务的信息
        updateTask(){
            if (!this.taskdata.taskTime)
            {
                this.$message({
                type : 'warning',
                message : "请填写日期"
                })
                return;
            }
            this.taskdata.follower = []
            for (var i  = 0 ; i < this.users.length ; i ++)
            {
                var str = this.users[i];
                if (str.choice == "编辑")
                {
                    // console.log(str.userId)
                    this.taskdata.follower.push({
                        userId : str.userId,
                        state : '1',
                    })
                }
                else if (str.choice == "审批")
                {
                    this.taskdata.follower.push({
                        userId : str.userId,
                        state : '2',
                    })
                    
                }
                else if (str.choice == "会签")
                {
                    this.taskdata.follower.push({
                        userId : str.userId,
                        state : '3',
                    })
                    
                }
            }
            this.$store.commit("proCreate/UPDATETASK", this.taskdata);
            this.closeForm();
        },
        // 修改任务表单中进行人员添加  点击+触发
        openUserForm(){
            this.innerVisible = true;

        },
    },
}
</script>

<style scoped>
    .el-icon-delete{
        padding: 5px !important;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
      }
  .button-new-tag {
    margin-left: 20px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

</style>