<template>
  <div class="list-container">
    <!-- 搜索组件 -->
    <TableSearch
      v-model="queryParams"
      :columns="columns"
      @operator="operator"
    ></TableSearch>

    <!-- 操作栏 -->
    <TableOperator
      :columns="columns"
      :operatorList="operatorList"
      @operator="operator"
    ></TableOperator>

    <NormalTable
      :columns="columns"
      :permissionFlags="permissionFlags"
      :tableData="tableData"
      @operator="operator"
      @selection-change="selectionChange"
      @sort-change="sortChange"
    ></NormalTable>

    <!-- 分页 -->
    <div>
      <el-pagination
        :current-page="page.pageIndex"
        :page-size="page.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="page.totalCount"
        @current-change="currentChange"
        @size-change="handleSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'List',
  data() {
    const permissionFlags = {
      none: 0,
      detail: 1,
      insert: 2,
      update: 4,
      delete: 8
    }

    return {
      tableData: [],
      tableHeight: '300px',
      queryParams: {
        Q: null,
        dateRange: null,
        dtStart: null,
        dtEnd: null
      },
      page: {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 0,
        Q: undefined,
        desc: true,
        sort: undefined
      },
      headerData: [],
      listLoading: false,
      permissionFlags,
      operatorList: [
        {
          name: '新增',
          action: 'add',
          type: 'primary'
        },
        {
          name: '导出',
          action: 'export',
          type: 'primary'
        }
      ],
      actionList: [
        {
          name: 'actionList',
          displayName: '操作',
          width: '125px',
          showInList: true,
          actionList: [
            //             {
            //   action: 'detail',
            //   permission: permissionFlags.detail,
            //   text: '查看',
            //   type:'primary'
            // },
            {
              action: 'editData',
              permission: permissionFlags.update,
              text: '编辑',
              type: 'primary'
            },
            {
              action: 'deleteData',
              permission: permissionFlags.delete,
              text: '删除',
              type: 'danger'
            }
          ]
        }
      ]
    }
  },
  // provide() {
  //   let vm = this
  //   return {
  //     permissionFlags: vm.permissionFlags
  //   }
  // },
  computed: {
    columns() {
      const vm = this as any
      return vm.headerData.concat(vm.actionList)
    },
    currentPath() {
      return this.$route.path
    },
    queryData() {
      const vm = this
      const dateRange = vm.queryParams.dateRange
      if (dateRange) {
        vm.queryParams.dtStart = dateRange[0]
        vm.queryParams.dtEnd = dateRange[1]
      } else {
        vm.queryParams.dtStart = null
        vm.queryParams.dtEnd = null
      }

      const temp: any = {}
      // 查询参数也添加上
      Object.assign(temp, vm.page, vm.queryParams)
      temp.dateRange = undefined
      return temp
    }
  },
  // watch: {
  //   $route: {
  //     handler: function() {
  //       this.init()
  //     },
  //     immediate: true
  //   }
  // },
  created() {
    this.init()
  },
  activated() {
    this.init()
  },
  methods: {
    init() {
      this.setQueryParams()
      this.getColumns()
      this.query()
    },
    setQueryParams() {
      // 设置查询参数
      const vm = this
      for (const key in vm.$route.query) {
        if (Object.hasOwnProperty.call(vm.$route.query, key)) {
          ;(vm.queryParams as any)[key] = (vm.$route.query as any)[key]
        }
      }
    },
    getUrl(column: any, entity: any) {
      // 针对指定实体对象计算url，替换其中变量
      const reg = /{(\w+)}/g
      return column.cellUrl.replace(reg, (a: any, b: any) => entity[b])
    },
    getColumns() {
      // TODO 可改造成vue的属性，自动根据路由获取对应的列信息
      const vm = this
      const path = vm.currentPath

      vm.$api.base.getColumns(path).then((res) => {
        vm.headerData = res.data.data
      })
    },
    add() {
      const vm = this
      vm.$router.push(vm.currentPath + '/Add')
    },
    detail(row: any) {
      const vm = this
      vm.$router.push(vm.currentPath + '/Detail/' + row.id)
    },
    editData(row: any) {
      const vm = this
      vm.$router.push(vm.currentPath + '/Edit/' + row.id)
    },
    deleteData(row: any) {
      const vm = this
      vm.$api.base.deleteById(vm.currentPath, row.id).then(() => {
        vm.getTableData()
      })
    },
    query() {
      this.page.pageIndex = 1
      this.getTableData()
    },
    getTableData() {
      const vm = this
      vm.listLoading = true

      vm.$api.base
        .getDataList(vm.currentPath, vm.queryData)
        .then((res: any) => {
          vm.listLoading = false
          vm.tableData = res.data.data
          vm.page = res.data.pager
          vm.page.Q = undefined
        })
    },
    currentChange(val: any) {
      this.page.pageIndex = val
      this.getTableData()
    },
    handleSizeChange(val: any) {
      this.page.pageSize = val
      this.getTableData()
    },
    rowDblclick(row: any) {
      this.editData(row)
    },
    // 判断操作id会否有权限
    hasPermission(actionId: any) {
      const vm = this
      const menuId = vm.$route.meta.menuId
      const permissions = vm.$route.meta.permissions
      const has = (vm.$store.state as any).user.hasPermission(vm.$store, {
        menuId,
        actionId,
        permissions
      })
      return has
    },
    // 重置搜索条件
    resetSearch() {
      const vm = this
      vm.queryParams = {} as any
      vm.query()
    },
    // 子组件调用此方法，再通过参数action调用本组件方法
    operator(option: any, data: any, callback: any) {
      let vm = this as any
      let action = option.action
      let func = vm[action]
      if (!func || typeof func !== 'function') {
        const msg = `未实现的方法：${action}`
        console.error(msg)
        vm.$message.error(msg)
      } else {
        const returnData = (func as Function).call(vm, data)
        if (typeof callback === 'function') {
          callback(returnData)
        }
      }
    },
    sortChange({ col, prop, order }: any) {
      if (order === 'ascending') {
        this.page.desc = false
        this.page.sort = prop
      } else if (order === 'descending') {
        this.page.desc = true
        this.page.sort = prop
      } else {
        this.page.desc = true
        this.page.sort = undefined
      }
      this.getTableData()
    },
    selectionChange() {
      console.log('selectionChange', arguments)
    }
  }
})
</script>
<style lang="scss" scoped>
.list-container {
  height: -moz-calc(100vh - 51px);
  height: -webkit-calc(100vh - 51px);
  height: calc(100vh - 51px);
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
