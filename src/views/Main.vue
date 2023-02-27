<template>
  <!-- <el-container>
        <el-aside width="auto">
            <com-aside />
        </el-aside>
        <el-container>
            <el-header>
                <com-header />
            </el-header>
            <el-main>
                
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container> -->
  <el-container>
    <el-header><big-header></big-header></el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer> </el-footer>
  </el-container>
</template>
<script>
import BigHeader from "../components/BigHeader.vue";
import PersonAvatar from "../components/PersonAvatar.vue";
import ComAside from "../components/ComAside.vue";
import ComHeader from "../components/ComHeader.vue";
export default {
  data() {
    return {};
  },
  components: {
    BigHeader,
    PersonAvatar,
    ComAside,
    ComHeader,
  },
};
</script>
<style scoped>
.el-header {
  padding: 0;
}
</style>

</style>