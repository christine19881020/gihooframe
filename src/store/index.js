import Vue from 'vue'
import Vuex from 'vuex'

import types from './modules/types'
import user from './modules/user'
import getters from './getters'
import behind from './modules/behind'
import route from './modules/route'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    types,
    user,
    behind,
    route
  },
  getters
})

export default store
