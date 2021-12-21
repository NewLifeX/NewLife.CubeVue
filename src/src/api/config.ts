import { Store } from 'vuex'
import ApiBase from './api-base'

export default function getApis(stroe: Store<{}>) {
  function getObject(path: string) {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    return request({
      url: path + urls.getObject,
      method: 'get'
    })
  }

  function updateObject(path: string, obj: object) {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    return request({
      url: path + urls.updateObject,
      method: 'post',
      data: obj
    })
  }

  function getLoginConfig() {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    return request({
      url: urls.getLoginConfig,
      method: 'get'
    })
  }

  return {
    getObject,
    updateObject,
    getLoginConfig
  }
}

export class ApiConfig extends ApiBase {
  public getObject(path: string) {
    const request = this.request

    return request({
      url: path + '/Index',
      method: 'get'
    })
  }

  public updateObject(path: string, obj: object) {
    const request = this.request

    return request({
      url: path + '/Update',
      method: 'post',
      data: obj
    })
  }

  public getLoginConfig() {
    const request = this.request

    return request({
      url: '/Admin/Cube/GetLoginConfig',
      method: 'get'
    })
  }
}
