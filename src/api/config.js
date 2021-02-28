import stroe from '@/store'

export function getObject(path) {
  const request = stroe.getters.request
  const urls = stroe.getters.urls
  return request({
    url: path + urls.getObject,
    method: 'get',
  })
}

export function updateObject(path, obj) {
  const request = stroe.getters.request
  const urls = stroe.getters.urls
  return request({
    url: path + urls.updateObject,
    method: 'post',
    data: obj,
  })
}

export function getLoginConfig() {
  const request = stroe.getters.request
  const urls = stroe.getters.urls
  return request({
    url: urls.getLoginConfig,
    method: 'get',
  })
}
