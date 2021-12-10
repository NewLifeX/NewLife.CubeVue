import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  interface State {}

  // 为 `this.$store` 提供类型声明
  // https://next.vuex.vuejs.org/guide/typescript-support.html#typing-store-property-in-vue-component
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
