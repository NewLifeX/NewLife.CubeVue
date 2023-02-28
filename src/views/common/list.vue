<template>
  <div class="list-container">
    <AdvancedTable
      ref="advancedTable"
      :searchList="columns"
      :tableHandlerList="tableHandlerList"
      :columns="columns"
      :url="currentPath"
    ></AdvancedTable>
  </div>
</template>
<script lang="ts">
import AdvancedTable from '@/components/AdvancedTable.vue';
import { defineComponent } from 'vue';
const permissionFlags = {
  none: 0,
  detail: 1,
  insert: 2,
  update: 4,
  delete: 8,
};
export default defineComponent({
  name: 'List',
  components: {
    AdvancedTable,
  },
  data() {
    return {
      tableHandlerList: [
        {
          name: '新增',
          handler: 'add',
          type: 'primary',
          if: () => this.hasPermission(permissionFlags.insert),
        },
      ],
      tableData: [],
      tableHeight: '300px',
      queryParams: {
        Q: null,
        dateRange: null,
        dtStart: null,
        dtEnd: null,
      },
      page: {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 0,
        Q: undefined,
        desc: true,
        sort: undefined,
      },
      headerData: [],
      listLoading: false,
      permissionFlags,
      operatorList: [
        {
          name: '新增',
          action: 'add',
          type: 'primary',
        },
        {
          name: '导出',
          action: 'export',
          type: 'primary',
        },
      ],
      actionList: [
        {
          name: 'handler',
          displayName: '操作',
          width: '155px',
          showInList: true,
          handlerList: [
            {
              innerText: '查看',
              handler: 'detail',
              if: () =>
                !this.hasPermission(permissionFlags.update) &&
                this.hasPermission(permissionFlags.detail),
            },
            {
              innerText: '编辑',
              handler: 'editData',
              if: () => this.hasPermission(permissionFlags.update),
            },
            {
              innerText: '删除',
              type: 'danger',
              handler: 'deleteData',
              if: () => this.hasPermission(permissionFlags.delete),
            },
          ],
        },
      ],
    };
  },
  computed: {
    columns() {
      const vm = this as any;
      const columns = vm.headerData.concat(vm.actionList);
      columns.push({
        name: 'Q',
        displayName: '',
        showInSearch: true,
        options: {
          placeholder: '请输入关键字',
        },
      });
      return columns;
    },
    currentPath() {
      return this.$route.path;
    },
    advancedTable(): any {
      return this.$refs.advancedTable as any;
    },
    // 批量选中的数据
    batchList(): any {
      return this.advancedTable.selectList;
    },
    // queryData() {
    //   const vm = this;
    //   const dateRange = vm.queryParams.dateRange;
    //   if (dateRange) {
    //     vm.queryParams.dtStart = dateRange[0];
    //     vm.queryParams.dtEnd = dateRange[1];
    //   } else {
    //     vm.queryParams.dtStart = null;
    //     vm.queryParams.dtEnd = null;
    //   }

    //   const temp: any = {};
    //   // 查询参数也添加上
    //   Object.assign(temp, vm.page, vm.queryParams);
    //   temp.dateRange = undefined;
    //   return temp;
    // },
  },
  created() {
    this.init();
  },
  activated() {
    this.init();
  },
  methods: {
    init() {
      this.setQueryParams();
      this.getColumns();
    },
    setQueryParams() {
      // 设置查询参数
      const vm = this;
      for (const key in vm.$route.query) {
        if (Object.hasOwnProperty.call(vm.$route.query, key)) {
          (vm.queryParams as any)[key] = (vm.$route.query as any)[key];
        }
      }
    },
    // 获取表格数据
    getDataList() {
      this.advancedTable.getDataList();
    },
    getUrl(column: any, entity: any) {
      // 针对指定实体对象计算url，替换其中变量
      const reg = /{(\w+)}/g;
      return column.cellUrl.replace(reg, (a: any, b: any) => entity[b]);
    },
    getColumns() {
      // TODO 可改造成vue的属性，自动根据路由获取对应的列信息
      const vm = this;
      const path = vm.currentPath;

      vm.$api.base.getColumns(path).then((res) => {
        vm.headerData = res.data;
      });
    },
    add() {
      const vm = this;
      vm.$router.push(vm.currentPath + '/Add');
    },
    detail(scope: any) {
      const vm = this;
      vm.$router.push(vm.currentPath + '/Detail/' + scope.row.id);
    },
    editData(scope: any) {
      const vm = this;
      vm.$router.push(vm.currentPath + '/Edit/' + scope.row.id);
    },
    deleteData(scope: any) {
      const vm = this;
      vm.$api.base.deleteById(vm.currentPath, scope.row.id).then(() => {
        vm.getDataList();
      });
    },

    rowDblclick(row: any) {
      this.editData({ row });
    },
    // 判断操作id会否有权限
    hasPermission(actionId: any) {
      const vm = this;
      const menuId = vm.$route.meta.menuId;
      const permissions = vm.$route.meta.permissions;
      const has = (vm.$store.state as any).user.hasPermission(vm.$store, {
        menuId,
        actionId,
        permissions,
      });
      return has;
    },
    sortChange({ col, prop, order }: any) {
      if (order === 'ascending') {
        this.page.desc = false;
        this.page.sort = prop;
      } else if (order === 'descending') {
        this.page.desc = true;
        this.page.sort = prop;
      } else {
        this.page.desc = true;
        this.page.sort = undefined;
      }
      this.getDataList();
    },
    selectionChange() {
      console.log('selectionChange', arguments);
    },
  },
});
</script>
<style lang="scss" scoped>
.list-container {
  height: -moz-calc(100vh - 51px);
  height: -webkit-calc(100vh - 51px);
  height: calc(100vh - 51px);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 5px;
}
</style>
