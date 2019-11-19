import Vue from 'vue'
import Vuex from 'vuex'
import map from './modules/map'
import markers from './modules/markers'
import infoWindow from './modules/infoWindow'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      map,
      markers,
      infoWindow
  }
});