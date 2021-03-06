import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
import moduleChat from './chat/moduleChat.js'
import moduleAuth from './auth/moduleAuth.js'
import shift from './shiftModule.js'


export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    chat: moduleChat,
    shift,
    auth: moduleAuth
  },
  strict: process.env.NODE_ENV !== 'production'
})
