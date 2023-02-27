<template>
    <div>
        <h2>Sign in/ Sign up</h2>
        <div class="container" id="container">
            <div class="form-container sign-up-container">
                <el-form action="">
                    <h1>Create Account</h1>
                    <el-input v-model="registerData.username" placeholder="Username"></el-input>
                    <el-select class="myinput" v-model="RoleValue" placeholder="Role">
                        <el-option v-for="item in RoleOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- Group输入框 -->
                    <el-select class="myinput" v-model="GroupValue" placeholder="Group" @focus="getGroups">
                        <el-option v-for="item in GroupOptions" :key="item.groupId" :label="item.name" :value="item.groupId">
                        </el-option>
                    </el-select>
                    <el-input v-model="registerData.password" placeholder="Password"></el-input>
                    <el-button @click="registerHandle">Sign Up</el-button>
                </el-form>
            </div>
            <div class="form-container sign-in-container">
                <el-form action="">
                    <h1>Sign in</h1>
                    <el-input v-model="loginData.name" placeholder="Username" />
                    <el-input v-model="loginData.password" placeholder="Password" />
                    <el-button @click="loginHandle()">Sign In</el-button>
                </el-form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>
                            To keep connected with us please login with your personal info
                        </p>
                        <el-button class="ghost" id="signIn" @click="removeNewCss">Sign In</el-button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>Hello,Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <el-button class="ghost" id="signUp" @click="addNewCss">Sign Up</el-button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import loginUtil from "../../utils/loginUtil";
import { login } from "@/api/login"
import { register } from "@/api/login";
import Cookie from 'js-cookie';
import { getgroups } from "@/api/login";
import { mapGetters } from 'vuex'

export default {
    name: "LoginPage",
    data() {
        return {
            loginData: {
                name: '',
                password: ''
            },
            registerData: {
                username: '',
                password: '',
                role: '',
                group: ''
            },
            RoleValue: '',
            GroupValue: '',
            RoleOptions: [{
                value: 1,
                label: '项目经理'
            },
            {
                value: 0,
                label: '普通员工'
            }],
            GroupOptions: [

            ]
        }
    },
    methods: {
        addNewCss() {
            console.log("add")
            const container = document.getElementById('container')
            container.classList.add("right-panel-active")
        },
        removeNewCss() {
            console.log("remove")
            const container = document.getElementById('container')
            container.classList.remove("right-panel-active")
        },
        loginHandle() {
            localStorage.setItem('token','xxxx')
            console.log(this.loginData)
            // 登录事件
            if (!this.loginData.name || !this.loginData.password) {
                this.$message.error('用户名或密码不能为空')
                return
            }
            // this.loginData.username = this.$refs.username.$el.value
            // this.loginData.password = this.$refs.password.$el.value
            login(this.loginData).then(res => {
                //Cookie.set('token', res.data.data.token)
                console.log(res)
                localStorage.setItem("token", res.data.token)
                this.$router.push('/')
            }).catch(res => {
                //this.$message.error(res.response.data.message)
            })

        },
        registerHandle() {
            // 注册事件
            if (!this.registerData.username || !this.registerData.password) {
                this.$message.error('用户名或密码不能为空')
                return
            }
            // this.registerData.username = this.$refs.username.$el.value
            this.registerData.role = this.RoleValue
            this.registerData.group = this.GroupValue
            // this.registerData.password = this.$refs.password.$el.value
            console.log(this.registerData)
            register(this.registerData).then(() => {
                this.$alert('注册成功，请登录', '提示', {
                    confirmButtonText: '确定',
                    callback: () => {
                        this.removeNewCss()
                    }
                })
            }).catch(res => {
                //this.$message.error(err.response.data.message)
            })
        },
        getGroups() {
            console.log("groupSearching...")
            // 向后端请求 group 信息
            getgroups().then(res => {
                // 将后端传回的 group 信息存储到 GroupOptions 中
                this.GroupOptions = []
                for (let i = 0; i < res.data.groups.length; i++) {
                    this.GroupOptions.push({
                        groupId: res.data[i].groupsId,
                        name: res.data[i].name,
                        memberCount: res.data[i].memberCount
                    })
                }
                console.log("group")
                }).catch(err => {
                    // 处理错误信息
                })
        }
    },
    mounted() {
    },
    computed: {

    }
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/fontawesome.min.css");
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;1,100&display=swap');

* {
    box-sizing: border-box;
}

body {
    background: #f6f5f7;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
    height: 100vh;
    margin: -20px 0 50px;
}

h1 {
    font-weight: bold;
    margin: 0;
}

h2 {
    text-align: center;
}

p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
}

span {
    font-size: 12px;
}

a {
    color: #333333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}

button {
    border-radius: 20px;
    border: 1px solid #402bff;
    background-color: #2b36ff;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

button:active {
    transform: scale(0.95);
}

button:focus {
    outline: none;
}

button.ghost {
    background-color: transparent;
    border-color: #ffffff;
}

form {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
}

.myinput {
    background-color: #ffffff;
    border: none;
    margin: 8px 0;
    width: 100%;
}

input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
}

.container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
}

@keyframes show {

    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.overlay {
    background: #2b32ff;
    background: -webkit-linear-gradient(to right, #2b32ff, #4741ff);
    background: linear-gradient(to right, #442bff, #4b41ff);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #dddddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}

footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
}

footer p {
    margin: 10px 0;

}

footer i {
    color: rgb(0, 72, 255);
}

footer a {
    color: #3c97bf;
    text-decoration: none;
}
</style>