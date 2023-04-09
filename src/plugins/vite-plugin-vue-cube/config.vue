<script setup>
import { getCurrentInstance, ref } from 'vue';
import { fileContext } from '@/services/file-context';

const isDev = process.env.NODE_ENV === 'development';
let show = ref(false);
let route = ref({});

// 获取当前路由下页面的实例
const page = getCurrentInstance();
const router = page.appContext.config.globalProperties.$router;

function setCurrentConfig() {
  route.value = router.currentRoute.value;
  // 尝试获取当前页面对应的配置，获取不到请求后端获取
  let path = route.value.path;
  let config = fileContext('@/views' + path + '/config.tsx');
  if (!config) {
    // 请求后端获取
  }
  console.log(config);
}

function showConfig() {
  show.value = true;
  setCurrentConfig();
}
</script>

<template>
  <div>
    <div v-if="isDev" class="config" title="页面设置" @click="showConfig">
      <el-icon class="icon"><Tools /></el-icon>
    </div>
    <el-dialog
      title="页面设置"
      v-model="show"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div>
        <div>
          <span>当前页面：{{ route.fullPath }}</span>
        </div>
      </div>
      <template #footer>
        <span slot="footer" class="dialog-footer">
          <el-button @click="show = false">取 消</el-button>
          <el-button type="primary" @click="show = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.config {
  z-index: 999999;
  position: fixed;
  right: -22px;
  bottom: 5px;
  padding: 10px 10px 5px 10px;
  opacity: 0.9;
  transition: all 0.5s;

  &:hover {
    cursor: pointer;
    right: 0px;
    background-color: #cbcbcb;
  }

  .icon {
    font-size: 25px;
  }
}

.dialog-footer {
  text-align: right;
}
</style>
