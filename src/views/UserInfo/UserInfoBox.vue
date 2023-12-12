<template>
    <el-card style="margin-bottom:20px;">
        <div slot="header" class="clearfix">
            <span>About Me</span>
        </div>

        <div class="user-profile">
            <div class="box-center">
                <pan-thumb :image="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'" :height="'100px'" :width="'100px'" :hoverable="false">
                    <div>{{ userInfo.name }}</div>
                    
                </pan-thumb>
            </div>
            <div class="box-center">
                <div class="user-name text-center">{{ userInfo.name }}</div>
                <div class="user-role text-center text-muted">{{ userInfo.role | uppercaseFirst }}</div>
            </div>
        </div>

        <div class="user-bio">
            <div class="user-education user-bio-section">
                <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>Education</span></div>
                <div class="user-bio-section-body">
                    <div class="text-muted">
                        {{ userInfo.otherInfo }}
                    </div>
                </div>
            </div>

            <div class="user-skills user-bio-section">
                <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>任务完成情况</span></div>
                <div class="user-bio-section-body">
                    <div class="progress-item">
                        <span>已完成</span>
                        <el-progress :percentage="isDone / (isDone + isNotDone) * 100" />
                    </div>
                    <div class="progress-item">
                        <span>未开始</span>
                        <el-progress :percentage="isNotDone / (isDone + isNotDone) * 100" />
                    </div>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
import PanThumb from '../../components/PanThumb'

export default {
    components: { PanThumb },
    props: ["userInfo", "isDone", "isNotDone"],
    mounted() {
        // 从vuex获取头像: this.avatar = store...
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
