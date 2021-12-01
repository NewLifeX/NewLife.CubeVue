import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import Vuex from 'vuex'
import * as Element from 'element-plus'
import * as ElementIcons from '@element-plus/icons'
import { createCubeUI } from 'CubeUI'
import App from './App.vue'

import 'element-plus/dist/index.css'
import '../../lib/CubeUI.css'

let cubeUI = createCubeUI(VueRouter, Vuex, Element, ElementIcons)

const app = createApp(App)
app.use(cubeUI)

let store = cubeUI.store

// 注册组件
const files = require.context('@/views/', true, /^.*\.vue$/)
store.dispatch('setFiles', files)

// store.dispatch('setUrls', { baseUrl: 'http://localhost:5000' })
store.dispatch('setUrls', { baseUrl: 'http://81.69.253.197:8000' })

app.mount('#app')
