<template>
    <div class="app-container">
        <!-- Note that row-key is necessary to get a correct row order. -->
        <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row
            style="width: 100%">
            <el-table-column align="center" label="ID" width="65">
                <template slot-scope="{row}">
                    <span>{{ row.taskId }}</span>
                </template>
            </el-table-column>

            <el-table-column width="180px" align="center" label="Date">
                <template slot-scope="{row}">
                    <span>{{ row.taskOpenTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>

            <el-table-column min-width="300px" label="taskDetail">
                <template slot-scope="{row}">
                    <span>{{ row.taskDetail }}</span>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="taskProgress" width="110">
                <template slot-scope="{row}">
                    <el-tag :type="row.taskProgress | statusFilter">
                        {{ row.taskProgress }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Detail" width="80">
                <template slot-scope="{}">
                    <el-button type="primary" icon="el-icon-edit" @click="editor()" circle></el-button>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Drag" width="80">
                <template slot-scope="{}">
                    <i class="el-icon-rank"></i>
                </template>
            </el-table-column>
        </el-table>
        <div class="show-d">
            <el-tag>The default order :</el-tag> {{ oldList }}
        </div>
        <div class="show-d">
            <el-tag>The after dragging order :</el-tag> {{ newList }}
        </div>
    </div>
</template>
  
<script>
// import { fetchList } from '@/api/article'
import Sortable from 'sortablejs'
import { getActTask } from '@/api/userInfo'
import { mapState } from 'vuex'
import { store } from '@/store/index'


export default {
    store,
    name: 'DragTable',
    filters: {
        statusFilter(status) {
            const statusMap = {
                3: 'success',
                0: 'info',
                1: 'danger',
                2: ''
            }
            return statusMap[status]
        }
    },
    data() {
        return {
            list: null,
            total: null,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 10
            },
            sortable: null,
            oldList: [],
            newList: []
        }
    },
    created() {
        this.getList()
    },
    computed: {
        ...mapState({
            userId: state => state.xzwxzw.userInfo.userId
        })
    },
    methods: {
        async getList() {
            //this.listLoading = true
            // const { data } = await fetchList(this.listQuery)
            // this.list = data.items
            getActTask(this.userId).then(res => {
                this.list = res.data.data
                console.log("listdata:",res.data.data)
            })
            // this.total = data.total
             this.listLoading = false
            this.oldList = this.list.map(v => v.id)
            this.newList = this.oldList.slice()
            this.$nextTick(() => {
                this.setSort()
            })
            
        },
        setSort() {
            const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
            this.sortable = Sortable.create(el, {
                ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
                setData: function (dataTransfer) {
                    // to avoid Firefox bug
                    dataTransfer.setData('Text', '')
                },
                onEnd: evt => {
                    const targetRow = this.list.splice(evt.oldIndex, 1)[0]
                    this.list.splice(evt.newIndex, 0, targetRow)
                }
            })
        },
        editor() {
            this.$router.push("/documentShow")
            // ...
        }
    }
}
</script>
  
<style scoped>
.sortable-ghost {
    opacity: .8;
    color: #fff !important;
    background: #42b983 !important;
}

.icon-star {
    margin-right: 2px;
}

.el-icon-rank {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.show-d {
    margin-top: 15px;
}
</style>
  