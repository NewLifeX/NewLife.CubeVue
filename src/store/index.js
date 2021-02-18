import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import route from './modules/route'
import user from './modules/user'
import entity from './modules/entity'
import app from './modules/app'
import getters from './getters'

const store = new Vuex.Store({
  modules: {
    route,
    user,
    entity,
    app,
  },
  getters,
})

export default store
