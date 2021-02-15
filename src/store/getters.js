const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  menuRouters: (state) => state.route.menuRouters,
  addRouters: (state) => state.route.addRouters,
  sysConfig: (state) => state.sysConfig.sysConfig,
  sidebar: (state) => state.app.sidebar,
  app: (state) => state.app,
}
export default getters
