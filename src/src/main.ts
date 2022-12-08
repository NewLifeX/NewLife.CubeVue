import { createApp } from 'vue'
import App from './App.vue'
import { createCubeUI } from './index'

import 'element-plus/dist/index.css'

const cubeUI = createCubeUI()

const app = createApp(App)
app.use(cubeUI)

const store = app.config.globalProperties.$store

// store.dispatch('setUrls', { baseUrl: 'http://localhost:5000' })
// store.dispatch('setUrls', { baseUrl: 'http://81.69.253.197:8000' })
store.dispatch('setUrls', { baseUrl: 'https://cube.newlifex.com' })

app.mount('#app')
