<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />
    <el-container>
      <el-aside>
        <div class="user-info-box">
          <user-card :userInfo="userInfo" :isDone="isDoneNum" :isNotDone="isNotDoneNum"/>
        </div>
      </el-aside>
      <el-main>
        <h2 class="f4 mb-2 text-normal">我的项目</h2>
        <ul>
          <!-- <li class="hbox-list-item">
            <hbox></hbox>
          </li> -->
          <li
            v-for="(item, key) in paginatedProjects"
            :key="key"
            class="hbox-list-item"
          >
            <hbox :item="item"></hbox>
          </li>

        </ul>
        <el-pagination
          background
          :page-size="6"
          layout="prev, pager, next"
          :total="projectList.length"
          @current-change="handlePageChange"
        ></el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
//import { getData } from '../../api';
import Hbox from "./hbox.vue";
import GithubCorner from "@/components/GithubCorner.vue";
import UserCard from "../UserInfo/UserInfoBox.vue";
import { getActPro } from "../../api/userInfo";
import { store } from "@/store/index";
// import { mapState } from 'vuex'

export default {
  store,
  components: {
    GithubCorner,
    UserCard,
    Hbox,
  },
  data() {
    return {
      projectList: [],
      currentPage: 1,
      userInfo: "",
      isDoneNum: 0,
      isNotDoneNum: 0,
    };
  },
  computed: {
    paginatedProjects() {
      const startIndex = (this.currentPage - 1) * 6;
      const endIndex = startIndex + 6;
      return this.projectList.slice(startIndex, endIndex);
    },
  },
  methods: {
    getActiveProject(id) {
      getActPro(id).then((res) => {
        // console.log(res);
        this.projectList = res.data.data;
        const { isDoneNum, isNotDoneNum } = this.projectList.reduce(
          (acc, project) => {
            if (project.projectIsdone) {
              acc.isDoneNum++;
            } else {
              acc.isNotDoneNum++;
            }
            return acc;
          },
          { isDoneNum: 0, isNotDoneNum: 0 }
        );
        this.isDoneNum = isDoneNum;
        this.isNotDoneNum = isNotDoneNum;
      });
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
  },

  mounted() {
    // console.log(this.$store.state.xzwxzw.userInfo.userId);
    this.getActiveProject(localStorage.getItem("userId"));
    this.userInfo = this.$store.state.xzwxzw.userInfo;
  },
};
</script>


<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.dashboard-editor-container {
  margin: 0 auto;
  background-color: #fff;
  position: relative;
  align-items: center;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.el-container {
  /* 默认样式 */
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /* 在小屏幕上应用的样式 */
  @media (max-width: 768px) {
    width: 100%;
  }

  /* 在中等屏幕上应用的样式 */
  @media (min-width: 1025px) and (max-width: 1600px) {
    width: 90%;
  }

  /* 在大屏幕上应用的样式 */
  @media (min-width: 1600px) {
    width: 70%;
  }
}

.hbox-list-item {
  padding: 8px 8px 8px 0;
}
ul {
  display: flex;
  list-style-type: none;
  width: 100% !important;
  flex-wrap: wrap !important;
  padding: 0 !important;
}

li {
  display: flex;
  width: 49%;
  flex-basis: 50% !important;
}

.text-normal {
  font-weight: 600 !important;
  font-size: 20px !important;
  text-align: left;
}

.mb-2 {
  margin-bottom: 8px !important;
  margin-top: 0;
}

.el-aside {
  width: 256px !important;
  margin-left: -40px;
}

.el-main {
  padding: 20px !important;
}
.user-info-box {
  margin-top: 70px;
}
</style>