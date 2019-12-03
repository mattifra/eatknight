<template>
   <div class="Home text-center">
      <h1>Trova dove mangiare di notte</h1>
      <h2>Con Eatknight puoi trovare i posti della tua città dove mangiare la notte!</h2>
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
  padding: 20px;
}

</style>
