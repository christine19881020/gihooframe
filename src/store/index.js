import Vue from 'vue'
import Vuex from 'vuex'

import types from './modules/types'
import user from './modules/user'
import getters from './getters'
import behind from './modules/behind'
import route from './modules/route'
import loginvuex from './modules/loginvuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    types,
    user,
    behind,
    route,
    loginvuex
  },
  getters
})

export default store
