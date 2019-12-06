<template>
  <transition name="slide-fade">
    <div class="Detail"
            v-if="infoWinOpen">
            <div class="Detail__Header">
              <h3 class="m0">{{selectedMarker.name}}</h3>
              <button class="Detail__Close" @click="closeInfoWin" aria-label="close">
                <SvgIcon :name="'close'" :width="12"/>
              </button>
            </div>
            <div class="Detail__Body">
              <p>Rating: {{selectedMarker.rating}}</p>
              <p>Dove: {{selectedMarker.vicinity}}</p>
              <p>Close at: {{closeAt/100}}</p>
              <a :href="directions" class="Btn Btn--Primary" >Directions</a>
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
      let closeHours = this.selectedMarker.opening_hours.periods.map(a => a.close.time);
      let closeHoursInt = closeHours.map(Number);
      return Math.max(...closeHoursInt)
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
</style>
