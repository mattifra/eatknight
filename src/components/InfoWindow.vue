<template>
  <GmapInfoWindow
          :position="infoWinPos"
          :opened="infoWinOpen"
          @closeclick="closeInfoWin">
          <p>{{selectedMarker.name}}</p>
          <p>Rating: {{selectedMarker.rating}}</p>
          <p>Dove: {{selectedMarker.vicinity}}</p>
          <a :href="directions" >Directions</a>
          <button>See details</button>
  </GmapInfoWindow>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'InfoWindow',

  
  computed: {
    ...mapGetters({
      selectedMarker: 'selectedMarker',
      infoWinOpen: 'infoWinOpen',
      infoWinPos: 'infoWinPos'
    }),
    directions() {
      let lat = this.infoWinPos ? this.infoWinPos.lat() : '';
      let lng = this.infoWinPos ? this.infoWinPos.lng() : '';
      return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    }
  },
  methods: {
    closeInfoWin() {
      this.$store.dispatch('closeInfoWin');
    }
  }
}
</script>