import StoreConfig from './store'
import RouterConfig from './router'
// console.log(Vue, Element, App, Vuex, VueRouter)
import getRequest from '@/utils/request'
import getApis from '@/api'

import '@/styles/index.scss' // global css

const files = require.context('@/views/', true, /^.*\.vue$/)

let store, router, elementUI, elementIcons

const install = (app) => {
  if (install.installed) return
  install.installed = true

  if (!store || !router) {
    console.error('请先使用createCubeUI创建store, router')
    return
  }

  app.use(router)
  app.use(store)
  app.use(elementUI, { size: store.getters.app.size })
  for (const key in elementIcons) {
    const e = elementIcons[key]
    app.component(e.name, e)
  }

  app.config.globalProperties.$message = elementUI.ElMessage
  app.config.globalProperties.$messageBox = elementUI.ElMessageBox
  app.config.globalProperties.$warn = (config) => {
    elementUI.MessageEl.warning(config)
  }
  app.config.globalProperties.$api = store.getters.apis
}

export const createCubeUI = (VueRouter, Vuex, Element, ElementIcons) => {
  // if (install.installed) return
  // install.installed = true

  // app.use(app.Vuex)
  // app.use(app.VueRouter)

  // console.log(VueRouter, Vuex, Element, ElementIcons)

  store = Vuex.createStore(StoreConfig)

  router = VueRouter.createRouter({
    ...RouterConfig.routerOptions,
    history: VueRouter.createWebHistory()
  })
  elementUI = Element
  elementIcons = ElementIcons

  // 注册组件
  store.dispatch('setFiles', files)
  // 注册路由导航
  router.beforeEach(RouterConfig.beforeEach(store, router))
  // 注册请求封装和api
  const rqeuest = getRequest(store)
  const apis = getApis(store)
  // console.log(stroe)
  store.dispatch('setRequest', rqeuest)
  // console.log(stroe.getters.request)
  store.dispatch('addApis', apis)

  store.dispatch('setMessage', elementUI.ElMessage)
  store.dispatch('setMessageBox', elementUI.ElMessageBox)

  return {
    install,
    router,
    store
  }
}

// // TODO 支持不完善
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }

export default {
  version: '1.0',
  install,
  StoreConfig,
  RouterConfig
}
