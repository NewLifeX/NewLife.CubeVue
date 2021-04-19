import App from './App.vue'
import StoreConfig from './store'
import RouterConfig from './router'
// console.log(Vue, Element, App, Vuex, VueRouter)
import getRequest from '@/utils/request'
import getApis from '@/api'

import '@/styles/index.scss' // global css

const files = require.context('@/views/', true, /^.*\.vue$/)

const install = (Vue) => {
  if (install.installed) return
  install.installed = true

  Vue.use(Vue.Vuex)
  Vue.use(Vue.VueRouter)

  const store = new Vue.Vuex.Store(StoreConfig)
  const router = new Vue.VueRouter(RouterConfig.routerOptions)

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
  store.dispatch('setMessage', Vue.Element.Message)
  store.dispatch('setMessageBox', Vue.Element.MessageBox)

  Vue.use(Vue.Element, { size: store.getters.app.size })
  Vue.config.productionTip = false
  Vue.prototype.$message = Vue.Element.Message
  Vue.prototype.$messageBox = Vue.Element.MessageBox
  Vue.prototype.$warn = (config) => {
    Vue.Element.Message.warning(config)
  }

  Object.defineProperties(Vue.prototype, {
    // 此处挂载在 Vue 原型的 $api 对象上
    $api: {
      get() {
        return store.getters.apis
      },
    },
  })

  Vue.Store = store
  Vue.Router = router
}

// // TODO 支持不完善
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue)
// }

export default {
  version: '1.0',
  install,
  App,
  StoreConfig,
  RouterConfig,
}
