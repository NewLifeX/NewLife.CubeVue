import { Store } from 'vuex'
import configFun from './config'
import dbFun from './db'
import entityFun from './entity'
import menuFun from './menu'
import userFun from './user'

export default function(state: Store<{}>) {
  const apis = {}
  Object.assign(apis, configFun(state))
  // Object.assign(apis, new dbFun(state))
  Object.assign(apis, entityFun(state))
  Object.assign(apis, menuFun(state))
  Object.assign(apis, userFun(state))

  return apis
}
