import { getObject } from '@/api/entity'

const route = {
  state: {
    sysConfig: {},
  },
  mutations: {
    SET_SYSCONFIG: (state, cfg) => {
      state.sysConfig = cfg
    },
  },
  actions: {
    async getSysConfig({ commit }) {
      const path = '/Admin/Sys'
      let res = await getObject(path)
      let cfg = res.data.data.Value
      commit('SET_SYSCONFIG', cfg)
    },
  },
}

export default route
