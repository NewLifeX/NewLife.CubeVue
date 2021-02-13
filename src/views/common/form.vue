<template>
  <div>
    <div>{{ type }}</div>
    <dy-form ref="form" v-model="form">
      <template v-for="(item, k) in fields">
        <dy-form-item :key="k" :prop="item.key" :label-name="item.title">
          <dy-input v-model="form[item.key]" type="text" /> </dy-form-item
      ></template>

      <dy-form-item prop label-name>
        <dy-button @click.prevent="confirm">
          提交
        </dy-button>
      </dy-form-item>
    </dy-form>
  </div>
</template>

<script>
import { getData, add, edit } from '@/api/entity'

export default {
  data() {
    return {
      form: {},
      fields: [],
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
        let fields = []
        for (const key in res) {
          if (Object.hasOwnProperty.call(res, key)) {
            const e = res[key]
            let col = {
              key: e.Name,
              title: e.DisplayName,
            }
            fields.push(col)
          }
        }
        vm.fields = fields
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
          alert('新增成功')
        })
      } else {
        edit(vm.currentPath, vm.form).then(() => {
          alert('保存成功')
        })
      }
    },
  },
}
</script>

<style></style>
