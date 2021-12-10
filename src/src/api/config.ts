import { Store } from 'vuex'

export default function getApis(stroe: Store<{}>) {
  function getObject(path: string) {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    return request({
      url: path + urls.getObject,
      method: 'get',
    })
  }

  function updateObject(path: string, obj: object) {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    return request({
      url: path + urls.updateObject,
      method: 'post',
      data: obj,
    })
  }

  function getLoginConfig() {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    return request({
      url: urls.getLoginConfig,
      method: 'get',
    })
  }

  return {
    getObject,
    updateObject,
    getLoginConfig,
  }
}
