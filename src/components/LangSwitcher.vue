<template>
  <div class="locale-changer">
    <ul class="unstyled-list d-flex">
      <li v-for="(lang, i) in langs" :key="`Lang${i}`" :class="{active: $i18n.locale === lang}" @click="$i18n.locale = lang">{{ lang }}</li>
    </ul>
  </div>
   
</template>


<script>
export default {
  name: 'locale-changer',
  data () {
    return { 
      langs: ['en', 'it'] 
    }
  },
  mounted() {
    console.log(this.$i18n.locale)
  }
}
</script>

<style lang="scss">
  .locale-changer {
    position: fixed;
    right: 20px;
    bottom: 20px;
    padding: 8px;
    box-shadow: $primary-shadow;
    border-radius: 10px;
    width: 40px;
    background: white;

    li {
      text-transform: uppercase;
      text-align: center;
      width: 100%;
      font-weight: bold;
      
      &.active {
        display: none;
      }
    }
  }
</style>