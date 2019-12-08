<template>
   <div class="Suggest basic-box">
     <div class="Suggest__Header text-center">
        <h1>{{$t('suggest.title')}}</h1>
        <p class="mb-4">{{$t('suggest.subtitle')}}</p>
     </div>
      <form class="Form__Basic" @submit="send">
        <input class="Input" :placeholder="$t('form.nameplace')" v-model="storeName" required/>
        <input class="Input" :placeholder="$t('form.phoneplace')" v-model="storeNumber" />
        <gmap-autocomplete class="Input" :placeholder="$t('form.addressplace')"  @place_changed="setPlace" required />
        <input class="Input" :placeholder="$t('form.closingtime')" v-model="storeClose" required />
        <button  type="submit" class="Btn Btn--Primary" >{{cta}}</button>
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
      address: "",
      cta: "Send"
    }
  },
  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      console.log(place)
      this.location = place.geometry.location;
      this.address = place.formatted_address
    },
    send(e) {
      e.preventDefault();
      this.$store.dispatch('openLoader');
      
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
      newChildRef.set(store, (error) => {
        if (error) {
          console.log('OMG Something wen wrong', error)
          this.$store.dispatch('closeLoader');
        } else {
          setTimeout( ()=> {
              this.$store.dispatch('closeLoader');
              this.cta = "Successfully sent!"
            }, 500)
        }
      })
    }
    
  }
}
</script>

<style lang="scss">



</style>
