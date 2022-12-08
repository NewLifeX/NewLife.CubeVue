<template>
  <el-select-v2
    v-if="configs.itemType === 'select'"
    v-model="model"
    size="default"
    :style="{ width: configs.width ? configs.width : '220px' }"
    :placeholder="options.placeholder || '请选择' + configs.displayName"
    :remote="options.remote === 'true'"
    :remote-method="getRemoteData"
    :allow-create="options.allowCreate === 'true'"
    :multiple="options.multiple === 'true'"
    :options="selectOptions"
    filterable
    clearable
    v-bind="$attrs"
  >
    <!-- <el-option
      v-for="(item, idx) in dataList"
      :key="idx"
      :label="item[options.labelField || 'label']"
      :value="getValueByDataType(item, options)"
    ></el-option> -->
  </el-select-v2>

  <template v-else-if="configs.itemType === 'radio'">
    <div :style="{ width: configs.width ? configs.width : '220px' }">
      <el-radio
        v-if="valueValidate(options.value1)"
        v-model="model"
        :label="
          typeof model === 'number' ? parseInt(options.value1) : options.value1
        "
        v-bind="$attrs"
      >
        {{ options.label1 }}
      </el-radio>
      <el-radio
        v-if="valueValidate(options.value2)"
        v-model="model"
        :label="
          typeof model === 'number' ? parseInt(options.value2) : options.value2
        "
        v-bind="$attrs"
      >
        {{ options.label2 }}
      </el-radio>
    </div>
  </template>

  <div
    v-else-if="configs.itemType === 'checkbox'"
    :style="{ width: configs.width ? configs.width : '220px' }"
  >
    <el-checkbox-group v-model="model" v-bind="$attrs">
      <el-checkbox
        v-for="item in dataList"
        :label="getValueByDataType(item, options)"
      >
        {{ item[options.labelField || 'label'] }}
      </el-checkbox>
    </el-checkbox-group>
  </div>

  <!-- 日期时间选择器 -->
  <el-date-picker
    v-else-if="configs.itemType === 'datePicker'"
    v-model="model"
    :style="{ width: configs.width ? configs.width : '220px' }"
    size="default"
    class="date-time-picker"
    :type="options.type"
    format="YYYY-MM-DD"
    value-format="YYYY-MM-DD"
    range-separator="至"
    :start-placeholder="'开始时间'"
    :end-placeholder="'结束时间'"
    :shortcuts="shortcuts"
    v-bind="$attrs"
  ></el-date-picker>

  <!-- input 标签 ，默认-->
  <el-input
    v-else
    size="default"
    :style="{ width: configs.width ? configs.width : '220px' }"
    :prefix-icon="options.icon"
    :placeholder="options.placeholder || '请输入' + configs.displayName"
    v-model="model"
    clearable
    :rows="4"
    :type="options.type || 'text'"
    :disabled="options.disabled === 'true' ? true : false"
    v-bind="$attrs"
  ></el-input>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'FormControl',
  props: {
    // modelValue: [String, Number, Object, Boolean, Array],
    modelValue: [Object],
    // 字段配置
    configs: {
      type: Object,
      default: {}
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      model: undefined as any,
      shortcuts: [
        {
          text: '昨天',
          value() {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
            end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
            return [start, end]
          }
        },
        {
          text: '今天',
          value() {
            const end = new Date()
            const start = new Date()
            return [start, end]
          }
        },
        {
          text: '最近一周',
          value() {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          }
        },
        {
          text: '最近一个月',
          value() {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          }
        }
      ],
      // 选项列表
      dataList: [] as any
    }
  },
  computed: {
    // ui组件的配置
    options(): any {
      let vm = this
      let obj = {} as any
      let configs = vm.configs

      if (!configs.options) {
        return obj
      }

      let searchParams = new URLSearchParams(configs.options) as any
      for (const item of searchParams) {
        let val = item[1] as any
        // if (val.startsWith('{') || val.startsWith('[]')) {
        //   val = JSON.parse(val)
        // }

        // 不转类型。直接判断字符串的值，可以优化为。无值的时候赋值false
        // if (val === 'true') {
        //   val = true
        // } else if (val === 'false') {
        //   val = false
        // }
        obj[item[0]] = val
      }
      // console.log('options', obj)
      return obj
    },
    name() {
      return this.configs.name
    },
    selectOptions() {
      return this.dataList.map(
        (x: any) =>
          new Object({
            label: x[this.options.labelField || 'label'],
            // 如果是多选，由于数组转逗号隔开的字符串，再转成数组，值就变成字符串，因此统一处理为字符串
            value:
              this.options.multiple === 'true'
                ? this.getValueByDataType(x, this.options) + ''
                : this.getValueByDataType(x, this.options)
          })
      )
    }
  },
  watch: {
    model(val, oldVal) {
      let name = this.name
      let configs = this.configs
      let options = this.options

      // 字段名包含$，特殊处理
      let temp = this.modelValue as any
      if (name.includes('$')) {
        let arr = val // temp[name]
        let names = name.split('$')

        if (
          configs.itemType === 'datePicker' &&
          configs.options &&
          configs.options.includes('type=daterange')
        ) {
          // 日期范围

          if (this.valueValidate(arr)) {
            temp[names[0]] = arr[0]
            temp[names[1]] = arr[1]
          } else {
            temp[names[0]] = undefined
            temp[names[1]] = undefined
          }
        } else if (configs.itemType === 'checkbox') {
          // 多选框
          if (this.valueValidate(arr)) {
            temp[names[0]] = arr.join()
          } else {
            temp[names[0]] = undefined
          }
        } else if (
          configs.itemType === 'select' &&
          options.multiple === 'true'
        ) {
          // 多选下拉
          if (this.valueValidate(arr)) {
            temp[names[0]] = arr.join()
          } else {
            temp[names[0]] = undefined
          }
        } else {
          console.warn('表单名中带$，但是未配置处理器')
        }
      } else {
        if (configs.itemType === 'select' && !this.valueValidate(val)) {
          // 下拉框上点击清除时，值为空字符串，处理为undefined
          val = undefined
        }

        temp[name] = val
      }

      // 因为是对象引用，单属性值变化，可以不触发更新
      // this.$emit('update:modelValue', this.modelValue)
    },
    // 外部修改此值，以便传递到model
    modelValue: {
      handler(val: any, oldVal) {
        let name = this.name
        let value = val[this.name]
        let configs = this.configs
        let options = this.options

        // 字段名包含$，特殊处理
        if (name.includes('$')) {
          let names = name.split('$')
          if (
            configs.itemType === 'datePicker' &&
            configs.options &&
            configs.options.includes('type=daterange')
          ) {
            // 特殊处理日期范围选择，日期范围传进来的应是个数组
            // 取完值后置空，model的watch事件会为modelValue增加两个字段，即$分割的两个字段
            // TODO 这里可增加一个处理，从被分割的两个字段中拿值
            if (this.valueValidate(value)) {
              this.model = [value[0], value[1]]
              ;(this.modelValue as any)[name] = undefined
            } else {
              // 如果分割后的两个字段不为空，就不用重置值。因为有可能传进来的值为空是上面的if设置导致
              if (
                !(this.modelValue as any)[names[0]] ||
                !(this.modelValue as any)[names[1]]
              ) {
                this.model = undefined
              }
            }
          } else if (configs.itemType === 'checkbox') {
            // 外部传进来的应是逗号隔开的值，传值的字段从name中分离出，然后在这里被序列化成数组
            // value 重新取值
            value = val[names[0]]
            if (this.valueValidate(value)) {
              let arr = value.split(',')
              this.model = arr
            } else {
              this.model = undefined
            }
          } else if (
            configs.itemType === 'select' &&
            options.multiple === 'true'
          ) {
            // 外部传进来的应是逗号隔开的值，传值的字段从name中分离出，然后在这里被序列化成数组
            // value 重新取值
            value = val[names[0]]
            if (this.valueValidate(value)) {
              let arr = value.split(',')
              this.model = arr
            } else {
              this.model = []
            }
          }
        } else {
          if (configs.itemType === 'select' && options.multiple === 'true') {
            this.model = value || []
          } else { this.model = value }
        }
      },
      // 加了此选项，就不用再created赋值
      immediate: true,
      deep: true
    },
    'configs.url': {
      handler() {
        this.getData()
      }
    },
    // 获取远程数据的参数
    'configs.data': {
      handler() {
        this.getData()
      },
      deep: true
    }
    // !!! 不能监听，外部如果共用configs，那么所有用了该configs的组件都会受影响
    // 'configs.dataList': {
    //   handler() {
    //     this.dataList = this.configs.dataList
    //   },
    //   deep: true
    // }
  },
  created() {
    let vm = this

    // 远程或本地数据源处理
    vm.getData()
  },
  methods: {
    // 设置请求参数，configs.data。对options.data进行处理，如果值有{{field}}形式的值，则替换成为model中的值
    setData() {
      if (!this.options.data) { return }
      let data = JSON.parse(this.options.data)

      if (!this.configs.data) {
        this.configs.data = {}
      }

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const val = data[key]

          if (
            typeof val === 'string' &&
            val.startsWith('{{') &&
            val.endsWith('}}')
          ) {
            if (this.modelValue) {
              this.configs.data[key] =
                this.modelValue[val.substring(2, val.length - 2)]
            }
          } else {
            this.configs.data[key] = val
          }
        }
      }
    },
    // 类似多选下拉的组件，设置默认值
    setDefaultValue() {
      let vm = this
      let options = vm.options
      let row = vm.modelValue as any
      if (vm.dataList) {
        // 不设置该选项，直接返回
        if (!options.getValueField || !options.getLabelField) {
          return
        }

        let val = row[options.getValueField]
        // 如果值为空，说明是新增，还没有默认值
        if (!val) { return }

        let data = {
          [options.labelField]: row[options.getLabelField] || val,
          [options.valueField]: val
        }

        vm.dataList.push(data)
      }
    },
    getData() {
      let vm = this
      let url = vm.configs.url
      if (!url) {
        return
      }

      // 远程下拉框，直接返回
      if (vm.options.remote === 'true') {
        // 设置默认选项
        this.setDefaultValue()
        return
      }

      // 如果本身就是数组
      if (typeof url === 'object' && url.length > 0) {
        vm.dataList = url
        return
      }

      // 如果是[开头，说明数据是数组
      if (typeof url !== 'string') {
        console.warn('配置中url不正确，不进行处理', url)
        return
      }

      if (url.startsWith('[')) {
        // 直接解析url中数据
        vm.getLocalData()
      } else if (url.startsWith('/') || url.startsWith('http')) {
        // 请求url获取数据
        vm.getRemoteData()
      } else {
        console.warn('配置中url不正确，不进行处理', url)
      }
    },
    // 获取远程数据
    getRemoteData(query = '') {
      let vm = this
      let url = vm.configs.url
      let method = vm.options.method || 'post'
      let data =
        method === 'post'
          ? {
              txtKeywords: query
            }
          : undefined

      // 设置data，处理插值
      this.setData()

      if (vm.configs.data) {
        data = { ...data, ...vm.configs.data }
      }

      let config = {
        url,
        method,
        data
      }

      vm.$http(config).then((resp) => {
        const array = resp.data
        vm.dataList = array.rows || array.list || array
      })
    },
    // 解析url中的数据
    getLocalData() {
      const vm = this
      const data = JSON.parse(vm.configs.url)
      vm.dataList = data
    },
    getValueByDataType(data: any, option: any) {
      let val = data[option.valueField || 'value']
      if (option.dataType === 'Int32' || option.dataType === 'int') {
        val = parseInt(val)
      }
      return val
    },
    /**
     * 有效值验证，不为undefined、空字符串、null
     */
    valueValidate(value: any) {
      return value !== '' && value !== undefined && value !== null
    }
  }
})
</script>

<style></style>
