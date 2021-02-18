import { login, logout, getUserInfo } from '@/api/user'
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
    // 用户名登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then((response) => {
            const data = response.data.data
            let token = data.token
            commit('SET_TOKEN', token)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    SetToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((response) => {
            if (!response.data) {
              // 由于mockjs 不支持自定义状态码只能这样hack
              reject('error')
            }

            const data = response.data.data

            commit('SET_USERINFO', data)
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('REMOVE_TOKEN')
            commit('REMOVE_USERINFO')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
}

export default user
