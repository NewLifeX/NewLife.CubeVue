import request from '@/utils/request'
import urls from './constant'

export function login(username, password, remember) {
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
  return request({
    url: urls.logout,
    method: 'get',
  })
}

export function getUserInfo() {
  return request({
    url: urls.getUserInfo,
    method: 'get',
  })
}
