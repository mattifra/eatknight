<template>
  <div :class="{active: InputOpen, SearchInput : true}">
    <button @click="InputOpen=!InputOpen">lens</button>
      <gmap-autocomplete
      @place_changed="setPlace">
    </gmap-autocomplete>
  </div>   
</template>
<script>


export default {
  name: "SearchInput",

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

.SearchInput {
  position: absolute;
  left: 15px;
  bottom: -32px;  
  box-shadow: $primary-shadow;
  background: white;
  height: 56px;
  width: 56px;
  border-radius: 60px;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: all .3s ease-in-out;

  input {
    opacity: 0;
    visibility: hidden;
    height: 40px;
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
