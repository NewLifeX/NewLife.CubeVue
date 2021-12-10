export default function(stroe: any) {
  function login(loginForm: any) {
    const request = stroe.getters.request
    const urls = stroe.getters.urls

    return request({
      url: urls.login,
      method: 'post',
      data: loginForm
      // params: data,
    })
  }

  function logout() {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    return request({
      url: urls.logout,
      method: 'get'
    })
  }

  function getUserInfo() {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    return request({
      url: urls.getUserInfo,
      method: 'get'
    })
  }

  function updateUserInfo(userInfo: any) {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    return request({
      url: urls.getUserInfo,
      method: 'post',
      data: userInfo
    })
  }

  function changePassword(data: any) {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    return request({
      url: urls.changePassword,
      method: 'post',
      data
    })
  }

  return {
    login,
    logout,
    getUserInfo,
    updateUserInfo,
    changePassword
  }
}
