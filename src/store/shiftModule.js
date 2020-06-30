import axios from '@/axios.js'

const shift = {
  
  state: {
    
    shifts: null
  
  },

  getters : {
    
    SHIFTS : state => {
      return state.shifts
    }

  },

  mutations: {
    
    SET_SHIFTS : (state, payload) => {
      state.shifts = payload
    },

    ADD_SHIFT : (state, payload) => {
      state.shifts.push(payload)
    }

  },

  // SHIFTS ACTIONS
  actions:{

    // GET ALL SHIFTS URL
    GET_SHIFTS : async ({ commit }, payload) => {

      const { data } = await axios.get(`${payload}`) 
      commit('SET_SHIFTS', data)

    },

    // SAVE NEW SHIFT
    SAVE_SHIFT : async ({commit}, payload) => {

      const { data } = await axios.post(`${payload}`) 
      commit('ADD_SHIFT', data)

    }

  }
}

export default shift