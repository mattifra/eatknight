<template>
   <div class="Home text-center">
      <img src="../assets/knight.png" alt="logo" width="140px" />
      <h1 class="Home__Title">{{ $t('home.title') }}</h1>
      <h2 class="Home__SubTitle">{{ $t('home.subtitle') }}</h2>
      <router-link to="/map" class="Btn Btn--Primary">{{ $t('global.startSearching') }}</router-link>
    </div>
</template>

<script>



export default {
  name: 'Home'
}
</script>

<style lang="scss">

.Home {

  &__Title {
    font-size: 22px;
  }

  &__SubTitle {
    font-size: 18px;
    margin-bottom: 32px;
  }
}

</style>
