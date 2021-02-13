import Vue from 'vue'
import Element from 'element-ui'
import DyUI from 'diyi-ui'
import App from './App.vue'
import Store from './store'
import Router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import 'diyi-ui/dist/diyi-ui.min.css'

import '@/styles/index.scss' // global css
Vue.use(Element)
Vue.use(DyUI)

Vue.config.productionTip = false

new Vue({
  router: Router,
  store: Store,
  render: (h) => h(App),
}).$mount('#app')
