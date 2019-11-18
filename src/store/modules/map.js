const state = {
  center: { lat: 43.616943, lng: 13.516667 },
  place: ''

}

const mutations = {
  'SET_CENTER'(state, {lat, lng}) {
     state.center = {
      lat: lat,
      lng: lng
    };
  },
  'SET_PLACE'(state, place) {
    state.place = place
 }
};

const actions = {

  setCenter({commit}, data) {
    commit('SET_CENTER', data);
  },

  //when updating pace, update also center
  setPlace({commit}, data) {
    commit('SET_PLACE', data);
    commit('SET_CENTER', {
      lat: data.geometry.location.lat(), 
      lng: data.geometry.location.lng()
    });
  }
};

const getters = {
  
  center (state) {
    return state.center;
  },
  place (state) {
    return state.place;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}