<template>
    <el-card style="margin-bottom:20px;">
        <div slot="header" class="clearfix">
            <span>About me</span>
        </div>

        <div class="user-profile">
            <div class="box-center">
                <pan-thumb :image="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'" :height="'100px'" :width="'100px'" :hoverable="false">
                    <div>Hello</div>
                    {{ this.name }}
                </pan-thumb>
            </div>
            <div class="box-center">
                <div class="user-name text-center">{{ this.name }}</div>
                <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div>
            </div>
        </div>

        <div class="user-bio">
            <div class="user-education user-bio-section">
                <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>otherinfo</span></div>
                <div class="user-bio-section-body">
                    <div class="text-muted">
                        {{ this.otherInfo }}
                    </div>
                </div>
            </div>

            <div class="user-skills user-bio-section">
                <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>Infomation</span></div>
                <div class="user-bio-section-body">
                    <div class="progress-item">
                        <span>姓名：</span>
                        {{ this.name }}
                    </div>
                    <div class="progress-item">
                        <span>用户ID: </span>
                        {{ this.userId }}
                    </div>
                    <div class="progress-item">
                        <span>所属项目组ID：</span>
                        {{ this.groupId }}
                    </div>
                </div>
            </div>
        </div>
        <!-- <div>
            <el-button class="ghost" id="updt" @click="update">更新</el-button> 
        </div> -->
    </el-card>
</template>

<script>
import PanThumb from '../../components/PanThumb'
// import store from '../../store';
import { store } from '@/store/index'
import Cookie from 'js-cookie';


export default {
    store,
    components: { PanThumb },
    props: {

    },
    data() {
        return {
            user: {
                userId: 0,
                name:'',
                password: '',
                otherInfo: '',
                groupId: 0,
                headPic: ''
            }
        }
    },
    created() {
        
    },
    computed: {
        //...mapState({
            // userId: state => state.xzwxzw.userInfo.userId,
            // name: state => state.xzwxzw.userInfo.name,
            // otherInfo: state => state.xzwxzw.userInfo.otherInfo,
            // groupId: state => state.xzwxzw.userInfo.groupId,
            // password: state => state.xzwxzw.userInfo.password
            userId: function () {
                return Cookie.get("userId")
            },
            name: function () {
                return Cookie.get("name")
            },
            otherInfo: function () {
                return Cookie.get("otherInfo")
            },
            groupId: function () {
                return Cookie.get("groupId")
            },
            password: function () {
                return Cookie.get("password")
            },
        //})
    },
    mounted() {
        // 从vuex获取头像: this.avatar = store...
    },
    methods: {
        update() {
            this.userId = Cookie.get("userId");
            this.name = Cookie.get("name");
            this.otherInfo = Cookie.get("otherInfo");
            this.groupId = Cookie.get("groupId");
            this.password = Cookie.get("password");
        }
    }
}
</script>

<style lang="scss" scoped>
.box-center {
    margin: 0 auto;
    display: table;
}

.text-muted {
    color: #777;
}

.user-profile {
    .user-name {
        font-weight: bold;
    }

    .box-center {
        padding-top: 10px;
    }

    .user-role {
        padding-top: 10px;
        font-weight: 400;
        font-size: 14px;
    }

    .box-social {
        padding-top: 30px;

        .el-table {
            border-top: 1px solid #dfe6ec;
        }
    }

    .user-follow {
        padding-top: 20px;
    }
}

.user-bio {
    margin-top: 20px;
    color: #606266;

    span {
        padding-left: 4px;
    }

    .user-bio-section {
        font-size: 14px;
        padding: 15px 0;

        .user-bio-section-header {
            border-bottom: 1px solid #dfe6ec;
            padding-bottom: 10px;
            margin-bottom: 10px;
            font-weight: bold;
        }
    }
}
</style>
