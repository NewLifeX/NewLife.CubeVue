import ApiBase from './api-base'

export default function(stroe: any) {
  function getMenu() {
    const request = stroe.getters.request
    const urls = stroe.getters.urls
    return request({
      url: urls.getMenu,
      method: 'get'
    })
  }

  return {
    getMenu
  }
}

export class ApiMenu extends ApiBase {
  public getMenu() {
    const request = this.request
    return request({
      url: '/Admin/Index/GetMenuTree',
      method: 'get'
    })
  }
}
