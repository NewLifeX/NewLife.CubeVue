import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Api } from './api'
import { AxiosInstance } from 'axios'

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  interface State {}

  // 为 `this.$store` 提供类型声明
  // https://next.vuex.vuejs.org/guide/typescript-support.html#typing-store-property-in-vue-component
  interface ComponentCustomProperties {
    $api: Api
    $http: AxiosInstance
    $message: typeof ElMessage
    $messageBox: typeof ElMessageBox
    $store: Store<State>
  }
}
