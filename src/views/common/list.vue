<template>
  <div class="list-container">
    <el-row type="flex" class="search" justify="end">
      <el-col
        :span="4"
        class="left-search"
        v-if="hasPermission(permissionFlags.insert)"
      >
        <el-button type="primary" @click="add">
          新增
        </el-button>
      </el-col>
      <el-col :span="20" class="right-search">
        <el-form
          ref="form"
          v-model="queryParams"
          label-position="right"
          :inline="true"
          class="search-form-container"
        >
          <template v-for="(column, k) in headerData">
            <el-form-item
              v-if="column.showInSearch"
              :key="k"
              :prop="column.isDataObjectField ? column.name : column.columnName"
              :label="column.displayName || column.name"
            >
              <single-select
                v-if="column.itemType == 'singleSelect' && column.dataSource"
                v-model="
                  queryParams[
                    column.isDataObjectField ? column.name : column.columnName
                  ]
                "
                :url="column.dataSource"
              >
              </single-select>

              <multiple-select
                v-else-if="
                  column.itemType == 'multipleSelect' && column.dataSource
                "
                v-model="
                  queryParams[
                    column.isDataObjectField ? column.name : column.columnName
                  ]
                "
                :url="column.dataSource"
              >
              </multiple-select>

              <el-switch
                v-else-if="column.dataType == 'Boolean'"
                v-model="
                  queryParams[
                    column.isDataObjectField ? column.name : column.columnName
                  ]
                "
                active-color="#13ce66"
                inactive-color="#ff4949"
              />

              <el-input
                v-else
                v-model="
                  queryParams[
                    column.isDataObjectField ? column.name : column.columnName
                  ]
                "
                type="text"
              />
            </el-form-item>
          </template>
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
            v-model="queryParams.Q"
            placeholder="关键字"
          ></el-input>
          <el-button type="primary" @click="getTabelData">
            查询
          </el-button>
        </el-form>
      </el-col>
    </el-row>
    <div class="table-container">
      <el-table
        :height="tableHeight"
        v-loading="listLoading"
        :data="tableData"
        stripe
        border
        @sort-change="sortChange"
        @row-dblclick="rowDblclick"
      >
        <el-table-column align="center" label="序号" type="index" width="50" />
        <template v-for="(column, idx) in headerData">
          <el-table-column
            v-if="column.showInList"
            :key="idx"
            :label="column.displayName"
            :prop="column.name"
            :sortable="true"
            :show-overflow-tooltip="true"
            :width="column.width"
            align="center"
          >
            <template slot-scope="scope">
              <template v-if="column.dataType === 'Boolean'">
                <el-switch
                  :value="scope.row[column.name]"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                />
              </template>
              <template v-else-if="!column.isDataObjectField && column.cellUrl">
                <a :href="getUrl(column, scope.row)">{{
                  column.displayName
                }}</a>
              </template>
              <div v-else>{{ scope.row[column.name] }}</div>
            </template>
          </el-table-column>
        </template>

        <el-table-column
          label="操作"
          align="center"
          width="140"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button
              v-if="
                !hasPermission(permissionFlags.update) &&
                  hasPermission(permissionFlags.detail)
              "
              type="primary"
              size="mini"
              @click="detail(scope.row)"
              >查看</el-button
            >
            <el-button
              v-if="hasPermission(permissionFlags.update)"
              type="primary"
              size="mini"
              @click="editData(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="hasPermission(permissionFlags.delete)"
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
        @current-change="currentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import singleSelect from '../../components/singleSelect'
