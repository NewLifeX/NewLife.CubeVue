import { AxiosInstance } from 'axios'
import { App } from 'vue'
import { Store } from 'vuex'
import ApiBase from './api-base'
import configFun, { ApiConfig } from './config'
// import dbFun from './db'
import entityFun from './entity'
import menuFun, { ApiMenu } from './menu'
import userFun, { ApiUser } from './user'

let api: Api

export default function(state: Store<{}>) {
  const apis = {}
  Object.assign(apis, configFun(state))
  // Object.assign(apis, new dbFun(state))
  Object.assign(apis, entityFun(state))
  Object.assign(apis, menuFun(state))
  Object.assign(apis, userFun(state))

  return apis
}

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
