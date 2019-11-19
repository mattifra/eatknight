const state = {
  infoWinOpen: false,
  infoWinPos: null
}


const mutations = {
  'OPEN_INFOWIN'(state) {
    state.infoWinOpen = true
  },
  'CLOSE_INFOWIN'(state) {
    state.infoWinOpen = false
  },
  'UPDATE_INFOWIN'(state, data) {
    state.infoWinPos = data.geometry.location
  },
};

const actions = {

  closeInfoWin({commit}) {
    commit('CLOSE_INFOWIN');
  },

};

const getters = {

  infoWinOpen (state) {
    return state.infoWinOpen;
  },

  infoWinPos (state) {
    return state.infoWinPos;
  },
  
};

export default {
  state,
  mutations,
  actions,
  getters
}