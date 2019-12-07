<template>
  <div class="Loader" v-if="loaderActive">
    <fulfilling-bouncing-circle-spinner
      :animation-duration="4000"
      :size="60"
      color="#fff"
    />
  </div>

</template>

<script>


import {mapGetters} from 'vuex'
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'


export default {
  name: "Loader",
  components: {
    FulfillingBouncingCircleSpinner
  },
  computed: {
    ...mapGetters({
      loaderActive: 'loaderActive'
    }),
  }
  
};

</script>


<style lang="scss">


  .Loader {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .4);
    display: flex;
    align-items: center;
    justify-content: center;
  }


</style>
