<template>
  <div class="table-pagination">
    <el-pagination
      style="height: 46px"
      background
      v-model:current-page="modelValue.pageIndex"
      v-model:page-size="modelValue.pageSize"
      layout="total, prev, pager, next, sizes, jumper"
      :total="modelValue.total"
      v-bind="$attrs"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TablePagination',
  props: ['modelValue'],
  emits: ['update:modelValue', 'pageChange'],
  watch: {
    'modelValue.pageSize': {
      handler(val, oldVal) {
        if (val == oldVal) {
          return;
        }

        this.$emit('update:modelValue', this.modelValue);
        this.$emit('pageChange', this.modelValue);
      },
      deep: true,
    },
    'modelValue.pageIndex': {
      handler(val, oldVal) {
        if (val == oldVal) {
          return;
        }

        this.$emit('update:modelValue', this.modelValue);
        this.$emit('pageChange', this.modelValue);
      },
      deep: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.table-pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  // margin-top: 15px;
  // margin-bottom: 10px;
}
</style>
