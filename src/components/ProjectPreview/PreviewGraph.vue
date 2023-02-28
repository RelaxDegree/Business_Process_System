<template>

  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-row  :span='16'>
        <el-col >
          <el-tabs v-model="activeName" >
            <el-tab-pane label="默认页面" name="default">
<!--              <el-dialog
                  title="用户指南"
                  :visible.sync="dialogVisible"
                  width="50%" center="">
                <el-steps :active="active" finish-status="success">
                  <el-step title="步骤 1"></el-step>


                  <el-step title="步骤 2"></el-step>
                  <el-step title="步骤 3"></el-step>
                </el-steps>
                <div v-if="active===0">
                  <el-card shadow="always">
                    <p>您可以点击项目配置左下角圆形按钮 查看项目组成员</p>
                    <P>您可以点击项目配置菜单栏  进项目信息填写</P>
                  </el-card>
                </div>
                <div v-if="active===1">
                  <el-card shadow="always">
                    <p>之后点击“创建阶段”按钮， 填写项目信息</p>
                    <p>创建完毕后可以点击阶段菜单，修改信息</p>
                  </el-card>
                </div>
                <div v-if="active===2">
                  <el-card shadow="always">
                    <p>之后点击“创建任务”按钮， 填写任务信息</p>
                    <p>创建完毕后在右侧拖拽 绘制任务拓扑流程</p>
                  </el-card>
                </div>
                <div v-if="active===3">
                  <el-card shadow="always">
                    <p>项目信息填写完毕后 点击发布项目</p>
                  </el-card>
                </div>
                <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="next">下一步</el-button>
                                </span>
              </el-dialog>-->
              <el-empty>
<!--                <el-button type="primary" @click="guide">用户指南</el-button>-->
              </el-empty>
            </el-tab-pane>
            <!-- <div

            :thisStage="s"> -->
            <el-tab-pane
                v-for="(s,index) of this.$store.state.proCreate.proPreview.stage"
                :key="(index+1).toString()"
                :label="constName+(index+1).toString()" :name="(index+1).toString()">

              <prev-subgraph :stageId="(index+1).toString()"></prev-subgraph>

            </el-tab-pane>
            <!-- </div> -->

            <!-- <el-tab-pane label="阶段二" name="second">
                <SubGraph></SubGraph>
            </el-tab-pane>
            <el-tab-pane label="阶段三" name="third">
                <SubGraph></SubGraph>
            </el-tab-pane>
            <el-tab-pane label="阶段四" name="fourth">
                <SubGraph></SubGraph>
            </el-tab-pane> -->




          </el-tabs>
        </el-col>

      </el-row>



    </el-header>



  </el-container>
</template>
<script >
import {store} from '../../store/index';
import PrevSubgraph from "@/components/ProjectPreview/PreviewSubgraph";
export default {
  name : "prev-graph",
  store,
  watch:{
    '$store.state.proCreate.nowStage'(newVal,oldVal)
    {
      //对数据执行操作
      this.activeName = newVal
    },
  },
  data (){
    return {
      constName : '阶段',
      activeName : 'default',
      active: 0,
      dialogVisible : false,
      data : {

      },
      dataList: [
        {
          id: 1,
          content: '1'
        },
        {
          id: 2,
          content: '2'
        },
        {
          id: 3,
          content: '3'
        },
      ]

    }
  },
  created() {},
  mounted() {

  },
  methods: {
    guide(){
      this.dialogVisible = true
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    }
  },
  components : {
    PrevSubgraph,
  }
}
</script>


<style scoped>
</style>