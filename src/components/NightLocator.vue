<template>
  <div>
    <div class="Header">
      <h2 class="m0">{{ $t('map.title') }}</h2>
      <p class="m0">{{ $t('map.subtitle') }}</p>
      <SearchInput />
      <button @click="geolocate" class="Btn Btn--Round Geolocate">
        <SvgIcon :name="'locate'" />
      </button>
    </div>
    <gmap-map
      :center="center"
      :zoom="14"
      ref="mapRef"
      :options="Opts"
      @bounds_changed="setBounds"
      @idle="getPlacesFromBounds">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.geometry.location"
        :icon="MarkerIcon"
        :visible="isAval(m)"
        @click="openInfo(m)" ></gmap-marker>
      <gmap-marker
        :key="index"
        v-for="(m, index) in SuggMarkers"
        :position="m.geometry.location"
        :icon="MarkerIcon"
        :visible="isAval(m)"
        @click="openInfo(m)" ></gmap-marker>
        <gmap-marker
        :position="PosMarker"
        :icon="UserIcon"
        :visible="true" ></gmap-marker>
    </gmap-map>
     <Detail />
  </div>

</template>

<script>

import {gmapApi} from 'vue2-google-maps'
import SearchInput from './SearchInput'
import {mapGetters} from 'vuex'
import Now from '../data/date'
import { MAP} from '../data/map'
import SvgIcon from './SvgIcon.vue'
import {db } from '../firebaseConfig.js';




export default {
  name: "NightLocator",
  components: {
    SearchInput,
    SvgIcon,
    'Detail': () => import('./Detail.vue')
  },

  data() {
    return {
      Now: new Date(Now),
      MarkerIcon: MAP.MARKER_ICON,
      UserIcon: MAP.USER_ICON,
      Opts: MAP.OPTS,
      SuggMarkers: null,
      PosMarker: null
    }
  },

  computed: {
    google: gmapApi,

    ...mapGetters({
      center: 'center',
      place: 'place',
      bounds: 'bounds',
      selectedMarker: 'selectedMarker',
      markers: 'markers'
    }),

    
  },

  mounted() {
    this.geolocate();
    this.suggestedMarkers();
  },


  methods: {

    suggestedMarkers() {
      let stores = db.ref('stores');
      stores.on('value', (snapshot) => {
        this.SuggMarkers = snapshot.val();
        console.log('DB:', this.SuggMarkers)
      })
    },

    
    isAval(m) {
      let isOpen;
      try { isOpen = m.opening_hours.isOpen(this.Now)}
      catch(e) {isOpen = true }
      return isOpen
    },

    openInfo(marker) {
      this.$store.dispatch('selectMarker', marker);
    },

    setBounds(bounds) {
      if (bounds) this.$store.dispatch('setBounds', bounds)
    },
   

    getPlacesFromBounds() {

      console.log(this.bounds)
      let request = {
        bounds: this.bounds,
        keyword: 'food'
      };
      this.gmapNearbySearch(request)
    },
 
    geolocate() {

      navigator.geolocation.getCurrentPosition(position => {
        const pos = {lat: position.coords.latitude, lng: position.coords.longitude};
        this.PosMarker = pos;

        
        this.$refs.mapRef.$mapPromise.then((map) => {
          map.setCenter(pos)
          map.setZoom(16)
        })
        this.$store.dispatch('setCenter', pos).then(resp => {
          this.getNearbyPlacesFromCenter();
          console.log(resp)
        });
        
      });
    },
    

    getNearbyPlacesFromCenter() {
      let request = {
        location: this.center,
        radius: 1000,
        keyword: ['restaurant', 'bar', 'kebab', 'bakery', 'meal_takeaway'],
        openNow: true
      };
      this.gmapNearbySearch(request, true)

    },


    gmapNearbySearch(req, setCenter) {

      let service, request = req;
      

      this.$refs.mapRef.$mapPromise.then((map) => {
        service = new this.google.maps.places.PlacesService(map);
        service.nearbySearch(request,(results, status) => {
          if (status === this.google.maps.places.PlacesServiceStatus.OK) {
            results.forEach(el => {
              this.gmapGetDetails(el)
            })
            this.$store.dispatch('setMarkers', this.markers)
            console.log(this.markers)
  
            if (setCenter) map.setCenter(results[0].geometry.location);
          }
        });
      })

     ;

    },

    gmapGetDetails(el) {

      let filterClosing = (shop) => {
        return (shop.close.time  >  2300 || shop.close.time < 600)
      }

      const request = {
        placeId: el.place_id,
        fields: ['name', 'rating', 'formatted_phone_number', 'vicinity', 'geometry', 'opening_hours', 'utc_offset_minutes' , 'photos']
      };

      this.$refs.mapRef.$mapPromise.then((map) => {
        let service = new this.google.maps.places.PlacesService(map);
        service.getDetails(request, (place, status)=> {
          if (status === this.google.maps.places.PlacesServiceStatus.OK && place.opening_hours  ) {
            let periods = place.opening_hours.periods;
            let shops = periods.filter(filterClosing);
            if (shops.length > 0) {
              this.markers.push( place );
            }
          }
        });
      })
    }

  }
};
</script>


<style lang="scss">

.vue-map-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.Header {
  position: relative;
  background: #fff;
  z-index: 1;
  border-radius: 100px;
  padding: 8px 70px;
  box-shadow: $primary-shadow;

  p {
    font-size: 13px;
  }

  h2, p {
    text-align: center;
  }
}

.Geolocate {
  position: absolute;
  bottom: -32px;
  right: 15px;
}


</style>
