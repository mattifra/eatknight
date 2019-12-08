<template>
  <div :class="{active: InputOpen, SearchInput : true}">
    <button @click="InputOpen=!InputOpen"> <SvgIcon :name="'lens'" :width="22"/></button>
      <gmap-autocomplete
        @place_changed="setPlace">
      </gmap-autocomplete>
  </div>   
</template>
<script>


import SvgIcon from './SvgIcon.vue'

export default {
  name: "SearchInput",
  components: {
    SvgIcon
  },

  data() {
    return {
      InputOpen: false
    }
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.$store.dispatch('setPlace', place);
    },
  }
};
</script>


<style lang="scss">

.pac-container {
  //width: calc(100% - 130px) !important;
  //position: fixed !important;
  //left: 30px !important;
  //top: 30px !important;
  border-radius: 20px;
  padding: 15px;
}

.SearchInput {
  position: absolute;
  left: 15px;
  bottom: -32px;  
  box-shadow: $primary-shadow;
  background: white;
  height: 58px;
  width: 58px;
  border-radius: 60px;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: all .3s ease-in-out;
  padding-left: 14px;
  padding-right: 14px;

  button {
    padding: 0;
  }

  input {
    opacity: 0;
    visibility: hidden;
    height: 40px;
    font-size: 16px;
  }

  &.active {
    width: calc( 100% - 100px);

    input {
      opacity: 1;
      visibility: visible;
    }
  }
}

</style>
