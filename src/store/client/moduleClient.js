/*=========================================================================================
  File Name: moduleClient.js
  Description: Client Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import state from './moduleClientState.js'
import mutations from './moduleClientMutations.js'
import actions from './moduleClientActions.js'
import getters from './moduleClientGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
