<template>
   <div class="Header">
      <h2>Search and add a pin</h2>
      <p>Find your night place to eat</p>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="getNearbyPlacesFromSearch">Add</button>
      </label>
      <br/>
    </div>
</template>

<script>

export default {
  name: 'Header',
  methods: {
      // receives a place object via the autocomplete component
      setPlace(place) {
        this.$store.dispatch('setPlace', place);
      }
  }
}
</script>