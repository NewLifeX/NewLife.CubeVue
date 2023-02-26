<script lang="tsx">
import { defineComponent, PropType, h } from 'vue'
import { TableSearch, TableHandler, NormalTable, TablePagination } from './'
export default defineComponent({
  name: 'AdvancedTable',
  props: {
    // 搜索条件列表
    searchList: {
      type: Array as PropType<any[]>,
      default: []
    },
    // 操作列表
    tableHandlerList: {
      type: Array as PropType<any[]>,
      default: []
    },
    // 表格数据
    tableDataList: {
      type: Array as PropType<any[]>,
      default: null
    },
    // 表格列配置
    columns: {
      type: Array as PropType<any[]>,
      default: []
    },
    // 表格数据请求地址，如果设置了tableData，url参数将不会生效
    url: {
      type: String as PropType<string>,
      require: true,
      default: ''
    },
    // 显示搜索条件区
    showSearch: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    // 显示操作区
    showHandler: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    // 显示分页
    showPagination: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    // 请求数据前的过滤方法
    beforeGetDataList: {
      type: Function,
      require: false
    },
    // 请求数据后的过滤方法
    afterGetDataList: {
      type: Function,
      require: false
    },
    // 当此组件的父级不是整个页面而是某个组件，需要设置父级，以便操作方法能被找到
    tableParent: {
      type: Object,
      require: false
    }
  },
  data() {
    return {
      // 组件激活状态，默认true。失活时置为false，被激活时判断该值，
      // 如果为false则更新列表数据，避免第一次创建组件时激活重复获取数据
      activated: true,
      loadingTable: false,
      showTable: true,
      // 批量选中的数据
      selectList: [],
      // 表格数据
      tableData: [] as any[],
      // 分页参数
      pager: {
        pageSize: 10,
        pageIndex: 1,
        total: 0
      },
      // 搜索参数
      searchParams: {},
      // 搜索框高度
      tableSearchHeight: 50
    }
  },
  computed: {
    // 非表格的其它组件高度
    nonTableHeight() {
      const vm = this as any
      return (
        vm.tableSearchHeight +
        (vm.showHandler ? 50 : 0) +
        (vm.showPagination ? 50 : 0)
      )
    },
    // 表格高度
    normalTableHeight() {
      const vm = this as any
      return `calc(100% - ${vm.nonTableHeight + 3}px)`
    }
  },
  watch: {
    tableDataList(val) {
      this.tableData = this.tableDataList
    }
  },
  mounted() {
    this.getDataList()

    // 手动触发一次
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  activated() {
    if (!this.activated) {
      this.activated = true
      this.getDataList()
    }
  },
  deactivated() {
    this.activated = false
  },
  methods: {
    // 获取表格数据
    getDataList() {
      if (this.tableDataList) {
        this.tableData = this.tableDataList
        return
      }

      const searchParams = this.searchParams as any
      const data = {
        limit: this.pager.pageSize,
        offset: this.pager.pageIndex - 1,
        currentPage: this.pager.pageIndex,
        pageSize: this.pager.pageSize,
        keyWord: searchParams.txtKeywords,
        ...searchParams
      }

      if (this.beforeGetDataList) {
        this.beforeGetDataList(data)
      }

      this.loadingTable = true
      this.$http.post(this.url, data).then((res) => {
        this.tableData = res.data.list || res.data.rows || res.data

        if (res.data.pagerModel) {
          this.pager.total = res.data.pagerModel.total
        } else if ((res as any).pager) {
          this.pager.total = parseInt((res as any).pager.totalCount || 0)
        } else {
          this.pager.total = res.data.total || 0
        }

        if (this.afterGetDataList) {
          this.afterGetDataList(res.data)
        }
        this.loadingTable = false
      })
    },
    resetSearch() {
      this.pager = {
        pageSize: 10,
        pageIndex: 1,
        total: 0
      }
      this.searchParams = {}
      this.getDataList()
    },
    // 子组件调用此方法，再通过参数action调用本组件方法
    handler(option: any, data: any, callback: any) {
      const vm = this as any
      const handler = option.handler
      let func

      // 优先查找指定父级组件方法，高级表格组件独有
      if (this.tableParent) {
        func = (this.tableParent as any)[handler]
      }

      // 再查找当前组件父级组件方法，高级表格组件独有
      if (!func && this.$parent) {
        func = (this.$parent as any)[handler]
      }

      if (!func) {
        func = vm[handler]
      }

      if (!func || typeof func !== 'function') {
        const msg = `未实现的方法：${handler}，或请设置属性=>:table-parent="this"`
        console.error(msg)
        vm.$message.error(msg)
      } else {
        const returnData = (func as Function).call(vm, data)
        if (typeof callback === 'function') {
          callback(returnData)
        }
      }
    },
    // 设置选中的行数
    setSelectList(list: any) {
      this.selectList = list
    },
    // 设置显示的表头
    setColumns(list: any) {
      //   this.showTable = false
      //   this.$nextTick(() => {
      //     this.showTable = true
      //   })
    },
    resize() {
      const vm = this as any

      vm.$nextTick(() => {
        const tableSearch = vm.$refs.tableSearch

        if (tableSearch) {
          // 由于搜索条件个数不确定，可能会换行，因此需要根据实际高度再调整表格高度
          vm.tableSearchHeight = tableSearch.$el.offsetHeight
          // setTimeout(() => {
          //   tableSearch.doLayout()
          // }, 1000)
        } else {
          vm.tableSearchHeight = 0
        }
      })
    }
  },
  render(ctx: any) {
    return (
      <div style={{ height: '100%' }}>
        {ctx.showSearch ? (
          <TableSearch
            ref="tableSearch"
            v-model={ctx.searchParams}
            columns={ctx.searchList}
            onGetDataList={ctx.getDataList}
            onResetSearch={ctx.resetSearch}
            v-slots={ctx.$slots}
          />
        ) : (
          ''
        )}
        {ctx.showHandler ? (
          <TableHandler
            ref="tableHandler"
            columns={ctx.columns}
            tableHandlerList={ctx.tableHandlerList}
            searchParams={ctx.searchParams}
            onHandlerClick={ctx.handler}
            v-slots={ctx.$slots}
          />
        ) : (
          ''
        )}
        {ctx.showTable ? (
          <NormalTable
            ref="normalTable"
            v-loading={ctx.loadingTable}
            columns={ctx.columns}
            tableData={ctx.tableData}
            normalHeight={ctx.normalTableHeight}
            onSelectionChange={ctx.setSelectList}
            onHandlerClick={ctx.handler}
            {...ctx.$attrs}
            v-slots={ctx.$slots}></NormalTable>
        ) : (
          ''
        )}
        {ctx.showPagination ? (
          <TablePagination
            ref="tablePagination"
            onPagerChange={ctx.getDataList}
            v-model={ctx.pager}
          />
        ) : (
          ''
        )}
      </div>
    )
  }
})
</script>
