import stroe from '@/store'

export function login(username, password, remember) {
  const request = stroe.getters.request
  const urls = stroe.getters.urls
  // let data = new FormData();
  // data.append("username", username);
  // data.append("password", password);
  // 改为get
  const data = {
    username,
    password,
    remember,
  }

  return request({
    url: urls.login,
    method: 'post',
    data,
    // params: data,
  })
}

export function logout() {
  const request = stroe.getters.request
  const urls = stroe.getters.urls
  return request({
    url: urls.logout,
    method: 'get',
  })
}

export function getUserInfo() {
  const request = stroe.getters.request
  const urls = stroe.getters.urls
  return request({
    url: urls.getUserInfo,
    method: 'get',
  })
}
