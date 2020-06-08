/*=========================================================================================
  File Name: moduleClientActions.js
  Description: Client Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios.js'

export default {

  //Search Clients
  setClientSearchQuery ({ commit }, query) {
    commit('SET_CLIENT_SEARCH_QUERY', query)
  },

  //Get Clients
  fetchClients ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get('https://jsonplaceholder.typicode.com/posts', { params: {filter: payload.filter} })
        .then((response) => {
          commit('SET_CLIENTS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  //Add Client
  addClient ({ commit }, client) {
    return new Promise((resolve, reject) => {
      axios.post('/api/apps/clients', {client})
        .then((response) => {
          commit('ADD_CLIENT', Object.assign(client, {id: response.data.id}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  //Update Client
  updateClient ({ commit }, client) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/apps/client/${client.id}`, {client})
        .then((response) => {
          commit('UPDATE_CLIENT', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },


  //update columns

  updateColumn ({ commit }, client) {

  }


}
