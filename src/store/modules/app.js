import Storage from '@/utils/storage'
import urls from '@/api/constant'

const app = {
  state: {
    sidebar: {
      opened: !+Storage.getItem('sidebarStatus'),
      withoutAnimation: false,
    },
    device: 'desktop',
    size: Storage.getItem('size') || 'medium',
    urls: urls,
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      if (state.sidebar.opened) {
        Storage.setItem('sidebarStatus', 1)
      } else {
        Storage.setItem('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Storage.setItem('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Storage.setItem('size', size)
    },
    SET_URLS: (state, urls) => {
      Object.assign(state.urls, urls)
    },
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    },
    setUrls({ commit }, urls) {
      commit('SET_URLS', urls)
    },
  },
}

export default app
