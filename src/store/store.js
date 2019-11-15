import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    count: 0,
    place: ''
  },
  mutations: {
    increment (state) {
      state.count++
    },

    setPlace (state, pl) {
      state.place = pl
    }
    
  }
})