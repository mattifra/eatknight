<template>
   <div class="text-center">
      <h1>Cannot find your place?</h1>
      <input placeholder="Number" v-model="storeNumber" />
      <input placeholder="Name" v-model="storeName" />
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
      <input placeholder="Close time" v-model="storeClose" />
      <button @click="send">send</button>
    </div>
</template>

<script>
import {db } from '../firebaseConfig.js';

export default {
  name: 'Report',
  data() {
    return {
      storeNumber: "",
      storeName: "",
      storeClose: "",
      location: "",
      address: ""
    }
  },
  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      console.log(place)
      this.location = place.geometry.location;
      this.address = place.formatted_address
    },
    send() {
      console.log('upp')
      let store =  {
        "formatted_phone_number" : this.storeNumber,
        "geometry" : {
          "location" : {
            "lat" : this.location.lat(),
            "lng" : this.location.lng()
          }
        },
        "name" : this.storeName,
        "opening_hours" : {
          "periods" : [ {
            "close": {
              "time": this.storeClose
            }
          } ]
        },
        "suggested" : true,
        "vicinity" : this.address
      } 
;

      let newChildRef = db.ref('/stores').push();
      newChildRef.set(store)
    }
    
  }
}
</script>

<style lang="scss">



</style>
