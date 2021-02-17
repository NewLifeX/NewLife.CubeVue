import { Vue, Element, App, Store, Router } from 'newlife-cube-vueui'
console.log(Vue, Element, App, Store, Router)
import 'element-ui/lib/theme-chalk/index.css'
import '../../lib/newlife-cube-vueui.css'

Vue.use(Element)
Vue.config.productionTip = false

// 注册组件
const files = require.context('@/views/', true, /^.*\.vue$/)
Store.dispatch('setFiles', files)

new Vue({
  router: Router,
  store: Store,
  render: (h) => h(App),
}).$mount('#app')
