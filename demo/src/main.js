import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Element from 'element-ui'
import CubeUI from '../../lib/CubeUI.umd.js'

import 'element-ui/lib/theme-chalk/index.css'
import '../../lib/CubeUI.css'

Vue.Vuex = Vuex
Vue.VueRouter = VueRouter
Vue.Element = Element

Vue.use(CubeUI)
let store = Vue.Store
const router = Vue.Router
const App = CubeUI.App

// 注册组件
const files = require.context('@/views/', true, /^.*\.vue$/)
store.dispatch('setFiles', files)

// store.dispatch('setUrls', { baseUrl: 'http://localhost:5000' })
store.dispatch('setUrls', { baseUrl: 'https://cube.newlifex.com' })

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
