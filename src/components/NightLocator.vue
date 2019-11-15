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
import { mapState } from 'vuex';


export default {
  name: "NightLocator",
  components: {
    HelloWorld
  },
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
    };
  },

  computed: {
    google: gmapApi,
    ...mapState({
      place: state => state.place
    })
  },

  mounted() {
    this.geolocate();
  },


  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.$store.commit('setPlace', place)
      this.currentPlace = this.place;
      console.log(this.place)
      console.log(this.place.geometry.location.lat(), this.place.geometry.location.lng())
    },
 
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.getNearbyPlaces(this.center);
      });
    },


    getNearbyPlacesFromSearch() {
      this.getNearbyPlaces(this.place.geometry.location);
    },
    

    getNearbyPlaces(pos) {
      
      let service, marker, request = {
        location: pos,
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