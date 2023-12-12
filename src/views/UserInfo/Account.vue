<template>
    <el-form>
        <el-form-item label="Name">
            <el-input v-model.trim="userdata.name" />
        </el-form-item>
        <el-form-item label="OtherInfo">
            <el-input v-model.trim="userdata.otherInfo" />
        </el-form-item>
        <el-form-item label="Password">
            <el-input placeholder="请输入密码" v-model.trim="userdata.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
            <el-input placeholder="请确认新密码" v-model.trim="userdata.password2" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">Update</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { updateUserInfo } from '@/api/userInfo';
import Cookie from 'js-cookie';

export default {
    data() {
        return {
            userdata: {
                name: '',
                password: '',
                password2: '',
                otherInfo: ' ',
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
            if (this.userdata.password != this.userdata.password2) {
                this.$message.error('确认密码不同')
                return
            }
            if (!this.userdata.name) {
                this.$message.error('用户名不能为空')
                return
            }
            
            updateUserInfo(this.userdata).then(res => {
                console.log("upInfores:",res.data)
                this.$message({
                message: res.data.message,
                type: 'success',
                duration: 1 * 1000
            })
            }).catch(res => {
                // 错误处理
            })
            Cookie.set('name', this.userdata.name)
            Cookie.set('password', this.userdata.password)
            Cookie.set('otherInfo', this.userdata.otherInfo)
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
