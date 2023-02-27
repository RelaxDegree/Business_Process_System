<template>
    <el-form>
        <el-form-item label="Name">
            <el-input v-model.trim="user.name" />
        </el-form-item>
        <el-form-item label="OtherInfo">
            <el-input v-model.trim="user.otherInfo" />
        </el-form-item>
        <el-form-item label="Password">
            <el-input placeholder="请输入密码" v-model.trim="user.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">Update</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { updateUserInfo } from '@/api/userInfo';
import { Store } from 'vuex';

export default {
    data() {
        return {
            userdata: {
                userId: '',
                name: '',
                password: '',
                groupId: '',
                otherInfo: '',
                headPic: ''
            },
        };
    },
    props: {
        user: {
            type: Object,
            default: () => {
                return {
                    name: '',
                    email: '',
                    otherInfo: '',
                    password
                }
            }
        }
    },
    methods: {
        submit() {
            this.$message({
                message: 'User information has been updated successfully',
                type: 'success',
                duration: 5 * 1000
            })
            updateUserInfo(this.userdata).then(res => {
                // 
            }).catch(res => {
                // 错误处理
            })
        }
    },
    mounted() {
        this.userdata.userId = this.$store.state.userdata.userId
        // 获取个人信息
        getInfo(this.userdata.userId).then(res => {
            this.userdata = res.data
        })

        // 更新
        this.$store.commit('updateUserInfo', this.userdata)
    }
}
</script>
