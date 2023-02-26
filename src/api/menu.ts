import ApiBase from './api-base'

export class ApiMenu extends ApiBase {
  public getMenu() {
    const request = this.request
    return request({
      url: '/Admin/Index/GetMenuTree',
      method: 'get'
    })
  }
}
