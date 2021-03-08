import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import CubeUI from './index'
// console.log(Vue, CubeUI)

import 'element-ui/lib/theme-chalk/index.css'

Vue.Vuex = Vuex
Vue.VueRouter = VueRouter
Vue.Element = Element
// window.Vue = Vue
Vue.use(CubeUI)
// console.log(Vue.Store)

// Vue.Store.dispatch('setUrls', { baseUrl: 'http://localhost:5000' })
Vue.Store.dispatch('setUrls', { baseUrl: 'http://81.69.253.197:8000' })

window.Vue = Vue
new Vue({
  router: Vue.Router,
  store: Vue.Store,
  render: (h) => h(CubeUI.App),
}).$mount('#app')
