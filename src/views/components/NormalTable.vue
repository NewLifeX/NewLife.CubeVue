<template>
  <div class="table-container" :style="normalHeight">
    <el-table
      :data="tableData"
      :header-cell-style="changeHeaderClass"
      stripe
      border
      :height="tableHeight"
      ref="table"
      v-bind="$attrs"
    >
      <!-- @selection-change="handleSelectionChange" -->
      <!-- 勾选框 -->
      <el-table-column v-if="selection" type="selection" width="40"></el-table-column>
      <!-- 编号 -->
      <el-table-column v-if="showIndex" align="center" label="序号" type="index" width="50" />
      <!-- 常规列 -->
      <template v-if="!vertical">
        <template v-for="(col, idx) in columns">
          <el-table-column
            v-if="col.showInList && !col.hidden"
            align="center"
            :fixed="col.actionList ? 'right' : false"
            :key="idx"
            :label="col.displayName"
            :prop="col.name"
            resizable
            :sortable="col.isDataObjectField"
            :width="col.width"
          >
            <template #header>
              <div style="display:inline-flex">
                <span>{{ col.displayName }}</span>
                <el-tooltip
                  v-if="col.description && col.displayName != col.description"
                  :content="col.description"
                >
                  <i
                    class="el-icon-warning-outline"
                    @click="
                      (e) => {
                        e.stopPropagation()
                      }
                    "
                  ></i>
                </el-tooltip>
              </div>
            </template>

            <template v-slot="scope">
              <slot :name="'col-' + scope.column.property" :colData="col" :colScope="scope">
                <!-- 使用示例 -->
                <!-- <template v-slot:col-colName="{ colData: col, colScope: { row } }">
        {{ col.name }}1{{ row[col.name] }},
                </template>-->
                <template v-if="col.dataType === 'Boolean'">
                  <el-switch
                    :value="scope.row[col.name]"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  />
                </template>
                <template v-else-if="!col.isDataObjectField && col.cellUrl">
                  <a :href="getUrl(col, scope.row)">{{ col.displayName }}</a>
                </template>
                <template v-else-if="col.actionList">
                  <template v-for="(actionItem, i) in col.actionList">
                    <el-button
                      :key="i"
                      v-if="
                        operator(
                          { action: 'hasPermission' },
                          actionItem.permission
                        )
                      "
                      :type="actionItem.type"
                      size="mini"
                      @click="operator(actionItem, scope.row)"
                    >{{ actionItem.text }}</el-button>
                  </template>
                </template>
                <div v-else>{{ scope.row[col.name] }}</div>
              </slot>
            </template>
          </el-table-column>
        </template>
      </template>

      <!-- 垂直列-第一列为表头 -->
      <el-table-column v-if="vertical" label width="150px">
        <template v-for="(col, cindex) in columns">
          <div :key="cindex" v-if="col.showInList && !col.hidden">
            <span>{{ col.displayName }}</span>
          </div>
        </template>
      </el-table-column>

      <!-- 垂直列-第二列为内容 -->
      <el-table-column label v-if="vertical">
        <template v-slot="scope">
          <div v-for="(col, index) in columns" :key="index">
            <div v-if="col.showInList && !col.hidden">
              <span v-if="!col.actionList">{{ scope.row[col.name] || '&nbsp;' }}</span>

              <!-- 操作栏 -->
              <div v-if="col.actionList">
                <span
                  class="handbtn"
                  v-for="(actionItem, hIndex) in col.actionList"
                  @click="operator(actionItem, scope.row)"
                  :key="hIndex"
                >{{ actionItem.text }}</span>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'NormalTable',
  description: '常规表格封装，使用的地方的父级必须指定高度',
  props: {
    // 表格列配置
    columns: {
      type: Array as PropType<any[]>,
      default: []
    },
    // 表格数据
    tableData: {
      type: Array,
      default: []
    },
    // 是否垂直展示数据
    vertical: {
      type: Boolean,
      default: false
    },
    // 是否树状结构数据
    isTree: {
      type: Boolean,
      default: false
    },
    // 树形结构key值
    treeKey: {
      type: String,
      require: false
    },
    // 是否设置了改变表头颜色
    changeHeader: {
      type: Boolean,
      default: false
    },
    // 表格最大高度需要减去的高度，这个值不能太低，否则表格高度会自己不断拉长
    height: {
      type: String,
      default: 'calc(100% - 170px)'
    },
    /**
     *  表格height属性，与height组合，可达到不同效果。
       1、height设置100%，表格没有数据时也能撑开一定高度，此时tableHeight设置100%，
        表格高度超过height时自动出现滚动条
       2、tableHeight设置为null，表格内容自动撑开高度
     */
    tableHeight: {
      type: String,
      default: '100%'
    },
    // 是否显示勾选框
    selection: {
      type: Boolean,
      default: true
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    // 显示标题
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  emits: ['operator'],
  data() {
    return {}
  },
  computed: {
    normalHeight() {
      // console.log('normalHeight', this.height)
      return {
        // height: `calc(100% - ${this.height}px)`
        height: this.height
      }
    }
  },
  watch: {
    // 表格数据变化时重新渲染表格
    tableData() {
      let vm = this as any
      let table = vm.$refs.table
      if (table) {
        setTimeout(() => {
          table.doLayout()
        }, 1000)
      }

    }
  },
  created() {
    // console.log(this.columns)
  },
  mounted() {
    window.addEventListener("resize", this.resize)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize)
  },
  methods: {
    changeHeaderClass(row: any) {
      if (this.changeHeader) {
        let colorMap = {} as any
        this.columns.forEach((item) => {
          colorMap[item.label] = item.color || '#fff'
        })
        return {
          backgroundColor: colorMap[row.column.label] || '#fff',
          color: '#000'
        }
      }
      return {
        backgroundColor: '#f6f6f6'
        // color: '#333333',
        // fontWeight: 'normal'
      }
    },
    rowChangeStyle(row: any) {
      // console.log(row)
      if (
        row.row.childTransferObject &&
        row.row.childTransferObject.length > 0 &&
        this.isTree
      ) {
        return {
          backgroundColor: '#ddebf7'
        }
      }
    },
    getUrl(column: any, entity: any) {
      // 针对指定实体对象计算url，替换其中变量
      const reg = /{(\w+)}/g
      return column.cellUrl.replace(reg, (a: any, b: any) => entity[b])
    },
    handler(hand: any, scope: any) {
      this.$emit('operator', hand, scope.row)
    },
    operator(option: any, data: any) {
      let returnData = null
      this.$emit('operator', option, data, (val: any) => {
        returnData = val
      })

      return returnData
    },
    resize() {
      let vm = this as any
      vm.$refs.table.doLayout()
    }
  }
})
</script>

<style lang="scss" scoped>
.normal-table {
  margin-top: 1px;
  overflow: auto;
}

.table-container {
  /* max-height: calc(100vh - 177px); */
  /* overflow-y: auto; */
  height: auto;
  margin: 5px 0 2px 0;
  box-shadow: 1px 1px 4px rgb(0 21 41 / 8%);
}

/** 操作按钮 */
.el-table .el-button {
  margin: 2px;
}

/** 表格操作 */
.action {
  margin: 0 8px;
  cursor: pointer;
  font-size: 17px;
}

/** 表头、行上下间距 */
::v-deep(.el-table td) {
  padding: 2px 0 2px 0;
}
::v-deep(.el-table th) {
  padding: 2px 0 2px 0;
}

/** 表头、行上下间距 */
::v-deep(.cell) {
  padding: 0 1px 0 1px;
}

// 表格行高度设置48px，避免内容高度过低使得表格变得紧凑
::v-deep(.el-table .el-table__cell) {
  height: 48px;
}
</style>
