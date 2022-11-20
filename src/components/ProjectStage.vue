<template>
    <el-submenu index="1" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <template slot="title"><i class="el-icon-message"></i>阶段一</template>
        <el-menu-item-group>
            <el-menu-item @click="openForm" index="1-0" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">新建任务 
            </el-menu-item>
            <el-dialog title="任务详细信息" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="任务名称" :label-width="formLabelWidth">
                        <el-col :span="11">
                            <el-input v-model="form.name" style="width : 400px"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="任务起止时间" :label-width="formLabelWidth">
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
                    <el-form-item label="参与编写人员" :label-width="formLabelWidth">
                        <el-col :span="20">
                            <el-tag
                            :key="tag"
                            v-for="tag in form.Compileusers"
                            closable
                            :disable-transitions="false"
                            @close="closeCompileusers(tag)">
                            {{tag}}
                            </el-tag>
                            <el-button type="primary" style="margin-left : 10px" size="mini" >+</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="参与审阅人员" :label-width="formLabelWidth">
                        <el-col :span="11">
                            <el-tag
                            :key="tag"
                            v-for="tag in form.Reviewusers"
                            type="warning"
                            closable
                            :disable-transitions="false"
                            @close="closeReviewusers(tag)">
                            {{tag}}
                            </el-tag>
                            <el-button type="primary" style="margin-left : 10px" size="mini" >+</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="参与会签人员" :label-width="formLabelWidth">
                        <el-col :span="11" >
                            <el-tag
                            :key="tag"
                            v-for="tag in form.Signusers"
                            type="success"
                            closable
                            :disable-transitions="false"
                            @close="closeSignusers(tag)">
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
                      v-model="form.detail">
                    </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.stop="closeForm">取 消</el-button>
                    <el-button type="primary" @click.stop="closeForm">确 定</el-button>
                </div>
            </el-dialog>

          
          
          <project-task></project-task>

        </el-menu-item-group>
    </el-submenu>
      
</template>

<script>
import ProjectTask from './ProjectTask.vue';
export default {
    data() {
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          time: '',
          detail: '',
          Compileusers : [
            '小明','小红','只因','坤坤','小明','小红','只因','坤坤'
          ],
          Reviewusers : [
            '2233','7788'
          ],
          Signusers : [
            'boss','god'
          ],
        },
        formLabelWidth: '120px'
      };
    },
    methods : {
        openForm(){
            console.log("111");
            if (!this.dialogFormVisible)
                this.dialogFormVisible = true; 

        },
        closeForm(){
            console.log("222");

            this.dialogFormVisible = false;
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
    components : {
        ProjectTask
    },
    name : 'proj-stage',

}
</script>

<style>

</style>