import { getMenu } from '@/api/menu'
import { formatRoutes } from '@/utils/route'

const route = {
  state: {
    // 将展示在侧边栏的菜单
    // menuRouters: [], // constantRouterMap,
    menuRouters: [],
    // 将要添加到路由系统中的新路由
    addRouters: [],
    // src/views 文件夹下的文件组件
    files: function(req) {
      console.log('no module')
      return null
    },
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.menuRouters = /* constantRouterMap.concat*/ routers
    },
    ADD_ROUTERS: (state, routers) => {
      state.addRouters = state.addRouters.concat(routers)
    },
    SET_FILES: (state, files) => {
      let map = state.files.map || {}
      files.keys().forEach((key) => {
        map[key] = files(key)
      })
      state.files = function(req) {
        return map[req]
      }
      state.files.map = map
      state.files.keys = function() {
        return Object.keys(map)
      }
    },
  },
  actions: {
    generateRoutes({ commit, state }) {
      return new Promise((resolve) => {
        // let accessedRouters
        getMenu().then((routeRes) => {
          // 将请求回来的菜单转化成路由以及菜单信息
          let accessedRouters = routeRes.data.data
          let addRouters = formatRoutes(state.files, accessedRouters)

          commit('SET_ROUTERS', addRouters)
          // commit('ADD_ROUTERS', addRouters)
          resolve()
        })
      })
    },
    setFiles({ commit }, files) {
      commit('SET_FILES', files)
    },
  },
}

export default route
