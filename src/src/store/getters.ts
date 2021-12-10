const getters = {
  token: (state: any) => state.user.token,
  userInfo: (state: any) => state.user.userInfo,
  menuRouters: (state: any) => state.route.menuRouters,
  addRouters: (state: any) => state.route.addRouters,
  files: (state: any) => state.route.files,
  sysConfig: (state: any) => state.app.sysConfig,
  loginConfig: (state: any) => state.app.loginConfig,
  sidebar: (state: any) => state.app.sidebar,
  app: (state: any) => state.app,
  urls: (state: any) => state.app.urls,
  request: (state: any) => state.api.request,
  apis: (state: any) => state.api.apis,
  message: (state: any) => state.app.message,
  messageBox: (state: any) => state.app.messageBox
}
export default getters
