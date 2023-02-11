<template>
    <div class="main-footer">
      <div class="footer-header-link">

        <div class="divider"></div>
        <div class="footer-bottom-link">
            <el-row>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" :offset="7">
                  <div class="contributors-title">CONTRIBUTORS:</div>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" :offset="7">
                    <div class="contributors-title">THANKS:</div>
                  </el-col>
            </el-row>
          <el-row class="contributors-title-row" :gutter="10">
            <el-col
              v-for="(person, index) in people"
              :key="index"
              :xs="4"
              :sm="4"
              :md="4"
              :lg="4"
              :xl="4"
            >
              <div class="bottom-link-item">
                <div class="demo-basic--circle">
                  <div :class="PersonName" @mouseenter="imgMouseEnter(0)">
                    <el-avatar :size="50" :src="person.userlink"></el-avatar>
                  </div>
                  <a class="contributor-link" :href="person.userGithublink">{{
                    person.name
                  }}</a>
                </div>
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div id="school-box">
                <img
                  @mouseenter="imgMouseEnter(1)"
                  :class="className"
                  id="school-logo"
                  src="https://upload.wikimedia.org/wikipedia/zh/thumb/4/40/%E5%90%89%E6%9E%97%E5%A4%A7%E5%AD%A6%E6%A0%A1%E5%BE%BD.jpg/200px-%E5%90%89%E6%9E%97%E5%A4%A7%E5%AD%A6%E6%A0%A1%E5%BE%BD.jpg"
                />
                <div style="margin-top: -30px">
                    <p id="school-address">吉林大学软件学院<br />前进大街2699号</p>

                </div>
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                
                <p>  朱晓冬教授</p>
            </el-col>
          </el-row>
        </div>
      </div>
  
      <div></div>
    </div>
  </template>
  
  <script>
  export default {
    data(){
        return{
        people : [
        {
          name: "hhhhlkf",
          userGithublink: "https://github.com/hhhhlkf",
          userlink: "https://avatars.githubusercontent.com/u/83146521?v=4",
        },
        {
          name: "李炫辰",
          userGithublink: "https://github.com/XuanchenLi",
          userlink: "https://avatars.githubusercontent.com/u/72061207?v=4",
        },
        {
          name: "张昱昊",
          userGithublink: "https://github.com/RelaxDegree",
  
          userlink: "https://avatars.githubusercontent.com/u/87285666?s=120&v=4",
        },
        {
          name: "孙兰博",
          userGithublink: "https://github.com/1myPromise1",
          userlink: "https://avatars.githubusercontent.com/u/102464333?v=4",
        },
        
        {
          name: "谢志伟",
          userGithublink:"https://github.com/FY-Rzz",
          userlink: "https://avatars.githubusercontent.com/u/79126246?v=4",
        },
        {
          name: "单嘉澳",
          userGithublink: "https://github.com/SJA1122",
          userlink: "https://avatars.githubusercontent.com/u/82791445?v=4",
        },
      ],
        }
    },

    
  };
  </script>
  
  <style scoped>
  div.footer-header-link-row {
    justify-content: center;
    margin: 1em 0 -0.5em 0;
  }
  div.footer-header-link-row > .el-col {
    max-width: 160px;
  }
  div.footer-header-link-row > .el-col:hover {
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
  div.contributors-title-row > .el-col {
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
  