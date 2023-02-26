<template>
  <el-row type="flex" justify="center" align="middle" class="operator">
    <el-col :span="12" class="left-search">
      <template v-for="(btn, idx) in tableHandlerList" :key="idx">
        <template v-if="!btn.if || btn.if(searchParams)">
          <slot :name="'handler-' + btn.name" :config="btn">
            <el-button size="default" @click="handlerClick(btn)" v-bind="btn">
              {{ btn.name }}
            </el-button>
          </slot>
        </template>
      </template>
    </el-col>
    <el-col
      :span="12"
      style="display: flex; justify-content: flex-end; align-items: center"
    >
      <el-tooltip effect="dark" content="刷新" placement="top-end">
        <el-icon
          class="action"
          @click="handlerClick({ handler: 'getDataList' })"
        >
          <refresh />
        </el-icon>
      </el-tooltip>

      <el-popover placement="bottom" :width="220" trigger="click">
        <div>设置列字段</div>
        <div class="setting-btn">
          <div style="padding-top: 5px">
            <el-checkbox
              @change="chooseAll"
              v-model="allChoose"
              :indeterminate="isIndeterminate"
            >
              全选
            </el-checkbox>
          </div>
        </div>
        <el-divider></el-divider>
        <div style="max-height: 380px; overflow: auto">
          <div v-for="(field, index) in columns" :key="index">
            <template v-if="field.showInList">
              <el-checkbox
                @change="chooseItem(field)"
                :model-value="!field.hidden"
              >
                {{ field.displayName }}
              </el-checkbox>
            </template>
          </div>
        </div>
        <template #reference>
          <div>
            <el-tooltip effect="dark" content="列设置" placement="top-end">
              <el-icon class="action">
                <setting />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-popover>

      <!-- <el-tooltip effect="dark" content="全屏" placement="top-end">
        <el-icon class="action">
          <full-screen />
        </el-icon>
      </el-tooltip>-->
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'TableHandler',
  props: {
    columns: {
      type: Array as any,
      default: () => []
    },
    tableHandlerList: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    permissionFlags: {
      type: Object,
      default: () => {}
    },
    // 搜索参数
    searchParams: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['handlerClick'],
  //   setup(props, context) {
  //     // console.log(arguments)

  //     const operator = (option) => {
  //       context.emit('operator', option)
  //     }

  //     return {
  //       operator
  //     }
  //   },
  data() {
    return {
      allChoose: true,
      isIndeterminate: false
    }
  },
  methods: {
    checkChoose() {
      let trueLength = this.columns.filter((item: any) => !item.hidden).length
      if (trueLength == this.columns.length) {
        this.allChoose = true
        this.isIndeterminate = false
        return
      }
      this.allChoose = false
      this.isIndeterminate = trueLength > 0 && trueLength < this.columns.length
    },
    chooseAll(val: any) {
      this.columns.forEach((item: any) => {
        item.hidden = !val
      })

      if (val) {
        this.isIndeterminate = false
      }
    },
    chooseItem(val: any) {
      val.hidden = !val.hidden
      this.checkChoose()
    },
    handlerClick(option: any, data?: any) {
      this.$emit('handlerClick', option, data)
    }
  }
})
</script>

<style scoped>
.operator {
  padding: 8px 0 10px 0;
}

.action {
  margin: 0 8px;
  cursor: pointer;
  font-size: 17px;
  background-color: #f4f4f5;
  min-width: 30px;
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
