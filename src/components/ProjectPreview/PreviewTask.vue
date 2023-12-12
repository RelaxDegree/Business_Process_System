<template>
    <el-menu-item>

        <el-menu-item :index="indexName" @click="openForm">
            任务{{taskNum+1}}
        </el-menu-item>
<!-- 点击打开任务信息表单 -->
        <el-dialog title="任务详细信息" :visible.sync="dialogFormVisible">
            <el-form :model="thisTask">
              <el-form-item label="任务开始时间" :label-width="formLabelWidth">
                <el-col :span="11">
                  <el-input v-model="thisTask.taskOpenTime" style="width : 400px"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="任务结束时间" :label-width="formLabelWidth">
                <el-col :span="11">
                  <el-input v-model="thisTask.taskCloseTime" style="width : 400px"></el-input>
                </el-col>
              </el-form-item>
                <el-form-item label="参与任务人员id" :label-width="formLabelWidth">
                    <el-col :offset="0">
                        <el-tag v-for="(params,index) in tagUser" :key="index" :type="params.type" >{{params.name}}</el-tag>
                    </el-col>
                </el-form-item>
                <el-form-item label="任务描述" :label-width="formLabelWidth">
                    <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="thisTask.taskDetail">
                </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.stop="closeForm">关 闭</el-button>
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
import { store } from "@/store/index";
export default {
    store,
    name : 'proj-task',
    props:['taskNum','thisTask','stageId',],
    data() {
        return {
            formLabelWidth: '120px',
            innerVisible : false,
            dialogFormVisible: false,
            users : [],
        }
    },
    mounted() {
    },
    computed : {
      indexName : {
        get(){
          return this.stageId + '-' + this.taskNum
        }
      },
        tagUser(){
          //从总线上接收users
            this.users = this.$store.state.xzwxzw.userInfo;
            var tempList = [];
            console.log("this.thisTask.follower:", this.thisTask.follower);
            for( var j=0;j<this.thisTask.follower.length;j++)
            {
              var user = this.thisTask.follower[j];
              let name = user.userId;
              if (user.state == 1)
              {
                tempList.push({
                  name : name,
                  type : "success"
                })
              }
              else if (user.state == 2)
              {
                tempList.push({
                  name : name,
                })
              }
              else if (user.state == 3)
              {
                tempList.push({
                  name : name,
                  type : "warning"
                })
              }
            }
          console.log("templist:", tempList);
          return tempList;
        }
    },  
    methods : {
        openForm(){
            if (!this.dialogFormVisible)
                this.dialogFormVisible = true;
        },
        closeForm(){
            this.dialogFormVisible = false;
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