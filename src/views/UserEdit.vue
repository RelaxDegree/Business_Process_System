<template>
  <div>
    <div>
    <!-- <p>{{allPros}}</p>
    <p>{{allTasks}}</p>
    <p>{{userProAndTask}}</p> -->
    <!-- <el-button type="primary" @click.stop="getTasks">确 定</el-button> -->
    <div>
      <p>用户当前参加的项目和任务</p>
      <el-button type="primary" @click="addDialogVisible = true">
        <i class="el-icon-circle-plus-outline"></i>
        添加项目和任务
      </el-button>
      <el-table
        :data="userProAndTask"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="projectName"
          label="项目名"
          width="300">
        </el-table-column>
        <el-table-column
          prop="taskId"
          label="任务id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="taskDetail"
          label="任务细节描述"
          width="300">
        </el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="scope">
            <el-button
            size="mini"
            type="danger"
            width="100"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    </div>

    <!-- 添加项目和任务 -->
    <div>
      <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
      <el-dialog title="添加项目和任务" :visible.sync="addDialogVisible">
        <el-form :model="form">
          <!-- 选择项目     -->
          <el-form-item>
            <el-select v-model="optionProValue" placeholder="请选择项目" @change="currentProSel">
              <el-option
                v-for="item in allPros"
                :key="item.projectId"
                :label="item.projectName"
                :value="item.projectId">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 选择任务 -->
          <el-form-item>
            <el-select v-model="optionTaskValue" placeholder="请选择任务" @change="taskIsChange = true">
              <el-option
                v-for="item in allTasks"
                :key="item.taskId"
                :label="item.taskId"
                :value="item.taskId">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 选择流程 -->
          <el-form-item>
            <el-select v-model="optionProcessValue" placeholder="请选择流程" @change="processIsChange = true">
              <el-option
                v-for="item in processes"
                :key="item.value"
                :label="item.lable"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleCancle">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import {getAllPros} from '@/api/api'
import {getProTask} from '@/api/api'
import {getUserProAndTask} from '@/api/api'
import {addUserProAndTask} from '@/api/api'
import {deleteUserProAndTask} from '@/api/api'
import { all } from 'axios'
// import { all } from 'axios'
export default {
  data(){
    return {
      allPros : [],
      allTasks : [],
      userProAndTask : [],
      addDialogVisible : false,
      text : '',
      taskId : 15000,
      userId : 1,
      state : 1,
      projectName : '',
      processes : [{
        lable:'编写',
        value:1,
      },{
        lable:'审批',
        value:2,
      },{
        lable:'会签',
        value:3,
      }
      ],
      optionProValue : '',
      optionTaskValue : '',
      optionProcessValue : '',
      proIsChange : false,
      taskIsChange : false,
      processIsChange : false,
    } 
  },
  mounted(){
    this.getPros();
    this.getUsers();
    // this.getTasks();
  },
  beforeDestroy(){
    this.$store.commit('clearProAndTask')
  },
  methods: {
    getPros(){
      let params = {
        id : 2
      }
      getAllPros(params).then(res => {
        // this.allPros = res.data.data
        // // this.$store.commit('getDocuments',res.data.data)
        // // this.$store.state.sja.allPros = res.data.data
        // // console.log(1)
        // this.$store.commit('getAllPros',res.data.data)
        // console.log(JSON.stringify(res))
        // console.log(JSON.stringify(this.$store.state.sja.allPros))
        // console.log(1)
      })
    },
    getUsers(){
      let params = {
        id : 1
      }
      getUserProAndTask(params).then(res => {
        this.userProAndTask = res.data.data
        // console.log(3)
        // console.log(JSON.stringify(res.data.data))
        this.$store.commit('getUserProAndTask',res.data.data)
        // console.log(JSON.stringify(this.$store.state.sja.userProAndTask))
        // console.log(3)

      })
    },
    getTasks(){
      let params = {
        projectId : ''
      }
      params.projectId = this.optionProValue
      for(var i = 0 ;i < this.allPros.length; i ++){
        if(this.allPros[i].projectId === this.optionProValue ){
          this.projectName = this.allPros[i].projectName
        } 
      }
      getProTask(params).then(res => {
        console.log(1111111111111)
        console.log(JSON.stringify(res.data.data))
        this.allTasks = []
        for( var i = 0 ;i < res.data.data.length ; i++){
          var flag = false
          for(var j = 0 ;j < this.userProAndTask.length ; j++){
            if(this.projectName === this.userProAndTask[j].projectName && this.optionProValue === this.userProAndTask[j].taskId){
              flag = true
            }
          }
          if(!flag){
            this.allTasks.push(res.data.data[i])
          }
        }
        this.$store.commit('getAllProAndTask',this.allTasks)
      })
        
      // }
      // console.log(2)
      // console.log(JSON.stringify(this.$store.state.sja.allProAndTask))
      // console.log(2)
      // this.userProAndTask = this.$store.state.sja.userProAndTask
    },
    handleDelete(index, row) {
      console.log(row);
      this.userProAndTask.splice(index, 1);
    },
    handleAdd(){
      console.log(this.proIsChange)
      console.log(this.taskIsChange)
      console.log(this.processIsChange)
      if(this.proIsChange === true && this.taskIsChange === true && this.processIsChange === true ){
        this.$message({
          message: '添加成功',
          type: 'success'
        });

        // 添加 de 代码

        
        // 添加结束
        this.getUsers()
        this.addDialogVisible=false
        this.optionProValue = ''
        this.optionTaskValue = ''
        this.optionProcessValue = ''
      }
      else {
        this.$alert('请补全项目任务信息', '信息不完整', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ 萨芬呢啊我 }`
            });
          }
        });
      }
      // let params = {
      //   taskId : 72,
      //   userId : 1,
      //   state : 1
      // }
      // addUserProAndTask(params).then(res => {
      //   console.log(JSON.stringify(res.data.data))
      // })
    },
    handleCancle(){
      this.addDialogVisible=false
      this.proIsChange=false
      this.taskIsChange=false
      this.processIsChange=false
      console.log(this.proIsChange)
      this.optionProValue = ''
      this.optionTaskValue = ''
      this.optionProcessValue = ''
    },
    currentProSel(){
      console.log(this.optionProValue)
      this.getTasks()
      this.proIsChange = true
    },

  }
}
</script>

<style>
.small {
  width: 800px;
}
</style>