<template>
  <transition name="slide-fade">
    <div class="Detail"
            v-if="infoWinOpen">
            <div class="Detail__Header">
              <!-- <img :src="pics" /> -->
              <h3 class="m0">{{selectedMarker.name}}</h3>
              <button class="Detail__Close" @click="closeInfoWin" aria-label="close">
                <SvgIcon :name="'close'" :width="12"/>
              </button>
            </div>
            <div class="Detail__Body">
              <p>{{selectedMarker.vicinity}}</p>
              <div class="d-flex mb-2">
                <a :href="`tel:${selectedMarker.formatted_phone_number}`" class="mr-2">{{selectedMarker.formatted_phone_number}}</a>
                <span><strong>{{$t('detail.closeat')}} {{closeAt}}</strong></span>
              </div>
            </div>
            <div class="Detail__Footer">
                <a :href="directions" class="Btn Btn--Primary" >{{$t('detail.directions')}}</a>
                <div class="Stars" :style="ratingStyle" aria-label="Rating of this product is 2.3 out of 5."></div>
              </div>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex';
import SvgIcon from './SvgIcon.vue'


export default {
  name: 'Detail',
  components: {
    SvgIcon
  },

  computed: {
    ...mapGetters({
      selectedMarker: 'selectedMarker',
      infoWinOpen: 'infoWinOpen',
      infoWinPos: 'infoWinPos'
    }),

    ratingStyle() {
      return `--rating: ${this.selectedMarker.rating};`
    },

    directions() {
      let lat, lng;
      if (this.selectedMarker.suggested) {
        lat = this.infoWinPos ? this.infoWinPos.lat : '';
        lng = this.infoWinPos ? this.infoWinPos.lng : '';
      } else {
        lat = this.infoWinPos ? this.infoWinPos.lat() : ''; 
        lng = this.infoWinPos ? this.infoWinPos.lng() : '';
      }
      return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    },

    closeAt() {
      function addZeroes( num ) {
        var value = Number(num)/100;
        var res = num.split(".");
        if(res.length == 1 || (res[1].length < 3)) {
            value = value.toFixed(2);
        }
        return value.replace(".", ":");
      } 

      //funziona solo se orario continuato.. da correggere
      let closeHours = this.selectedMarker.opening_hours.periods.map(a => a.close.time);
      let closeHoursFilt = closeHours.filter( b => b < 600 )
      console.log(closeHoursFilt)
      let closeHoursInt = closeHoursFilt.map(Number);
      return addZeroes(String(Math.max(...closeHoursInt)))
    } ,

    pics() {
      let pics = this.selectedMarker.photos.map(a => a.getUrl());
      return pics[0]
    }

  },

  methods: {
    closeInfoWin() {
      this.$store.dispatch('closeInfoWin');
    }
  }
}
</script>

<style lang="scss">
  .Detail {
    position: fixed;
    bottom: 15px;
    left: 15px;
    right: 15px;
    background: white;
    z-index: 2;
    padding: 20px;
    box-shadow: $primary-shadow;
    border-radius: 25px;
    text-align: left;

    &__Header {
      display: grid;
      grid-template-columns: 1fr 32px;
      grid-gap: 16px;
      margin-bottom: 8px;
    }

    &__Footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__Close {
      background: #d7e6f1;
      border: 0;
      width: 32px;
      height: 32px;
      border-radius: 100px;

      svg {
        color: #6d71b1;
      }

    }
  }

         
  .slide-fade-enter-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }


  
  :root {
    --star-size: 16px;
    --star-color: #d7e6f1;
    --star-background: #6d71b1;
  }

  .Stars {
    --percent: calc(var(--rating) / 5 * 100%);
    
    display: inline-block;
    font-size: var(--star-size);
    font-family: Times; // make sure ★ appears correctly
    line-height: 1;
    
    &::before {
      content: '★★★★★';
      letter-spacing: 3px;
      background: linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }


</style>
