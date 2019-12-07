<template>
   <div class="Home text-center">
      <img src="../assets/knight.png" alt="logo" width="140px" />
      <h1 class="Home__Title">Trova dove mangiare di notte</h1>
      <h2 class="Home__SubTitle">Con Eatknight puoi trovare i posti della tua città dove mangiare la notte!</h2>
      <router-link to="/map" class="Btn Btn--Primary">Inizia a cercare!</router-link>
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
