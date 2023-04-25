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
  props: {
    // 搜索字段配置
    tableSearchConfig: {
      type: Array,
      default: () => [],
      // default: () => [
      //   {
      //     itemType: 'datePicker',
      //     name: 'dtStart$dtEnd',
      //     displayName: '时间范围',
      //     showInSearch: true,
      //     options: { type: 'daterange', setDefaultValue: false },
      //   },
      //   {
      //     name: 'Q',
      //     displayName: '',
      //     showInSearch: true,
      //     options: {
      //       placeholder: '请输入关键字',
      //     },
      //   },
      // ],
    },
    // 表格操作按钮配置
    tableHandlerConfig: {
      type: Array,
      default: () => [],
    },
    // 列表字段配置
    tableColumnConfig: {
      type: Array,
      default: () => [],
    },
    // 列表操作按钮配置
    tableActionConfig: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableData: [],
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
      headerData: [],
      searchData: [],
    };
  },
  computed: {
    tableHandlerList() {
      const vm = this;
      if (vm.tableHandlerConfig.length < 1) {
        return [
          {
            name: '新增',
            handler: 'add',
            type: 'primary',
            if: () => this.hasPermission(permissionFlags.insert),
          },
        ];
      } else {
        return vm.tableHandlerConfig.map((handler: any) => {
          const ifFn2 = handler.if;
          if (typeof ifFn2 === 'function') {
            handler.if = (row: any) => ifFn2(vm, row);
          }

          return handler;
        });
      }
    },
    columns() {
      const vm = this as any;

      // 如果有传入列信息，则使用传入的列信息，否则请求接口使用headerData
      let tableColumnConfig = vm.tableColumnConfig;
      let actionList = vm.tableActionConfig;

      if (tableColumnConfig.length === 0) {
        tableColumnConfig = vm.headerData;
      }

      if (actionList.length === 0) {
        actionList = vm.actionList;
      }

      let tableSearchConfig = vm.tableSearchConfig;

      if (tableSearchConfig.length === 0) {
        tableSearchConfig = vm.searchData;
      }

      const columns = tableSearchConfig.concat(
        tableColumnConfig.concat(actionList),
      );

      // 处理if条件，this当前页面实例
      for (const column of columns) {
        const ifFn = column.if;

        if (typeof ifFn === 'function') {
          column.if = (row: any) => ifFn(vm, row);
        }

        if (column.handlerList && column.handlerList.length > 0) {
          column.handlerList = column.handlerList.map((handler: any) => {
            const ifFn2 = handler.if;
            if (typeof ifFn2 === 'function') {
              handler.if = (row: any) => ifFn2(vm, row);
            }

            return handler;
          });
        }
      }

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
  },
  created() {
    this.init();
  },
  activated() {
    this.init();
  },
  methods: {
    init() {
      this.getColumns();
      this.getSearchFields();
    },
    // 获取表格数据
    getDataList() {
      this.advancedTable.getDataList();
    },
    getColumns() {
      // TODO 可改造成vue的属性，自动根据路由获取对应的列信息
      const vm = this;

      if (vm.tableColumnConfig.length > 0) {
        return;
      }

      const path = vm.currentPath;

      vm.$api.base.getColumns(path, 'List').then((res) => {
        for (const item of res.data) {
          item.showInList = true;
        }
        vm.headerData = res.data;
      });
    },
    getSearchFields(){
      const vm = this;

      if (vm.tableSearchConfig.length > 0) {
        return;
      }

      const path = vm.currentPath;

      vm.$api.base.getColumns(path, 'Search').then((res) => {
        for (const item of res.data) {
          item.showInSearch = true;
        }
        vm.searchData = res.data;
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
  },
});
</script>
<style lang="scss" scoped>
.list-container {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 5px;
  background-color: #fff;
}
</style>
