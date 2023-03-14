import { removeMenu } from '@/utils/menu'
import { removeToken } from '@/utils/token'
import { removeUserInfo } from '@/utils/user'
import ApiBase from './api-base'

export class ApiUser extends ApiBase {
  public login(loginForm: any) {
    const request = this.request

    return request({
      url: '/Admin/User/Login',
      method: 'post',
      data: loginForm
      // params: data,
    })
  }

  /**
   * 注销登陆之后，移除token、用户信息、菜单
   * @returns
   */
  public logout() {
    const request = this.request

    return request({
      url: '/Admin/User/Logout',
      method: 'get'
    }).then(() => {
      // TODO 如果不放这里，则考虑在调用此方法的地方使用事件总线
      removeToken()
      removeUserInfo()
      removeMenu()
    })
  }

  public getUserInfo() {
    const request = this.request

    return request({
      url: '/Admin/User/Info/',
      method: 'get'
    })
  }

  public updateUserInfo(userInfo: any) {
    const request = this.request

    return request({
      url: '/Admin/User/Info/',
      method: 'post',
      data: userInfo
    })
  }

  public changePassword(data: any) {
    const request = this.request

    return request({
      url: '/Admin/User/ChangePassword',
      method: 'post',
      data
    })
  }
}
