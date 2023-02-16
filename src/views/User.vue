<template>
    <div class="manager">
        <el-dialog title="提示" :visible.sync="dialogVisible" :before-close="handleclose" width="30%">

            <!-- 用户表单 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="info1" prop="info1">
                    <el-input placeholder="default1" v-model="form.info1"></el-input>
                </el-form-item>
                <el-form-item label="info2" prop="info2">
                    <el-input placeholder="default2" v-model="form.info2"></el-input>
                </el-form-item>
                <el-form-item label="info3" prop="info3">
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
                    <el-table-column prop="info1" label="日期" width="180">
                    </el-table-column>
                    <el-table-column prop="info2" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="info3" label="地址">
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
import { getUser } from '../api'
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                info1: '',
                info2: '',
                info3: ''
            },
            rules: { // 表单校验规则
                info1: [
                    { required: true, message: '请输入info1' }
                ],
                info2: [
                    { required: true, message: '请输入info2' }
                ],
                info3: [
                    { required: true, message: '请输入info3' }
                ]
            },
            tableData:
                [
                    {
                        info1: 111,
                        info2: 222,
                        info3: 44
                    },
                    {
                        info1: 234,
                        info2: 23422,
                        info3: 464
                    },
                ]

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

        },
        handleDel() {

        }
    },
    mounted() {
        getUser().then(({ data }) => {
            console.log('获取')
        })
    }
}
</script>