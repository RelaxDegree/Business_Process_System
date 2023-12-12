<template>
    <div class="app-container">
        <div v-if="user">
            <el-row :gutter="20">

                <el-col :span="6" :xs="24">
                    <user-card :user="user" />
                </el-col>

                <el-col :span="18" :xs="24">
                    <el-card>
                        <el-tabs v-model="activeTab">
                            <el-tab-pane label="修改信息" name="account">
                                <account :user="user" />
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </el-col>

            </el-row>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "./UserCard.vue";
import Account from "./Account.vue";

export default {
  name: "UserInfo",
  components: { UserCard, Account },
  data() {
    return {
      user: {},
      activeTab: "account",
    };
  },
  computed: {
    // ...mapGetters({
    //     userInfo: state => state.tab.userInfo
    // }),
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(" | "),
        email: "admin@test.com",
        avatar: this.avatar,
      };
    },
  },
};
</script>

<style scoped>
.app-container {
  margin: auto;
}

.el-card__body {
  margin: auto !important;
}

.el-row {
  display: flex;
  justify-content: center;
}

.el-col-18 {
  float: left; /* 或者不设置浮动 */
  width: 50%;
}
</style>
