/*=========================================================================================
  File Name: moduleClientMutations.js
  Description: Client Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_CLIENT_SEARCH_QUERY (state, query) {
    state.clientSearchQuery = query
  },
  UPDATE_CLIENT_FILTER (state, filter) {
    state.clientFilter = filter
  },
  CHNAGE_CLIENT_COLUMNS (state, data) {
    state.columnDef = data
  },
  // API
  SET_CLIENTS (state, clients) {
    state.clients = clients
  },
  ADD_CLIENT (state, client) {
    state.clients.unshift(client)
  },
  UPDATE_CLIENT (state, client) {
    const clientIndex = state.clients.findIndex((t) => t.id === client.id)
    Object.assign(state.clients[clientIndex], client)
  },
  SET_COLUMNS (state, columns) {
    state.columnDef = columns
  }
}
  