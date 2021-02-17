import { getMenu } from '@/api/menu'
import { formatRoutes } from '@/utils/route'

// 添加/编辑页的路由，不需要加到菜单显示
let addRouters = []

const route = {
  state: {
    // 将展示在侧边栏的菜单
    // menuRouters: [], // constantRouterMap,
    menuRouters: [],
    // 将要添加到路由系统中的新路由
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.menuRouters = /* constantRouterMap.concat*/ routers
    },
    ADD_ROUTERS: (state, routers) => {
      state.addRouters = state.addRouters.concat(routers)
    },
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise((resolve) => {
        // let accessedRouters
        getMenu().then((routeRes) => {
          // 将请求回来的菜单转化成路由以及菜单信息
          let accessedRouters = routeRes.data.data
          addRouters = formatRoutes(routeRes.data.data)

          commit('SET_ROUTERS', accessedRouters)
          commit('ADD_ROUTERS', addRouters)
          resolve()
        })
      })
    },
  },
}

export default route
