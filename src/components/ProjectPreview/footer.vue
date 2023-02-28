<template>
  <div class="main-footer">
    <div class="footer-header-link">

      <div class="divider"></div>
      <div class="footer-bottom-link">
        <el-table :data="dairyData" height="170" style="width: 100%">
          <el-table-column prop="time" label="时间" width="180">
          </el-table-column>
          <el-table-column prop="executorName" label="操作执行者姓名" width="180">
          </el-table-column>
          <el-table-column prop="behave" label="操作">
          </el-table-column>
          <el-table-column prop="processId" label="执行时流程">
          </el-table-column>
        </el-table>
      </div>


    </div>



    <div></div>
  </div>
</template>
  
<script>
import { findDiary } from "@/api/api";

import { store } from "../../store"

export default {
  data() {
    return {
      dairyData: [],  //日志信息
    }
  },

  methods: {
    //接收日志信息
    showDiary() {
      let params = {
        projectId: 1,
        timeStamp: 1,
      }
      findDiary(params).then(res => {
        this.dairyData = res.data.data;
        console.log(res.data.code);
      })
      /*this.$store.commit("ADDDAIRY",this.dairyData)   //调用方法*/

    }
  },
  //加载页面显示
  mounted() {
    this.showDiary();
  }

};
</script>



<style scoped>
div.footer-header-link-row {
  justify-content: center;
  margin: 1em 0 -0.5em 0;
}

div.footer-header-link-row>.el-col {
  max-width: 160px;
}

div.footer-header-link-row>.el-col:hover {
  transform: rotateY(360deg);
  transition-duration: 1.5s;
}

svg.icon {
  max-height: 5em;
}

svg.new-color {
  fill: #3e5962;
}

div.contributors-title {
  text-decoration: none;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  font-size: 25px;
  padding-bottom: 0.5em;
  margin-top: -0.5em;
}

div.contributors-title-row {
  justify-content: center;
  line-height: 150%;
}

img#school-logo {
  width: 5em;
  margin-bottom: 10px;
}

div#school-box {
  /* vertical-align: middle; */
  padding-left: 2px;
  border-left: 1px solid #3e5962;
  line-height: 150%;
}

div.contributors-title-row>.el-col {
  margin-bottom: 10px;
  text-decoration: none;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  font-size: 16px;
  max-width: 170px;
}

div.divider {
  height: 1px;
  margin: 24px auto;
  background-color: #cccccc;
  max-width: 1100px;
}

a.contributor-link {
  border-bottom: 2px solid #fff;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  font-size: 15px;
}

a.contributor-link:hover {
  border-bottom: 2px solid #c0a02e;
}
</style>
  