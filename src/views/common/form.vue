<template>
  <div>
    <div>{{ title }}</div>
    <el-form
      ref="form"
      v-model="form"
      label-position="right"
      label-width="135px"
      :inline="true"
      class="form-container"
    >
      <template v-for="(column, k) in fields">
        <el-form-item
          v-if="column.name.toLowerCase() != 'id' && showInForm(column)"
          :key="k"
          :prop="column.isDataObjectField ? column.name : column.columnName"
          :label="(column.displayName || column.name) + '：'"
        >
          <template
            v-if="
              column.description && column.displayName != column.description
            "
            #label
          >
            <div style="display: inline-flex">
              <span>{{ column.displayName || column.name }}</span>
              <el-tooltip :content="column.description">
                <el-icon><InfoFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>

          <FormControl
            v-if="!isDetail"
            v-model="form"
            :configs="column"
          ></FormControl>
          <span style="width: 220px; word-break: break-all" v-else>{{
            form[column.name]
          }}</span>

          <!-- <el-date-picker
            v-else-if="column.dataType == 'DateTime'"
            v-model="form[column.name]"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择日期时间"
          /> -->

          <!-- <el-input
            v-else-if="column.dataType == 'String' && column.length > 50"
            v-model="form[column.name]"
            autosize
            type="textarea"
          /> -->

          <!-- <el-input
            v-else
            v-model="
              form[column.isDataObjectField ? column.name : column.columnName]
            "
            type="text"
          /> -->
        </el-form-item>
      </template>

      <el-form-item>
        <div
          style="
            position: fixed;
            margin: 20px;
            float: right;
            bottom: 0px;
            right: 0px;
            z-index: 1;
          "
        >
          <el-button @click="returnIndex">返回</el-button>
          <el-button v-if="!isDetail" type="primary" @click="confirm"
            >保存</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import FormControl from '@/components/FormControl.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    FormControl,
  },
  data() {
    return {
      form: {} as any,
      fields: [] as any,
      typeMap: { Add: '新增', Detail: '查看', Edit: '编辑' },
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    currentPath() {
      const vm = this as any;
      let rplStr = `/${vm.type}`;
      if (!vm.isAdd) {
        rplStr += `/${vm.id}`;
      }
      return this.$route.path.replace(rplStr, '');
    },
    type(): string {
      return this.$route.params.type.toString();
    },
    isAdd() {
      return (this as any).type === 'Add';
    },
    isDetail() {
      return (this as any).type === 'Detail';
    },
    isEdit() {
      return (this as any).type === 'Edit';
    },
    title() {
      return (this as any).typeMap[(this as any).type];
    },
  },
  // watch: {
  // 原本是通过路由变化初始化数据，但是切换页面时仍会触发
  //   $route: {
  //     handler: function() {
  //       this.init()
  //     },
  //     immediate: true
  //   }
  // },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getColumns();
      if (!this.isAdd) {
        this.query();
      }
    },
    getColumns() {
      // TODO 可改造成vue的属性，自动根据路由获取对应的列信息
      const vm = this;
      const path = vm.currentPath;

      vm.$api.base
        .getColumns(path, this.$route.params.type.toString())
        .then((res: any) => {
          vm.fields = res.data;
        });
    },
    query() {
      const vm = this;
      // if (vm.isDetail) {
      vm.$api.base.getDetailData(vm.currentPath, vm.id).then((res: any) => {
        vm.form = res.data;
      });
      // } else {
      //   vm.$api.base.getData(vm.currentPath, vm.id).then((res: any) => {
      //     vm.form = res.data;
      //   });
      // }
    },
    confirm() {
      const vm = this;
      if (vm.isAdd) {
        vm.$api.base.add(vm.currentPath, vm.form).then(() => {
          vm.$message({
            message: '新增成功',
            type: 'success',
            duration: 5 * 1000,
          });
          vm.$router.go(-1);
        });
      } else {
        vm.$api.base.edit(vm.currentPath, vm.form).then(() => {
          vm.$message({
            message: '保存成功',
            type: 'success',
            duration: 5 * 1000,
          });
          vm.$router.go(-1);
        });
      }
    },
    returnIndex() {
      this.$router.push(this.currentPath);
    },
    showInForm(col: any) {
      return true;
      const vm = this;
      if (vm.isAdd) {
        return col.showInAddForm;
      } else if (vm.isDetail) {
        return col.showInDetailForm;
      } else {
        return col.showInEditForm;
      }
    },
  },
});
</script>

<style scoped>
.form-container {
  margin-left: 50px;
  margin-bottom: 75px;
  max-height: -moz-calc(100vh - 160px);
  max-height: -webkit-calc(100vh - 160px);
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  box-shadow: 1px 1px 4px rgb(0 21 41 / 8%);
}
.el-switch,
.el-input,
.el-textarea {
  width: 220px;
}
</style>
