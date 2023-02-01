<template>
    <el-menu-item>

        <el-menu-item :index="indexName" @click="openForm">
            任务{{taskNum+1}}
        </el-menu-item>
<!-- 点击打开任务信息表单 -->
        <el-dialog title="任务详细信息" :visible.sync="dialogFormVisible">
            <el-form :model="taskdata">
                <el-form-item label="任务名称" :label-width="formLabelWidth">
                    <el-col :span="11">
                        <el-input v-model="taskdata.taskName" style="width : 400px"></el-input>
                    </el-col>
                </el-form-item>
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
    props:['taskNum','thisTask','stageNum'],
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
                return this.stageNum + '-' + this.taskNum
            }
        }
    },  
    methods : {
        // 初始化函数 从父Stage中获取任务信息
        init(){
            this.taskdata = this.thisTask;
            // console.log(this.taskdata);
            // 从当前任务中把所有人提取出来
            for (var i in this.taskdata.taskCompileusers)
            {
                // console.log(i);
                this.users.push(i)
            }
            for (var i in this.taskdata.taskReviewusers)
            {
                this.users.push(i)
            }
            for (var i in this.taskdata.taskSignusers)
            {
                this.users.push(i)

            }
            // console.log(this.taskdata.taskCompileusers);
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
            this.taskdata.Compileusers = []
            this.taskdata.Reviewusers = []
            this.taskdata.Signusers = []
            for (var i  = 0 ; i < this.users.length ; i ++)
            {
                var str = this.users[i];
                if (str.choice == "编辑")
                {
                    // console.log(str.userId)
                    this.taskdata.Compileusers.push(str.userId)
                }
                else if (str.choice == "审批")
                {
                    this.taskdata.Reviewusers.push(str.userId)
                    
                }
                else if (str.choice == "会签")
                {
                    this.taskdata.Signusers.push(str.userId)
                    
                }
            }
            this.$store.commit("UPDATETASK", this.taskdata);
            this.closeForm();
        },
        // 修改任务表单中进行人员添加  点击+触发
        openUserForm(){
            // this.innerVisible = true;

        },
    },
}
</script>

<style>
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