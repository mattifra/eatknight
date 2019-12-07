const state = {
  loaderActive: false
}


const mutations = {
  'OPEN_LOADER'(state) {
    state.loaderActive = true
  },
  'CLOSE_LOADER'(state) {
    state.loaderActive = false
  }
};

const actions = {

  openLoader({commit}) {
    commit('OPEN_LOADER');
  },

  closeLoader({commit}) {
    commit('CLOSE_LOADER');
  }


};

const getters = {

  loaderActive (state) {
    return state.loaderActive;
  },

  
};

export default {
  state,
  mutations,
  actions,
  getters
}