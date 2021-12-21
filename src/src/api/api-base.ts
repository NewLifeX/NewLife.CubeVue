import { AxiosInstance } from 'axios'

/**
 * 请求基类
 */
class ApiBase {
  /** axios实例 */
  public request: AxiosInstance

  constructor(request: AxiosInstance) {
    this.request = request
    return this
  }

  /**
   * 获取表对应的列
   * @param {*} path 基础请求路径
   * @returns
   */
  public getColumns(path: string) {
    const request = this.request
    return request({
      url: path + '/GetColumns',
      method: 'get'
    })
  }

  public getDataList(path: string, page: any) {
    const request = this.request
    return request({
      url: path + '/Index',
      method: 'post',
      data: page
    })
  }

  public getData(path: string, id: any) {
    const request = this.request
    const params = {
      id
    }
    return request({
      url: path + '/Edit',
      method: 'get',
      params
    })
  }

  public getDetailData(path: string, id: any) {
    const request = this.request
    const params = {
      id
    }
    return request({
      url: path + '/Detail',
      method: 'get',
      params
    })
  }

  public deleteById(path: string, id: any) {
    const request = this.request
    const params = {
      id
    }
    return request({
      url: path + '/Delete',
      method: 'get',
      params
    })
  }

  public add(path: string, entity: any) {
    const request = this.request
    return request({
      url: path + '/Add',
      method: 'post',
      data: entity
    })
  }

  public edit(path: string, entity: any) {
    const request = this.request
    return request({
      url: path + '/Edit',
      method: 'post',
      data: entity
    })
  }
}

export default ApiBase
