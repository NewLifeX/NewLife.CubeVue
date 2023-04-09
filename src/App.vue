<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
    <Config></Config>
  </el-config-provider>
</template>

<script lang="ts">
// 设置语言为中文
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { defineComponent } from 'vue';
import Config from './plugins/vite-plugin-vue-cube/config.vue';
export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider,
    Config,
  },
  data() {
    return {
      locale: zhCn,
    };
  },
});
</script>
