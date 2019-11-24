<template>
  <div>
    <div class="Header">
      <h2>Hungry?</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="geolocate">Localizeme</button>
      </label>
      <br/> 
    </div>
    <gmap-map
      :center="center"
      :zoom="14"
      ref="mapRef"
      :options="{
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        styles: Styles
      }"
      @bounds_changed="setBounds"
      @idle="getPlacesFromBounds">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.geometry.location"
        :icon="MarkerIcon"
        :visible="isAval(m)"
        @click="openInfo(m)" ></gmap-marker>
        <InfoWindow />
    </gmap-map>

  </div>

</template>

<script>

import {gmapApi} from 'vue2-google-maps'
import InfoWindow from './InfoWindow'
import {mapGetters} from 'vuex'
import Now from '../data/date'
import { MAP} from '../data/map'



export default {
  name: "NightLocator",
  components: {
    InfoWindow
  },

  data() {
    return {
      Now: new Date(Now),
      MarkerIcon: MAP.MARKER_ICON,
      Styles: MAP.STYLE
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
    })
  },

  mounted() {
    this.geolocate();
  },


  methods: {

    
    isAval(m) {
      return m.opening_hours.isOpen(this.Now)
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

    // receives a place object via the autocomplete component
    setPlace(place) {
      this.$store.dispatch('setPlace', place);
    },
 
    geolocate() {

      navigator.geolocation.getCurrentPosition(position => {
        this.$store.dispatch('setCenter', {lat: position.coords.latitude, lng: position.coords.longitude});
        this.getNearbyPlacesFromCenter();
      });
    },
    

    getNearbyPlacesFromCenter() {
      let request = {
        location: this.center,
        radius: 1000,
        keyword: 'sushi',
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
            console.log(this.markers);
            if (setCenter) map.setCenter(results[0].geometry.location);
          }
        });
      }
      )
    },

    gmapGetDetails(el) {

      const request = {
        placeId: el.place_id,
        fields: ['name', 'rating', 'formatted_phone_number', 'vicinity', 'geometry', 'opening_hours', 'utc_offset_minutes']
      };

      this.$refs.mapRef.$mapPromise.then((map) => {
        let service = new this.google.maps.places.PlacesService(map);
        service.getDetails(request, (place, status)=> {
          if (status === this.google.maps.places.PlacesServiceStatus.OK && place.opening_hours  ) {
            let isOpen = place.opening_hours.isOpen(new Date(Now));
            this.markers.push( place );
            let closeTime = place.opening_hours.periods;
            console.log(closeTime)
            console.log(isOpen)
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
  margin: 20px;
  border-radius: 20px;
  padding: 8px;

   h2 {
    margin: 0 0 8px 0;
  }
}



</style>
