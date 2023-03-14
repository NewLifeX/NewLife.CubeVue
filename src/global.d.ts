import type { AxiosInstance } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { Store } from 'vuex';
import type { Api } from './api';

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  interface State {}

  // 为 `this.$store` 提供类型声明
  // https://next.vuex.vuejs.org/guide/typescript-support.html#typing-store-property-in-vue-component
  interface ComponentCustomProperties {
    $api: Api;
    $http: AxiosInstance;
    $message: typeof ElMessage;
    $messageBox: typeof ElMessageBox;
    $store: Store<State>;
  }
}
