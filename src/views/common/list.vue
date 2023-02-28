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
      tableData: [],
      searchList: [
        {
          itemType: 'datePicker',
          name: 'dtStart$dtEnd',
          displayName: '时间范围',
          showInSearch: true,
          options: { type: 'daterange', setDefaultValue: false },
        },
        {
          name: 'Q',
          displayName: '',
          showInSearch: true,
          options: {
            placeholder: '请输入关键字',
          },
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
      tableHandlerList: [
        {
          name: '新增',
          handler: 'add',
          type: 'primary',
          if: () => this.hasPermission(permissionFlags.insert),
        },
      ],
      headerData: [],
    };
  },
  computed: {
    columns() {
      const vm = this as any;
      const columns = vm.searchList.concat(vm.headerData.concat(vm.actionList));
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
    },
    // 获取表格数据
    getDataList() {
      this.advancedTable.getDataList();
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
