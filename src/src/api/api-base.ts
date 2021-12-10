import { AxiosInstance } from 'axios'
import { Store } from 'vuex'

/**
 * 请求基类
 */
class ApiBase {
  /** axios实例 */
  public request: AxiosInstance

  /** 状态管理Vuex实例 */
  public store: Store<any>

  constructor(request: AxiosInstance, store: Store<any>) {
    this.request = request
    this.store = store
  }
}

export default ApiBase
