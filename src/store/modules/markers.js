const state = {
  markers: [],
  selectedMarker: {},
  infoWinOpen: false
}


const mutations = {
  'SELECT_MARKER'(state, marker) {
    state.selectedMarker = marker
  },
  'SET_MARKERS'(state, markerslist) {
    markerslist.forEach(el => {
      state.markers.push( el );
    })
  },
};

const actions = {
  selectMarker({commit}, data) {
    commit('SELECT_MARKER', data);
    commit('OPEN_INFOWIN', data);
    commit('UPDATE_INFOWIN', data);
  },
  setMarkers({commit}, data) {
    commit('SET_MARKERS', data);
  },

};

const getters = {
  selectedMarker (state) {
    return state.selectedMarker;
  },
  markers (state) {
    return state.markers;
  }
  
};

export default {
  state,
  mutations,
  actions,
  getters
}