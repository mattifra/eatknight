<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="getNearbyPlacesFromSearch">Add</button>
      </label>
      <br/>
    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="14"
      ref="mapRef"
      @bounds_changed="setBounds"
      @idle="getPlacesFromBounds"
      style="width:100%;  height: 400px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.geometry.location"
        @click="openInfo(m)" ></gmap-marker>
        <InfoWindow />
    </gmap-map>
    <p>{{place}} </p>
  
  </div>

</template>

<script>

import {gmapApi} from 'vue2-google-maps'
import InfoWindow from './InfoWindow'
import {mapGetters} from 'vuex';


export default {
  name: "NightLocator",
  components: {
    InfoWindow
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
  },


  methods: {

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
        keyword: 'sushi'
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


    getNearbyPlacesFromSearch() {
      this.getNearbyPlacesFromCenter();
    },
    

    getNearbyPlacesFromCenter() {
      let request = {
        location: this.center,
        radius: 1000,
        keyword: 'sushi'
      };
      this.gmapNearbySearch(request, true)

    },

    gmapNearbySearch(req, setCenter) {

      let service, request = req;

      this.$refs.mapRef.$mapPromise.then((map) => {
        service = new this.google.maps.places.PlacesService(map);
        service.nearbySearch(request,(results, status) => {
          if (status === this.google.maps.places.PlacesServiceStatus.OK) {
            this.$store.dispatch('setMarkers', results)
            console.log(this.markers);
            if (setCenter) map.setCenter(results[0].geometry.location);
          }
        });
      })
    }

  }
};
</script>