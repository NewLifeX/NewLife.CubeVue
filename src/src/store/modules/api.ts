const app = {
  state: {
    // api对象，根据方法名区分、替换
    apis: {},
    // http请求封装
    request: () => {
      throw new Error('request方法没有实现')
    }
  },
  mutations: {
    SET_APIS: (state: any, apis: any) => {
      Object.assign(state.apis, apis)
    },
    SET_REQUEST: (state: any, request: any) => {
      state.request = request
    }
  },
  actions: {
    addApis({ commit }: any, apis: any) {
      commit('SET_APIS', apis)
    },
    setRequest({ commit }: any, request: any) {
      commit('SET_REQUEST', request)
    }
  }
}

export default app
