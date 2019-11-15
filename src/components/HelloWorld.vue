<template>
  <div class="hello">
    <h1>{{ msg }} {{count}} </h1>
    <Incrementer />
  </div>
</template>

<script>
import Incrementer from './Incrementer'
import { mapState } from 'vuex';


export default {
  name: 'HelloWorld',
  components: {
    Incrementer
  },
  props: {
    msg: String
  },
  computed: {
    ...mapState({
      count: state => state.count
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
