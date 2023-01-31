<template>
    <el-menu-item>

        <el-menu-item :index="indexName" @click="openForm">
            <!--<el-button @click="delTask" type="danger" class="el-icon-delete" style="height: 28px; width:28px" circle></el-button>-->

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
                        <el-tag
                        :key="tag"
                        v-for="tag in taskdata.Compileusers"
                        closable
                        :disable-transitions="false"
                        @close="closeCompileusers(tag)">
                        {{tag}}
                        </el-tag>
                        <el-button type="primary" style="margin-left : 10px" size="mini" >+</el-button>
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
    </el-menu-item>
</template>

<script>
export default {
    name : 'proj-task',
    props:['taskNum','thisTask','stageNum'],
    data() {
        return {
            formLabelWidth: '120px',
            dialogFormVisible: false,
            taskdata : {},
        }
    },
    mounted() {
        this.init();
    },
    computed : {
        indexName : {
            get(){
                return this.stageNum + '-' + this.taskNum
            }
        }
    },  
    methods : {
        init(){
            this.taskdata = this.thisTask;
            // console.log(this.taskdata);
        },
        openForm(){
            if (!this.dialogFormVisible)
                this.dialogFormVisible = true;
        },
        closeForm(){
            this.dialogFormVisible = false;
        },
        /*触发Stage中的deleteTask事件*/
        delTask(){
            this.$emit('deleteTask',this.thisTask)
        },
        // 更新这个任务的信息
        updateTask(){
            this.$store.commit("UPDATETASK", this.taskdata);
            this.closeForm();
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