import multipleSelect from '../../components/multipleSelect'
export default {
  name: 'list',
  components: {
    singleSelect,
    multipleSelect,
  },
  data() {
    return {
      tableData: [],
      tableHeight: '300px',
      queryParams: {
        Q: null,
        dateRange: null,
      },
      page: {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 0,
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
      permissionFlags: {
        none: 0,
        detail: 1,
        insert: 2,
        update: 4,
        delete: 8,
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
      // 查询参数也添加上
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
      this.setQueryParams()
      this.getColumns()
      this.query()
    },
    setQueryParams() {
      // 设置查询参数
      let vm = this
      for (const key in vm.$route.query) {
        if (Object.hasOwnProperty.call(vm.$route.query, key)) {
          const element = vm.$route.query[key]
          vm.$set(vm.queryParams, key, element)
        }
      }
    },
    getUrl(column, entity) {
      // 针对指定实体对象计算url，替换其中变量
      const reg = /{(\w+)}/g
      return column.cellUrl.replace(reg, (a, b) => entity[b])
    },
    getColumns() {
      // TODO 可改造成vue的属性，自动根据路由获取对应的列信息
      let vm = this
      let path = vm.currentPath
      vm.$store.getters.apis.getColumns(path).then((res) => {
        vm.headerData = res.data.data
      })
    },
    getListFields() {
      let vm = this
      let path = vm.currentPath
      let key = path + '-list'
      let fields = vm.$store.state.entity.listFields[key]
      if (fields) {
        vm.headerData = fields
        return
      }

      // 没有获取过字信息，请求回来后保存一份
      vm.$store.getters.apis.getListFields(path).then((res) => {
        fields = res.data.data
        vm.headerData = fields

        vm.$store.dispatch('setListFields', { key, fields })
      })
    },
    add() {
      let vm = this
      vm.$router.push(vm.currentPath + '/Add')
    },
    detail(row) {
      let vm = this
      vm.$router.push(vm.currentPath + '/Detail/' + row.id)
    },
    editData(row) {
      let vm = this
      vm.$router.push(vm.currentPath + '/Edit/' + row.id)
    },
    deleteData(row) {
      let vm = this
      vm.$store.getters.apis.deleteById(vm.currentPath, row.id).then(() => {
        vm.getTabelData()
      })
    },
    query() {
      this.page.pageIndex = 1
      this.getTabelData()
    },
    getTabelData() {
      let vm = this
      vm.listLoading = true

      vm.$store.getters.apis
        .getDataList(vm.currentPath, vm.queryData)
        .then((res) => {
          vm.listLoading = false
          vm.tableData = res.data.data
          vm.page = res.data.pager
          vm.setTableHeight(vm.tableData.length)
        })
    },
    currentChange(val) {
      this.page.pageIndex = val
      this.getTabelData()
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getTabelData()
    },
    sortChange({ column, prop, order }) {
      if (order === 'ascending') {
        this.page.desc = false
        this.page.sort = prop
      } else if (order === 'descending') {
        this.page.desc = true
        this.page.sort = prop
      } else {
        this.page.desc = undefined
        this.page.sort = undefined
      }
      this.getTabelData()
    },
    rowDblclick(row) {
      this.editData(row)
    },
    hasPermission(actionId) {
      let vm = this
      let menuId = vm.$route.meta.menuId
      let permissions = vm.$route.meta.permissions
      let has = vm.$store.state.user.hasPermission(vm.$store, {
        menuId,
        actionId,
        permissions,
      })
      return has
    },
    setTableHeight(count) {
      // 根据数据条数设置表格高度，最高设置708px，一页最多显示20条
      let vm = this
      // console.log(count)
      if (count && count > 0) {
        if (count > 20) count = 20
        else if (count < 8) count = 9
        setTimeout(() => {
          vm.tableHeight = count * 35.9 + 'px'
        }, 500)
      }
    },
  },
}
</script>
<style scoped>
.list-container {
  height: -moz-calc(100vh - 51px);
  height: -webkit-calc(100vh - 51px);
  height: calc(100vh - 51px);
  overflow-x: hidden;
  overflow-y: auto;
}

.search {
  /* height: 60px; */
  /* overflow: hidden; */
  /* position: relative; */
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;
}

.search .left-search {
  line-height: 58px;
  /* height: 60px; */
  /* float: left; */
  padding: 0 10px;
}
.search .right-search {
  line-height: 58px;
  /* height: 65px; */
  /* float: right; */
  /* max-height: 110px; */
  padding: 0 10px;
  /* overflow-y: auto; */
}
.table-container {
  /* max-height: calc(100vh - 177px); */
  /* overflow-y: auto; */
  height: auto;
  margin-bottom: 2px;
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

/** 操作按钮 */
.el-table .el-button + .el-button {
  margin-left: 3px;
}
</style>
<style>
.search-form-container .el-form-item__content {
  line-height: 60px;
}

.search-form-container .el-form-item {
  margin-bottom: 0;
}

/** 表头、行上下间距 */
.table-container .el-table td,
.table-container .el-table th {
  padding: 2px 0 2px 0;
}

/** 表头、行上下间距 */
.table-container .cell {
  padding: 0 1px 0 1px;
}
</style>
