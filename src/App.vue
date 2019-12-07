<template>
  <div id="app">
    <router-view></router-view>
    <Menu />
  </div>
  
</template>

<script>

export default {
  name: 'app',
  components: {
    'Menu': () => import('./components/Menu.vue')
  }
}
</script>

