<template>
  <div class="table-container" :style="{ height: normalHeight }">
    <el-table
      :data="tableData"
      :header-cell-style="changeHeaderClass"
      stripe
      border
      :height="height"
      ref="table"
      v-bind="$attrs"
    >
      <!-- @selection-change="handleSelectionChange" -->
      <!-- 勾选框 -->
      <el-table-column
        v-if="selection"
        align="center"
        type="selection"
        width="40px"
      ></el-table-column>
      <!-- 编号 -->
      <el-table-column
        v-if="showIndex"
        align="center"
        label="序号"
        type="index"
        width="50px"
      />
      <template v-for="(col, idx) in columns">
        <el-table-column
          v-if="col.showInList && !col.hidden && (!col.if || col.if())"
          align="center"
          :fixed="col.handlerList ? 'right' : false"
          :key="idx"
          :label="col.displayName"
          :prop="col.name"
          resizable
          :sortable="col.isDataObjectField"
          :width="col.width"
        >
          <template #header>
            <div style="display: inline-flex">
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
            <span
              :class="
                  'column' +
                    idx +
                    (isAdjustColumnWidth ? ' adjust-column-width' : '')
                "
              :data-index="idx"
            >
              <slot
                :name="'col-' + scope.column.property"
                :colData="col"
                :colScope="scope"
              >
                <!-- 使用示例 -->
                <!-- <template v-slot:col-colName="{ colData: col, colScope: { row } }">
        {{ col.name }}1{{ row[col.name] }},
                </template>-->
                <template v-if="col.dataType === 'Boolean'">
                  <el-switch
                    v-model="scope.row[col.name]"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    disabled
                  />
                </template>
                <template v-else-if="col.itemType === 'select'">
                  {{ getColumnValue(scope, col) }}
                </template>
                <template v-else-if="!col.isDataObjectField && col.cellUrl">
                  <a :href="getUrl(col, scope.row)">{{ col.displayName }}</a>
                </template>
                <template v-else-if="col.handlerList">
                  <template
                    v-for="(handlerItem, i) in col.handlerList"
                    :key="i"
                  >
                    <template
                      v-if="!handlerItem.if || handlerItem.if(scope.row)"
                    >
                      <el-button
                        :type="handlerItem.type"
                        size="default"
                        @click="handlerClick(handlerItem, scope)"
                        v-bind="handlerItem"
                      >
                        {{ handlerItem.text }}
                      </el-button>
                    </template>
                  </template>
                </template>
                <template v-else>{{ scope.row[col.name] }}</template>
              </slot>
            </span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  name: 'NormalTable',
  description: '常规表格封装，使用的地方的父级必须指定高度',
  props: {
    // 表格列配置
    columns: {
      type: Array as PropType<any[]>,
      default: [],
    },
    // 表格数据
    tableData: {
      type: Array,
      default: [],
    },
    // 是否垂直展示数据
    vertical: {
      type: Boolean,
      default: false,
    },
    // 是否树状结构数据
    isTree: {
      type: Boolean,
      default: false,
    },
    // 树形结构key值
    treeKey: {
      type: String,
      require: false,
    },
    // 是否设置了改变表头颜色
    changeHeader: {
      type: Boolean,
      default: false,
    },
    // 表格最大高度需要减去的高度，这个值不能太低，否则表格高度会自己不断拉长
    normalHeight: {
      type: String,
      default: 'calc(100% - 146px)',
    },
    /**
     *  表格height属性，与normalHeight组合，可达到不同效果。
       1、normalHeight设置100%，表格没有数据时也能撑开一定高度，此时height设置100%，
        表格高度超过height时自动出现滚动条
       2、height设置为null，表格内容自动撑开高度
     */
    height: {
      type: String,
      default: '100%',
    },
    // 是否显示勾选框
    selection: {
      type: Boolean,
      default: true,
    },
    // 是否显示序号列
    showIndex: {
      type: Boolean,
      default: false,
    },
    // 是否自适应列宽
    isAdjustColumnWidth: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['handlerClick'],
  data() {
    return {};
  },
  // computed: {
  //   normalHeight() {
  //     // console.log('normalHeight', this.height)
  //     return {
  //       // height: `calc(100% - ${this.height}px)`
  //       height: this.tableHeight
  //     }
  //   }
  // },
  watch: {
    // 表格数据变化时重新渲染表格
    tableData() {
      const vm = this as any;
      const table = vm.$refs.table;
      if (table) {
        setTimeout(() => {
          table.doLayout();
        }, 600);

        this.$nextTick(() => {
          if (vm.isAdjustColumnWidth) {
            vm.adjustColumnWidth();
          }
        });
      }
    },
  },
  created() {
    // console.log(this.columns)
  },
  mounted() {
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    adjustColumnWidth() {
      const vm = this as any;
      const tableEl = vm.$refs.table.$el;

      if (tableEl) {
        for (let index = 0; index < this.columns.length; index++) {
          const column = this.columns[index];
          const maxWidth = this.getMaxWidth(index);
          if (maxWidth > 0) {
            column.width = maxWidth + 20; // 20间距
          }
        }
      }
    },
    getMaxWidth(index: any) {
      const vm = this as any;
      const tableEl = vm.$refs.table.$el;
      // // 先获取原来的宽度，作为默认值
      // let colEl = tableEl.querySelector(
      //   `col[name=el-table_1_column_${
      //     this.selection && this.showIndex
      //       ? index + 2
      //       : this.selection || this.showIndex
      //       ? index + 1
      //       : index
      //   }]`
      // )

      let maxWidth = 0;

      // if (colEl && colEl.width) {
      //   // maxWidth = parseInt(colEl.width)
      //   console.log(
      //     'width',
      //     index,
      //     colEl.width,
      //     this.selection && this.showIndex
      //       ? index + 3
      //       : this.selection || this.showIndex
      //       ? index + 2
      //       : index + 1
      //   )
      // }

      const columnEls = tableEl.querySelectorAll('.column' + index);
      for (const el of columnEls) {
        if (el.offsetWidth > maxWidth) {
          maxWidth = el.offsetWidth;
        }
      }

      return maxWidth;
    },
    changeHeaderClass(scope: any) {
      if (this.changeHeader) {
        const colorMap = {} as any;
        this.columns.forEach((item) => {
          colorMap[item.name] = item.color || '#fff';
        });
        return {
          backgroundColor: colorMap[scope.column.property] || '#fff',
          color: '#000',
        };
      }
      return {
        backgroundColor: '#f6f6f6',
        // color: '#333333',
        // fontWeight: 'normal'
      };
    },
    rowChangeStyle(row: any) {
      // console.log(row)
      if (
        row.row.childTransferObject &&
        row.row.childTransferObject.length > 0 &&
        this.isTree
      ) {
        return {
          backgroundColor: '#ddebf7',
        };
      }
    },
    getUrl(column: any, entity: any) {
      // 针对指定实体对象计算url，替换其中变量
      const reg = /{(\w+)}/g;
      return column.cellUrl.replace(reg, (a: any, b: any) => entity[b]);
    },
    handlerClick(option: any, data: any) {
      let returnData = null;
      this.$emit('handlerClick', option, data, (val: any) => {
        returnData = val;
      });

      return returnData;
    },
    resize() {
      const vm = this as any;
      const table = vm.$refs.table;
      if (table) {
        setTimeout(() => {
          table.doLayout();
        }, 1000);
      }
    },
    // 从配置中读取要显示的值，适用于下拉框
    getColumnValue(scope: any, col: any) {
      // 判断是否是数据行
      if (scope.$index < 0) {
        return scope.row[col.name];
      }

      const row = scope.row;
      let dataList = col.dataList;
      const url = col.url;

      if (!dataList) {
        if (typeof url === 'string' && url.startsWith('[')) {
          dataList = col.dataList = JSON.parse(url);
        } else if (
          typeof url === 'string' &&
          (url.startsWith('/') || url.startsWith('http'))
        ) {
          // 请求url获取数据
          this.getRemoteData(row, col);
          // 请求远程数据有延迟，先返回原始数据
          return row[col.name];
        } else if (typeof url === 'object' && url.length > 0) {
          dataList = col.dataList = col.url;
        } else {
          return row[col.name];
        }
      }

      if (!dataList) {
        return row[col.name];
      }

      if (dataList.length > 0) {
        for (const item of dataList) {
          if (item[col.valueField || 'value'] === row[col.name]) {
            return item[col.labelField || 'label'];
          }
        }
      }

      return row[col.name];
    },
    // 获取远程数据
    getRemoteData(row: any, configs: any) {
      const vm = this;
      if (configs.loading) {
        // 正在加载数据，直接返回
        return;
      }

      configs.loading = true;

      const url = configs.url;
      const options = {} as any;

      const searchParams = new URLSearchParams(configs.options) as any;
      for (const item of searchParams) {
        options[item[0]] = item[1];
      }
      const method = options.method || 'post';
      let data = {};

      // 设置data，处理插值
      this.setData(configs, options, row);

      if (configs.data) {
        data = { ...data, ...JSON.parse(configs.data) };
      }

      const config = {
        url,
        method,
        data,
      };

      vm.$http(config).then((res) => {
        configs.dataList = res.data.list || res.data.rows || res.data;
        configs.loading = false;
        const table = vm.$refs.table as any;
        if (table) {
          setTimeout(() => {
            table.doLayout();
          }, 100);
        }
      });
    },
    // 设置请求参数，configs.data。对options.data进行处理，如果值有{{field}}形式的值，则替换成为model中的值
    setData(configs: any, options: any, row: any) {
      if (!options.data) {
        return;
      }

      const data = JSON.parse(options.data);

      if (!configs.data) {
        configs.data = {};
      }

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const val = data[key];

          if (
            typeof val === 'string' &&
            val.startsWith('{{') &&
            val.endsWith('}}')
          ) {
            if (row) {
              configs.data[key] = row[val.substring(2, val.length - 2)];
            }
          } else {
            configs.data[key] = val;
          }
        }
      }
    },
  },
});
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
  // margin: 5px 0 2px 0;
  // padding: 3px 0 2px 0;
  // box-shadow: 1px 1px 4px rgb(0 21 41 / 8%);
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
:deep(.el-table td) {
  padding: 2px 0 2px 0;
}
:deep(.el-table th) {
  padding: 2px 0 2px 0;
}

/** 表头、行上下间距 */
:deep(.cell) {
  padding: 0 1px 0 1px;
  // overflow: unset;
}

// 表格行高度设置48px，避免内容高度过低使得表格变得紧凑
:deep(.el-table .el-table__cell) {
  height: 48px;
}

:deep(.el-table .el-table__cell .cell > span.adjust-column-width) {
  word-break: normal;
  text-overflow: clip;
  overflow: auto;
  white-space: nowrap;
}
</style>
