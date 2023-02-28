<template>
    <div class="manager">
        <el-dialog title="提示" :visible.sync="dialogVisible" :before-close="handleclose" width="30%">

            <!-- 用户表单 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="name" prop="name">
                    <el-input placeholder="default1" v-model="form.info1"></el-input>
                </el-form-item>
                <el-form-item label="otherInfo" prop="otherInfo">
                    <el-input placeholder="default2" v-model="form.info2"></el-input>
                </el-form-item>
                <el-form-item label="userId" prop="userId">
                    <el-select v-model="form.info3" placeholder="选择">
                        <el-option label="111" value="1"></el-option>
                        <el-option label="222" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>

        <div class="manager-header">
            <el-button @click="dialogVisible = true" type="primary">
                +新增
            </el-button>
            <template>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="userId" label="用户ID" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="otherInfo" label="备注">
                    </el-table-column>
                    <el-table-column prop="act" label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>
<script>
import { getUser } from '@/api/user'
import {delProUser, getProUser} from '@/api/user'
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                otherInfo: '',
                userId: ''
            },
            rules: { // 表单校验规则
            },
            tableData:
                []

        }
    },
    methods: {
        // 提交用户表单
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 数据处理

                    // 关闭弹窗

                    this.$refs.form.resetFields()
                    this.dialogVisible = false
                }
            })
        },
        handleclose() {
            this.$refs.form.resetFields()
            this.dialogVisible = false
        },
        cancel() {
            this.handleclose()
        },
        handleEdit() {
            // 跳转到sja的页面
            this.$router.push('/useredit')
        },
        handleDel() {
            console.log("peodel")
            delProUser(userId, taskId).then(res => {
                console.log("del succed")
            }).catch(res => {
                // wrong Handle
            })
        }
    },
    mounted() {
        // getUser().then(({ data }) => {
        //     console.log('获取')
        // })
        getUser("只因组").then(res => {
            console.log("只因",res.data)
            this.tableData = res.data.data
        })
    }
}
</script>