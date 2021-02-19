import { Vue, Element, App, Store, Router } from './index'
// console.log(Vue, Element, App, Store, Router)
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

Vue.use(Element)

Vue.config.productionTip = false

// Store.dispatch('setUrls', { baseUrl: 'http://localhost:5000' })

new Vue({
  router: Router,
  store: Store,
  render: (h) => h(App),
}).$mount('#app')
