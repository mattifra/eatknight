<template>
  <button @click="increment">Increment</button>
</template>

<script>
export default {
  name: 'Incrementer',
  methods: {
    increment() {
      this.$store.commit('increment')
    }
  }
}
</script>


