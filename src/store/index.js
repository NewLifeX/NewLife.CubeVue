import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import route from './modules/route'
import user from './modules/user'
import entity from './modules/entity'
import sysConfig from './modules/sysConfig'
import getters from './getters'

const store = new Vuex.Store({
  modules: {
    route,
    user,
    entity,
    sysConfig,
  },
  getters,
})

export default store
