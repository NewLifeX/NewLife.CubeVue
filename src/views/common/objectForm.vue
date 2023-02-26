<template>
  <div class="objform">
    <el-form
      label-position="right"
      label-width="120px"
      ref="form"
      :model="form"
    >
      <template v-for="(list, cate) in properties">
        <div v-if="list.length > 0" :key="cate">
          <div :key="cate">
            <label>
              <h2>{{ cate }}</h2>
            </label>
          </div>
          <el-form-item
            v-for="(item, k) in list"
            :key="k + cate"
            :label="item.displayName"
            :prop="item.name"
          >
            <el-switch
              v-if="item.typeStr == 'Boolean'"
              v-model="form[item.name]"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />

            <el-date-picker
              v-else-if="item.typeStr == 'DateTime'"
              v-model="form[item.name]"
              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
            />

            <el-input
              v-else
              v-model="form[item.name]"
              type="text"
              size="medium"
            />
            <span>{{ item.description }}</span>
          </el-form-item>
        </div>
      </template>

      <el-form-item prop label-name>
        <div
          style="position: fixed; margin: 30px; float:right; bottom: 0px; right: 0px; z-index: 1;"
        >
          <el-button type="primary" @click="confirm">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: ['path'],
  data() {
    return {
      form: {} as any,
      properties: [] as any
    }
  },
  computed: {
    currentPath() {
      return this.path
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.init()
      },
      immediate: true
    }
  },
  methods: {
    init() {
      this.query()
    },
    query() {
      let vm = this
      vm.$api.config.getObject(vm.currentPath).then((res) => {
        vm.form = res.data.value
        vm.properties = res.data.properties
      })
    },
    confirm() {
      let vm = this
      vm.$api.config.updateObject(vm.currentPath, vm.form).then(() => {
        let msg = '保存成功'

        if (!vm.form.enableNewUI) {
          msg += '，正在跳转页面'
        }

        vm.$message({
          message: msg,
          type: 'success',
          duration: 3 * 1000
        })

        if (!vm.form.enableNewUI) {
          location.href = '/'
        }
      })
    }
  }
})
</script>

<style scoped>
.objform {
  max-height: -moz-calc(100vh - 200px);
  max-height: -webkit-calc(100vh - 200px);
  max-height: calc(100vh - 200px);
  overflow: auto;
  box-shadow: 1px 1px 4px rgb(0 21 41 / 8%);
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
