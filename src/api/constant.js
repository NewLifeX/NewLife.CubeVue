export default {
  // baseUrl: '',
  // baseUrl: 'http://localhost:5000',
  baseUrl: 'http://81.69.253.197:8000',
  // ssoUrl: 'http://localhost:5000',
  getBaseUrl() {
    // 获取基础请求路径，可重载
    return this.baseUrl
  },
  ssoUrl: 'https://sso.newlifex.com',
  login: '/Admin/User/Login',
  getToken: '/Sso/LoginInfo',
  getUserInfo: '/Admin/User/Info/',
  logout: '/Admin/User/Logout',
  getMenu: '/Admin/Index/GetMenuTree',
  getEntityFields: '/GetFields',
  getDataList: '/Index',
  getData: '/Edit',
  deleteById: '/Delete',
  add: '/Add',
  edit: '/Edit',
  getObject: '/Index',
  updateObject: '/Update',
  getLoginConfig: '/Admin/Cube/GetLoginConfig',
}
