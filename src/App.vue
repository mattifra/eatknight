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

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $typo1;
}
</style>
