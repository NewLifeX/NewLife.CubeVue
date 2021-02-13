const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  menuRouters: (state) => state.route.menuRouters,
  addRouters: (state) => state.route.addRouters,
}
export default getters
