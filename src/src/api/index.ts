import { AxiosInstance } from 'axios'
import { App } from 'vue'
import ApiBase from './api-base'
import { ApiConfig } from './config'
import { ApiMenu } from './menu'
import { ApiUser } from './user'

let api: Api

export const createApi = (app: App<Element>, request: AxiosInstance) => {
  api = {
    base: new ApiBase(request),
    user: new ApiUser(request),
    menu: new ApiMenu(request),
    config: new ApiConfig(request)
  }

  app.config.globalProperties.$api = api

  return api
}

export interface Api {
  base: ApiBase
  user: ApiUser
  menu: ApiMenu
  config: ApiConfig
}

export function getApi() {
  if (!api) {
    throw new Error('请调用createApi方法创建api')
  }
  return api
}
