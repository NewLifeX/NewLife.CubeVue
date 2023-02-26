import ApiBase from './api-base'

export class ApiDb extends ApiBase {
  /** 获取可用数据库连接列表 */
  public getDbList(path: string) {
    return this.request({
      url: path + 'getDbList',
      method: 'post'
    })
  }
}
