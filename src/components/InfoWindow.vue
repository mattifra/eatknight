<template>
  <GmapInfoWindow
          :position="infoWinPos"
          :opened="infoWinOpen"
          @closeclick="closeInfoWin">
          {{selectedMarker ? selectedMarker.name : ''}}
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
  },
  methods: {
    closeInfoWin() {
      this.$store.dispatch('closeInfoWin');
    }
  }
}
</script>