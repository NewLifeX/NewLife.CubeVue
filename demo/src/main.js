import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import Vuex from 'vuex'
import * as Element from 'element-plus'
import * as ElementIcons from '@element-plus/icons'
import { createCubeUI } from 'CubeUI'
import App from './App.vue'

import 'element-plus/dist/index.css'
import '../lib/CubeUI.css'

let cubeUI = createCubeUI()

const app = createApp(App)
app.use(cubeUI)

let store = app.config.globalProperties.$store

// 注册组件
const files = require.context('@/', true, /^.*\.vue$/)
store.dispatch('setFiles', files)

// store.dispatch('setUrls', { baseUrl: 'http://localhost:5000' })
store.dispatch('setUrls', { baseUrl: 'https://cube.newlifex.com' })

app.mount('#app')
