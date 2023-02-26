import fileContext from '@/services/file-context'
import { formatRoutes } from '@/utils/route'

const route = {
  state: {
    // 将展示在侧边栏的菜单
    // menuRouters: [], // constantRouterMap,
    menuRouters: [],
    // 将要添加到路由系统中的新路由
    addRouters: [],
    // src/views 文件夹下的文件组件
    files(req: any) {
      console.log('no module')
      return null
    }
  },
  mutations: {
    SET_ROUTERS: (state: any, routers: any) => {
      state.addRouters = routers
      state.menuRouters = /* constantRouterMap.concat*/ routers
    },
    ADD_ROUTERS: (state: any, routers: any) => {
      state.addRouters = state.addRouters.concat(routers)
    },
    SET_FILES: (state: any, files: any) => {
      const map = state.files.map || {}
      files.keys().forEach((key: any) => {
        map[key] = files(key)
      })
      state.files = (req: any) => map[req]
      state.files.map = map
      state.files.keys = () => Object.keys(map)
    }
  },
  actions: {
    generateRoutes({ commit, state }: any, accessedRouters: any) {
      // 将请求回来的菜单生成为路由
      const addRouters = formatRoutes(fileContext, accessedRouters)
      commit('SET_ROUTERS', addRouters)
    },
    setRouters({ commit }: any, addRouters: any) {
      commit('SET_ROUTERS', addRouters)
    },
    setFiles({ commit }: any, files: any) {
      commit('SET_FILES', files)
    }
  }
}

export default route
