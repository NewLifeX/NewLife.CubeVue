import ApiBase from './api-base'

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
