<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts">
// 设置语言为中文
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider
  },
  data() {
    return {
      locale: zhCn
    }
  }
})
</script>
