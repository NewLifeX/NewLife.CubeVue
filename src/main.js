import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import * as Element from 'element-plus'
import * as ElementIcons from '@element-plus/icons'
import { createCubeUI } from './index'

import 'element-plus/dist/index.css'

let cubeUI = createCubeUI(VueRouter, Vuex, Element, ElementIcons)

const app = createApp(App)
app.use(cubeUI)

// Vue.Vuex = Vuex
// Vue.VueRouter = VueRouter
// Vue.Element = Element
// // window.Vue = Vue
// Vue.use(CubeUI)
// console.log(Vue.Store)

// cubeUI.store.dispatch('setUrls', { baseUrl: 'http://localhost:5000' })
cubeUI.store.dispatch('setUrls', { baseUrl: 'http://81.69.253.197:8000' })

// // window.Vue = Vue
// new Vue({
//   router: Vue.Router,
//   store: Vue.Store,
//   render: (h) => h(CubeUI.App)
// })
app.mount('#app')
