import { createStore } from './store'
import { createRouter } from './router'
import { createAxios } from '@/utils/request'
import { createApi } from '@/api'
import requireComponent from '@/utils/requireComponent'
import { Navbar, Sidebar, AppMain } from '@/views/layout/components/index'
import fileContext from './services/file-context'
import * as Element from 'element-plus'
import * as ElementIcons from '@element-plus/icons'

import '@/styles/index.scss' // global css
import { createWebHashHistory } from 'vue-router'
import { getMenu } from './utils/menu'

const files = require.context('@/views/', true, /^.*\.vue$/)
// 注入视图文件
fileContext.addFiles(files)

let elementUI: any
let elementIcons: any

const install: any = (app: any) => {
  if (install.installed) {
    return
  }
  install.installed = true

  app.component('Navbar', Navbar)
  app.component('Sidebar', Sidebar)
  app.component('AppMain', AppMain)

  const store = createStore(app)

  // 注册组件
  store.dispatch('setFiles', files)

  // 注册请求封装和api，注入$http
  const axios = createAxios(app)
  axios.interceptors.request.use((config) => {
    config.baseURL = store.getters.urls.getBaseUrl()
    return config
  })

  // 创建api，公用接口,注入$api
  createApi(app, axios)

  store.dispatch('setMessage', elementUI.ElMessage)
  store.dispatch('setMessageBox', elementUI.ElMessageBox)

  // 尝试从本地缓存加载菜单
  const accessedRouters = getMenu()
  let menuRouters: any[] = []
  if (accessedRouters && accessedRouters.length > 0) {
    // 设置路由信息
    store.dispatch('generateRoutes', accessedRouters)

    // 添加路由信息
    menuRouters = store.getters.addRouters
  }

  // 配置路由
  const router = createRouter(app, (options) => {
    // options.history = createWebHashHistory()

    // 从本地缓存加载的路由必须在这里添加
    // 否则在已登录的情况，先进行导航再动态添加路由，导致找不到页面
    options.routes = menuRouters.concat(options.routes)
  })

  app.use(elementUI, { size: store.state.app.size })
  for (const key in elementIcons) {
    if (Object.prototype.hasOwnProperty.call(elementIcons, key)) {
      const e = elementIcons[key]
      app.component(e.name, e)
    }
  }

  // 自动注册全局组件
  app.use(requireComponent)

  app.config.globalProperties.$message = elementUI.ElMessage
  app.config.globalProperties.$messageBox = elementUI.ElMessageBox
  app.config.globalProperties.$warn = (config: any) => {
    elementUI.ElMessage.warning(config)
  }

  // 注入的计算属性自动解包
  app.config.unwrapInjectedRef = true
}

export const createCubeUI = () => {
  elementUI = Element
  elementIcons = ElementIcons

  return {
    install
  }
}
export default {
  version: '1.0',
  install
}

export {
  fileContext,
  createStore,
  createRouter,
  createAxios,
  createApi,
  Navbar,
  Sidebar,
  AppMain
}
