<template>
  <div id="app">
    <NightLocator />
  </div>
</template>

<script>
import NightLocator from './components/NightLocator.vue'

export default {
  name: 'app',
  components: {
    NightLocator
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
