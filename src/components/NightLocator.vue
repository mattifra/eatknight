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
      :zoom="12"
      ref="mapRef"
      style="width:100%;  height: 400px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position" ></gmap-marker>
    </gmap-map>
    <p>{{place}} </p>
    <HelloWorld msg="ciao" />
  
  </div>

</template>

<script>

import {gmapApi} from 'vue2-google-maps'
import HelloWorld from './HelloWorld'
import {mapGetters} from 'vuex';


export default {
  name: "NightLocator",
  components: {
    HelloWorld
  },
  data() {
    return {
      markers: [],
      places: [],
    };
  },

  computed: {
    google: gmapApi,
    ...mapGetters({
      center: 'center',
      place: 'place'
    }),
  },

  mounted() {
    this.geolocate();
  },


  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.$store.dispatch('setPlace', place);
    },
 
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.$store.dispatch('setCenter', {lat: position.coords.latitude, lng: position.coords.longitude});
        this.getNearbyPlaces(this.center);
      });
    },


    getNearbyPlacesFromSearch() {
      this.getNearbyPlaces();
    },
    

    getNearbyPlaces() {
      
      let service, marker, request = {
        location: this.center,
        radius: 1000,
        keyword: 'sushi'
      };
     
      this.$refs.mapRef.$mapPromise.then((map) => {
        service = new this.google.maps.places.PlacesService(map);
        service.nearbySearch(request,(results, status) => {
          if (status === this.google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);
            results.forEach(el => {
              marker = el.geometry.location;
              this.markers.push({ position: marker });
            })
            map.setCenter(results[0].geometry.location);
          }
        });
      })

    },

  }
};
</script>