<template>
  <div class="objform">
    <el-form
      label-position="right"
      label-width="120px"
      ref="form"
      :model="form"
    >
      <template v-for="(list, cate) in properties">
        <template v-if="list.length > 0">
          <div :key="cate">
            <label>
              <h2>{{ cate }}</h2>
            </label>
          </div>
          <template v-for="(item, k) in list">
            <el-form-item
              :key="k + cate"
              :label="item.DisplayName"
              :prop="item.Name"
            >
              <el-switch
                v-if="item.TypeStr == 'Boolean'"
                v-model="form[item.Name]"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="是"
                inactive-text="否"
              />

              <el-date-picker
                v-else-if="item.TypeStr == 'DateTime'"
                v-model="form[item.Name]"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
              />

              <el-input
                v-else
                v-model="form[item.Name]"
                type="text"
                size="medium"
              />
              <span>{{ item.Description }}</span>
            </el-form-item>
          </template>
        </template>
      </template>

      <el-form-item prop label-name>
        <dy-button @click.prevent="confirm">
          提交
        </dy-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getObject, updateObject } from '@/api/entity'

export default {
  props: ['path'],
  data() {
    return {
      form: {},
      properties: [],
    }
  },
  computed: {
    currentPath() {
      return this.path
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
      this.query()
    },
    query() {
      let vm = this
      getObject(vm.currentPath).then((res) => {
        vm.form = res.data.data.Value
        vm.properties = res.data.data.Properties
      })
    },
    confirm() {
      let vm = this

      updateObject(vm.currentPath, vm.form).then(() => {
        alert('保存成功')
      })
    },
  },
}
</script>

<style scoped>
.objform {
  height: calc(100vh - 125px);
  overflow: auto;
}

.objform h2 {
  margin: 35px 0;
}

.el-input,
.el-switch {
  width: 380px;
  margin-right: 15px;
}
</style>