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
          <el-table-column label="编号" type="index" />
          <template v-for="(column, idx) in headerData">
            <el-table-column
              v-if="column.Length <= 50 && column.Name.toLowerCase() != 'id'"
              :key="idx"
              :label="column.DisplayName"
              :prop="column.Name"
            >
              <template slot-scope="scope">
                <template v-if="column.TypeStr == 'Boolean'">
                  <el-switch
                    :value="scope.row[column.Name]"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  />
                </template>
                <div v-else>{{ scope.row[column.Name] }}</div>
              </template>
            </el-table-column>
          </template>

          <el-table-column
            label="操作"
            align="center"
            width="150"
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
          :current-page="page.PageIndex"
          :page-size="page.PageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="page.TotalCount"
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
        // let fields = [
        //   // {
        //   //   title: '操作',
        //   //   render: (h, row) =>
        //   //     h('div', [
        //   //       h(
        //   //         'dy-button',
        //   //         {
        //   //           props: { type: 'text' },
        //   //           on: {
        //   //             click: () => {
        //   //               vm.edit(row)
        //   //             },
        //   //           },
        //   //         },
        //   //         '编辑'
        //   //       ),
        //   //       h(
        //   //         'dy-button',
        //   //         {
        //   //           props: { type: 'error' },
        //   //           on: {
        //   //             click: () => {
        //   //               vm.delete(row)
        //   //             },
        //   //           },
        //   //         },
        //   //         '删除'
        //   //       ),
        //   //     ]),
        //   // },
        // ]
        // for (const key in res) {
        //   if (Object.hasOwnProperty.call(res, key)) {
        //     const e = res[key]
        //     let col = {
        //       key: e.Name,
        //       title: e.DisplayName,
        //     }
        //     fields.push(col)
        //   }
        // }
        vm.headerData = res
      })
    },
    add() {
      let vm = this
      vm.$router.push(vm.currentPath + '/Add')
    },
    editData(row) {
      let vm = this
      vm.$router.push(vm.currentPath + '/Edit/' + row.ID)
    },
    deleteData(row) {
      let vm = this
      deleteById(vm.currentPath, row.ID).then(() => {
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
      this.page.PageIndex = 1
      console.log('清除重置')
    },
    query() {
      this.page.PageIndex = 1
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
      this.page.PageIndex = val
      this.gettabeldata()
    },
    handleSizeChange(val) {
      this.page.PageSize = val
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
</style>
