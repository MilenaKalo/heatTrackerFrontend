// store/index.js

import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: false,
    userId: null
  },
  mutations: {
    setLoggedIn (state, value) {
      state.isLoggedIn = value
    },
    setUserId (state, id) {
      state.userId = id
    }
  },
  actions: {
    login ({ commit }, userId) {
      commit('setLoggedIn', true)
      commit('setUserId', userId)
    },
    logout ({ commit }) {
      commit('setLoggedIn', false)
      commit('setUserId', null)
    }
  },
  getters: {
  }
})
