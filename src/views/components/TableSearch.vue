<template>
  <el-row type="flex" justify="end" class="search">
    <el-col :span="24" class="letf-search">
      <el-form
        ref="form"
        v-model="model"
        label-position="right"
        :inline="true"
        class="search-form-container"
      >
        <template v-for="item in columns">
          <el-form-item
            :label="item.displayName"
            :key="item.name"
            v-if="item.showInSearch"
            v-show="!item.hidden"
          >
            <template v-if="!item.if || item.if(model)">
              <slot :name="'search-' + item.name" :model="model" :config="item">
                <FormControl v-model="model" :configs="item"></FormControl>
              </slot>
            </template>
          </el-form-item>
        </template>
        <el-button size="default" type="primary" @click="search">
          查询
        </el-button>
        <el-button size="default" type="default" @click="resetSearch">
          重置
        </el-button>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
// import singleSelect from '../../components/singleSelect'
// import multipleSelect from '../../components/multipleSelect'
import FormControl from './FormControl.vue'

export default defineComponent({
  name: 'TableSearch',
  components: {
    FormControl
  },
  props: {
    columns: {
      type: Array as PropType<any[]>,
      default: () => [] as any[]
    },
    modelValue: {
      type: Object,
      default: () => {}
    },
    searchMethod: {
      type: Function,
      default: undefined
    },
    resetSearchMethod: {
      type: Function,
      default: undefined
    }
  },
  emits: ['getDataList', 'resetSearch', 'update:modelValue'],
  data() {
    return {
      model: {} as any
    }
  },
  watch: {
    model: {
      handler(val) {
        this.$emit('update:modelValue', val)
      },
      deep: true
    },
    modelValue(val) {
      this.model = val
    }
  },
  created() {
    this.model = this.modelValue // JSON.parse(JSON.stringify(this.modelValue))

    let columns = this.columns
    for (const key in columns) {
      if (Object.prototype.hasOwnProperty.call(columns, key)) {
        const item = columns[key]
        if (
          item.itemType === 'datePicker' &&
          item.options &&
          item.options.includes('type=daterange') &&
          !item.options.includes('setDefaultValue=false')
        ) {
          // 如果是日期范围选择器，默认值设为最近一个月
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          this.model[item.name] = [
            // 此格式化可能不同浏览器表现不同，返回的可能不是YYYY-MM-DD格式
            start.toLocaleDateString('fr-CA'),
            end.toLocaleDateString('fr-CA')
          ]
        }

        // 默认值设置
        if (typeof item.value !== 'undefined') {
          this.model[item.name] = item.value
        }
      }
    }
  },
  methods: {
    search() {
      let vm = this
      if (vm.searchMethod) {
        vm.searchMethod()
      } else {
        this.$emit('getDataList')
      }
    },
    resetSearch() {
      let vm = this
      if (vm.resetSearchMethod) {
        vm.resetSearchMethod()
      } else {
        this.$emit('resetSearch')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.search {
  /* height: 60px; */
  /* overflow: hidden; */
  /* position: relative; */
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;
  // border-bottom: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  min-height: 50px;
  padding-bottom: 8px;
  // margin-bottom: 10px;
}

.search .left-search {
  line-height: 58px;
  /* height: 60px; */
  /* float: left; */
  padding: 0 10px;
}
.search .letf-search {
  line-height: 40px;
  /* height: 65px; */
  /* float: right; */
  /* max-height: 110px; */
  padding: 0 10px;
  /* overflow-y: auto; */
  display: flex;
  justify-content: flex-start;
}
.search .el-button + .el-button {
  margin-left: 0px;
}

/* 搜索框元素间距 */
:deep(.el-input) {
  margin-right: 10px;
}

:deep(.el-button) {
  margin-right: 10px;
}

:deep(.el-date-editor) {
  margin-right: 10px;
}

:deep(.el-date-editor) {
  width: 250px;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
