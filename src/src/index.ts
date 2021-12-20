import StoreConfig from './store'
import routerConfig from './router'
// console.log(Vue, Element, App, Vuex, VueRouter)
import { createAxios } from '@/utils/request'
import getApis from '@/api'
import requireComponent from '@/utils/requireComponent'
import { Navbar, Sidebar, AppMain } from '@/views/layout/components/index'
import fileContext from './services/file-context'

import '@/styles/index.scss' // global css
import { createWebHashHistory } from 'vue-router'
import { getMenu } from './utils/menu'

const files = require.context('@/views/', true, /^.*\.vue$/)
// 注入视图文件
fileContext.addFiles(files)

let store: any
let elementUI: any
let elementIcons: any

const install: any = (app: any) => {
  if (install.installed) {
    return
  }
  install.installed = true

  if (!store) {
    console.error('请先使用createCubeUI创建store')
    return
  }

  app.component('Navbar', Navbar)
  app.component('Sidebar', Sidebar)
  app.component('AppMain', AppMain)

  // 注册组件
  store.dispatch('setFiles', files)

  // 注册请求封装和api
  const axios = createAxios(app)
  axios.interceptors.request.use((config) => {
    config.baseURL = store.getters.urls.getBaseUrl()
    return config
  })

  const apis = getApis(store)
  // console.log(stroe)
  store.dispatch('setRequest', axios)
  // console.log(stroe.getters.request)
  store.dispatch('addApis', apis)

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
  const router = routerConfig.install(app, (options) => {
    // options.history = createWebHashHistory()

    // 从本地缓存加载的路由必须在这里添加
    // 否则在已登录的情况，先进行导航再动态添加路由，导致找不到页面
    options.routes = menuRouters.concat(options.routes)
  })

  app.use(store)

  app.use(elementUI, { size: store.getters.app.size })
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
    elementUI.MessageEl.warning(config)
  }
  app.config.globalProperties.$api = store.getters.apis

  // 注入的计算属性自动解包
  app.config.unwrapInjectedRef = true
}

export const createCubeUI = (
  VueRouter: any,
  Vuex: any,
  Element: any,
  ElementIcons: any
) => {
  store = Vuex.createStore(StoreConfig)

  elementUI = Element
  elementIcons = ElementIcons

  return {
    install,
    store
  }
}

export default {
  version: '1.0',
  install,
  StoreConfig,
  createCubeUI
}
