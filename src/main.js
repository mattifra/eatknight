import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App.vue'
import store from './store/store'
//const fb = require('./firebaseConfig.js')
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faCompass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faTimes,
  faCompass
)


Vue.component('font-awesome-icon', FontAwesomeIcon)



Vue.config.productionTip = false

 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDFSrFaAhteO4J1RCbOKU8_KSzCsE7atpw',
    libraries: 'places',
    v: '3.38'
  }
})


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')


