<template>
  <div class="mgl20 com_popup">
    <div>
      <div class="search">
        <div class="left-search">
          <el-button type="primary" @click="add">
            新增
          </el-button>
        </div>
        <div class="right-search">
          <el-date-picker
            v-model="queryParams.dateRange"
            type="daterange"
            value-format="yyyy-MM-dd"
            align="right"
            unlink-panels
            range-separator="~"
            start-placeholder="开始"
            end-placeholder="结束"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
          <el-input
            style="width:auto"
            v-model="queryParams.key"
            placeholder="关键字"
          ></el-input>
          <el-button type="primary" @click="gettabeldata">
            查询
          </el-button>
        </div>
      </div>
      <div class="table-container">
        <el-table v-loading="listLoading" :data="tabledata" stripe border>
          <el-table-column label="编号" type="index" width="50" />
          <template v-for="(column, idx) in headerData">
            <el-table-column
              v-if="column.length <= 50 && column.name.toLowerCase() != 'id'"
              :key="idx"
              :label="column.displayName"
              :prop="column.name"
            >
              <template slot-scope="scope">
                <template v-if="column.typeStr == 'Boolean'">
                  <el-switch
                    :value="scope.row[column.name]"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  />
                </template>
                <div v-else>{{ scope.row[column.name] }}</div>
              </template>
            </el-table-column>
          </template>

          <el-table-column
            label="操作"
            align="center"
            width="140"
            fixed="right"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editData(scope.row)"
                >编辑</el-button
              >
              <el-button
                v-if="scope.row.status != 'deleted'"
                size="mini"
                type="danger"
                @click="deleteData(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-pagination
          :current-page="page.pageIndex"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="page.totalCount"
          @current-change="currentchange"
          @size-change="handleSizeChange"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getDataList, deleteById } from '@/api/entity'

export default {
  name: 'list',
  data() {
    return {
      tabledata: [],
      queryParams: {
        key: null,
        dateRange: null,
      },
      page: {
        PageIndex: 1,
        PageSize: 10,
        TotalCount: 0,
      },
      headerData: [],
      listLoading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '昨天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
    }
  },
  computed: {
    currentPath() {
      return this.$route.path
    },
    queryData() {
      let vm = this
      let dateRange = vm.queryParams.dateRange
      if (dateRange) {
        vm.queryParams.dtStart = dateRange[0]
        vm.queryParams.dtEnd = dateRange[1]
      } else {
        vm.queryParams.dtStart = null
        vm.queryParams.dtEnd = null
      }

      let temp = {}
      Object.assign(temp, vm.page, vm.queryParams)
      temp.dateRange = undefined
      return temp
    },
  },
  watch: {
    $route: {
      handler: function() {
        this.init()
      },
      immediate: true,
    },
  },
  methods: {
    init() {
      this.getListFields()
      this.query()
    },
    getListFields() {
      let vm = this
      vm.$store.dispatch('getListFields', vm.currentPath).then((res) => {
        vm.headerData = res
      })
    },
    add() {
      let vm = this
      vm.$router.push(vm.currentPath + '/Add')
    },
    editData(row) {
      let vm = this
      vm.$router.push(vm.currentPath + '/Edit/' + row.id)
    },
    deleteData(row) {
      let vm = this
      deleteById(vm.currentPath, row.id).then(() => {
        vm.gettabeldata()
      })
    },
    closes() {
      this.editor = false
      this.addform = {
        BusinessPartyId: '',
        TenantIdName: '',
        BusinessType: '',
      }
    },
    clear() {
      this.search = {}
      this.page.pageIndex = 1
      console.log('清除重置')
    },
    query() {
      this.page.pageIndex = 1
      this.gettabeldata()
    },
    gettabeldata() {
      let vm = this
      vm.listLoading = true

      getDataList(vm.currentPath, vm.queryData).then((res) => {
        vm.listLoading = false
        vm.tabledata = res.data.data
        vm.page = res.data.pager
      })
    },
    currentchange(val) {
      this.page.pageIndex = val
      this.gettabeldata()
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.gettabeldata()
    },
  },
}
</script>
<style scoped>
.search {
  height: 60px;
  overflow: hidden;
  position: relative;
}

.search .left-search {
  line-height: 58px;
  height: 60px;
  float: left;
  padding: 0 10px;
}
.search .right-search {
  line-height: 58px;
  height: 60px;
  float: right;
  height: 100%;
  padding: 0 10px;
}
.table-container {
  max-height: calc(100vh - 177px);
  overflow-y: auto;
  margin-bottom: 12px;
  box-shadow: 1px 1px 4px rgb(0 21 41 / 8%);
}

.search .el-input,
.el-button,
.el-date-editor {
  margin-right: 2px;
}

.search .el-date-editor {
  width: 250px;
}

.el-table .el-button + .el-button {
  margin-left: 3px;
}
</style>
