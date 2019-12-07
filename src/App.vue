<template>
  <div id="app">
    <router-view></router-view>
    <Menu />
    <Loader />
    <lang-switcher />
  </div>
  
</template>

<script>
import LangSwitcher from './components/LangSwitcher.vue'

export default {
  name: 'app',
  components: {
    'Menu': () => import('./components/Menu.vue'),
    'Loader': () => import('./components/Loader.vue'),
    LangSwitcher
  }
}
</script>

