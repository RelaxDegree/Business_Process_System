<template>
  <div class="aaa">
    <!-- 文档展示 -->
    <div>
      <h1 class="title">{{docData.name}}</h1>
      <p class="gray">
        创建时间:{{docData.createTime}} <span v-html="'\u00a0\u00a0'"> </span> ||  <span v-html="'\u00a0\u00a0'"></span>  最近编辑时间:{{docData.editTime}}
      </p>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col :span="6" :offset="3">
          <div>
            <div>
              <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                  <span>编写阶段</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click.stop="handleBianXie">编辑</el-button>
                </div>
                <div>
                  {{docData.progressComposeContent}}
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <div>
              <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                  <span>审批阶段</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click.stop="handleShenPi">编辑</el-button>
                </div>
                <div> 
                  {{docData.progressApprovalContent}}
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <div>
              <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                  <span>会签阶段</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click.stop="handleHuiQian">编辑</el-button>
                </div>
                <div>
                  {{docData.progressCountersignContent}}
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 文档编辑弹窗 -->
    <div>
      <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
      <el-dialog title="文档编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item :label=process >
            <el-input
              type="textarea"
              :rows="7"
              placeholder="请输入内容"
              v-model="form.textAll">
            </el-input>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancle">取 消</el-button>
          <el-button type="primary" @click="handleSure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    

  </div>
</template>

<script>
import {getProjectDoc} from '@/api/api'
import {store} from '@/store/index'
export default {
  store,
  data() {
    return {
      docData : [],
      dialogFormVisible: false,
      processId : 0,
      process:'',
      form: {
        textAll: '',
      },
      
      formLabelWidth: '100px',
    }
  },
  mounted(){
    this.getADoc();
  },
  methods: {
    getADoc(){
      let params = {
        taskId : this.$store.state.sja.taskId

        // taskId : 1
      }
      getProjectDoc(params).then(res => {
        this.docData = res.data.data
        console.log(JSON.stringify(res.data.data))
      })
      if(this.docData.progressComposeContent === '') this.processId = 1
      else if(this.docData.progressApprovalContent === '' )this.processId = 2
      else if(this.docData.progressCountersignContent === '' )this.processId = 3
      else this.processId = 4
      this.processId = 1
    },
    handleBianXie(){
      if(this.processId === 1){
        this.process = '编写阶段内容'
        this.dialogFormVisible = true
      }
      else {
        this.$alert('文档编写阶段已经完成', '无法编辑', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ 萨芬呢啊我 }`
            });
          }
        });
      }
    },
    handleShenPi(){
      if(this.processId === 2){
        this.process = '编写审批阶段内容'
        this.dialogFormVisible = true
      }
      else if(this.processId > 2){
        this.$alert('文档审批阶段已经完成', '无法编辑', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ 萨芬呢啊我 }`
            });
          }
        });
      }
      else{
        this.$alert('文档还未到审批阶段', '无法编辑', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ 萨芬呢啊我 }`
            });
          }
        });
      }
    },
    handleHuiQian(){
      if(this.processId === 3){
        this.process = '编写会签阶段内容'
        this.dialogFormVisible = true
      }
      else if(this.processId < 3){
        this.$alert('文档还未到会签阶段', '无法编辑', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ 萨芬呢啊我 }`
            });
          }
        });
      }
      else{
        this.$alert('文档会签阶段已经完成', '无法编辑', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ 萨芬呢啊我 }`
            });
          }
        });
      }
    },
    handleCancle(){
      this.dialogFormVisible = false
      this.form.textAll = ''
    },
    handleSure(){
      console.log(this.form.textAll)
      if(this.form.textAll === '') {
          this.$notify.error({
          title: '错误',
          message: '内容不能为空'
        });
        return 
      }
      this.dialogFormVisible = false
      if(this.processId === 1 ) this.docData.progressComposeContent=this.form.textAll
      else if(this.processId === 2 ) this.docData.progressApprovalContent=this.form.textAll
      else if(this.processId === 3 ) this.docData.progressCountersignContent=this.form.textAll
      this.$notify({
          title: '成功',
          message: '修改文档成功',
          type: 'success'
        });
      this.form.textAll = ''
      this.processId++
    }
  }
}

</script>

<style scoped>
.aaa {
background-color :white;
}
.title {
  text-align: center;
}
.gray {
  color: gray;
  text-align: center;
}
.hide {
  visibility:hidden;
}
.box-card {
  height: 400px;
  background-color:rgb(255, 212, 212);
}
.pink{
  background-color:pink;
}
</style>
