<template>
   <div class="Suggest">
     <div class="Suggest__Header text-center">
        <h1>Cannot find your place?</h1>
        <p>Send us the information of your favourite late night zozzone!</p>
     </div>
      <form class="Form__Basic">
        <input placeholder="Name of the place*" v-model="storeName" />
        <input placeholder="Number of the place" v-model="storeNumber" />
        <gmap-autocomplete  @place_changed="setPlace" />
        <input placeholder="Closing time" v-model="storeClose" />
        <button class="Btn Btn--Primary" @click="send">Send</button>
      </form>
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
