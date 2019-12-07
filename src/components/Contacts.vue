<template>
   <div class="text-center">
      <h1>Contact us!</h1>
      <form class="Form__Basic">
        <input placeholder="Name"  />
        <input placeholder="Email"  />
        <textarea placeholder="I love this shit because..." />
        <button class="Btn Btn--Primary" @click="send">Send</button>
      </form>
    </div>
</template>

<script>

export default {
  name: 'Contacts'
}
</script>

<style lang="scss">



</style>
