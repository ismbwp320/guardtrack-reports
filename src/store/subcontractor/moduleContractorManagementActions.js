/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios.js'

export default {
  addContractor({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios.post("/api/data-list/products/", {data})
        .then((response) => {
          commit('ADD_CLIENT', Object.assign(data, {id: response.data.id}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchContractors ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/user-management/users')
        .then((response) => {
          commit('SET_USERS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchCOntractor (context, contractorId) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/user-management/users/${contractorId}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeRecord ({ commit }, contractorId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/user-management/users/${contractorId}`)
        .then((response) => {
          commit('REMOVE_RECORD', contractorId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
