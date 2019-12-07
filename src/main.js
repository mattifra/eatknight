import Vue from 'vue'
import VueRouter from 'vue-router';
import { routes } from './routes';
import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App.vue'
import store from './store/store'
//const fb = require('./firebaseConfig.js')
import "./assets/scss/config/global.scss"
import i18n from './i18n'


Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDFSrFaAhteO4J1RCbOKU8_KSzCsE7atpw',
    libraries: 'places',
    v: '3.38'
  }
})

const router = new VueRouter({
  mode: 'history',
  routes
});


new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')


