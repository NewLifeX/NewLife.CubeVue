import request from '@/utils/request'
import urls from './constant'

export function getObject(path) {
  return request({
    url: path + urls.getObject,
    method: 'get',
  })
}

export function updateObject(path, obj) {
  return request({
    url: path + urls.updateObject,
    method: 'post',
    data: obj,
  })
}

export function getLoginConfig() {
  return request({
    url: urls.getLoginConfig,
    method: 'get',
  })
}
