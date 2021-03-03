import { getToken, setToken, removeToken } from '@/utils/token'
import * as userInfoStorage from '@/utils/user'

const user = {
  state: {
    userInfo: undefined, //userInfoStorage.getUserInfo(),
    token: getToken(),
  },

  mutations: {
    SET_USERINFO: (state, userInfo) => {
      userInfoStorage.setUserInfo(userInfo)
      state.userInfo = userInfo
    },
    REMOVE_USERINFO: (state) => {
      userInfoStorage.removeUserInfo()
      state.userInfo = undefined
    },
    SET_TOKEN: (state, token) => {
      setToken(token)
      state.token = token
    },
    REMOVE_TOKEN: (state) => {
      removeToken()
      state.token = undefined
    },
  },

  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    // 设置用户信息
    setUserInfo({ commit }, userInfo) {
      commit('SET_USERINFO', userInfo)
    },
    // 登出
    logout({ commit, state }) {
      // 移除token
      commit('REMOVE_TOKEN')
      // 移除用户信息
      commit('REMOVE_USERINFO')
      // TODO 移除配置
      // commit('REMOVE_USERINFO')
    },
  },
}

export default user
