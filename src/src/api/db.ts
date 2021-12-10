import ApiBase from './api-base'

export default class Db extends ApiBase {
  /** 获取可用数据库连接列表 */
  public getDbList(path: string) {
    const urls = this.store.getters.urls
    return this.request({
      url: path + urls.getDbList,
      method: 'post'
    })
  }
}
