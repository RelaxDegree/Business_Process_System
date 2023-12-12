<template>
  <el-container class="homeWrap">
    <el-header height="20%">
      <big-header></big-header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import BigHeader from "../components/BigHeader.vue";
import { store } from "@/store/index";
import { getInfo } from "@/api/login";

export default {
  store,
  data() {
    return {};
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      const userId = localStorage.getItem("userId");
      console.log(userId);
      getInfo(userId).then((res) => {
        this.$store.commit('xzwxzw/updateUserInfo', res.data.data)
      });
    },
  },
  components: {
    BigHeader,
  },
};
</script>
<style >
.homeWrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>