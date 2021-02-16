<template>
  <div>
    <div>{{ typeMap[type] }}</div>
    <el-form
      ref="form"
      v-model="form"
      label-position="right"
      label-width="120px"
      :inline="true"
      class="form-container"
    >
      <template v-for="(column, k) in fields">
        <el-form-item
          v-if="column.Name.toLowerCase() != 'id' && !column.IsCustom"
          :key="k"
          :prop="column.IsDataObjectField ? column.Name : column.ColumnName"
          :label="column.DisplayName || column.Name"
        >
          <el-switch
            v-if="column.TypeStr == 'Boolean'"
            v-model="form[column.Name]"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
          />

          <el-date-picker
            v-else-if="column.TypeStr == 'DateTime'"
            v-model="form[column.Name]"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          />

          <el-input
            v-else
            v-model="
              form[column.IsDataObjectField ? column.Name : column.ColumnName]
            "
            type="text"
          /> </el-form-item
      ></template>

      <el-form-item>
        <div
          style="position: fixed; margin:20px; float:right; bottom: 0px; right: 0px; z-index: 1;"
        >
          <el-button @click="returnIndex">取消</el-button>
          <el-button type="primary" @click="confirm">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getData, add, edit } from '@/api/entity'

export default {
  data() {
    return {
      form: {},
      fields: [],
      typeMap: { Add: '新增', Detail: '查看', Edit: '编辑' },
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    currentPath() {
      let vm = this
      let rplStr = `/${vm.type}${vm.id === undefined ? '' : '/' + vm.id}`
      return this.$route.path.replace(rplStr, '')
    },
    type() {
      return this.$route.params.type
    },
    getFieldType() {
      let vm = this
      return vm.isAdd
        ? 'getAddFormFields'
        : vm.isDetail
        ? 'getDetailFields'
        : 'getEditFormFields'
    },
    isAdd() {
      return this.type === 'Add'
    },
    isDetail() {
      return this.type === 'Detail'
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
      this.getFields()
      if (!this.isAdd) {
        this.query()
      }
    },
    getFields() {
      let vm = this
      vm.$store.dispatch(vm.getFieldType, vm.currentPath).then((res) => {
        vm.fields = res
      })
    },
    query() {
      let vm = this
      getData(vm.currentPath, vm.id).then((res) => {
        vm.form = res.data.data
      })
    },
    confirm() {
      let vm = this
      if (vm.isAdd) {
        add(vm.currentPath, vm.form).then(() => {
          vm.$message({
            message: '新增成功',
            type: 'success',
            duration: 5 * 1000,
          })
        })
      } else {
        edit(vm.currentPath, vm.form).then(() => {
          vm.$message({
            message: '保存成功',
            type: 'success',
            duration: 5 * 1000,
          })
        })
      }
    },
    returnIndex() {
      this.$router.push(this.currentPath)
    },
  },
}
</script>

<style scoped>
.form-container {
  margin-left: 50px;
  margin-bottom: 75px;
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  box-shadow: 1px 1px 4px rgb(0 21 41 / 8%);
}
.el-switch,
.el-input {
  width: 220px;
}
</style>
