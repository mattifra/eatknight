<template>
   <div class="basic-box text-center">
      <h1>{{ $t('contactus') }}</h1>
      <form class="Form__Basic" @submit="sendReq">
        <input class="Input" :placeholder="$t('form.name')" v-model="name" required />
        <input class="Input" :placeholder="$t('form.email')" v-model="email"  required />
        <textarea class="Input" placeholder="I love this shit because..."  v-model="text" required/>
        <button type="submit" class="Btn Btn--Primary">{{cta}}</button>
      </form>
    </div>
</template>

<script>
import {db } from '../firebaseConfig.js';


export default {
  name: 'Contacts',
  data() {
    return {
      name: "",
      email: "",
      text: "",
      cta: "Send"
    }
  },

  methods: {
    sendReq(e) {  
      e.preventDefault();
      this.$store.dispatch('openLoader');
      
      let req = {
          "Name": this.name,
          "Email": this.email,
          "text": this.text
      }
      let newChildRef = db.ref('/contacts').push();
      newChildRef.set(req, (error) => {
        if (error) {
          console.log('OMG Something wen wrong', error)
          this.$store.dispatch('closeLoader');
        } else {
          setTimeout( ()=> {
            this.$store.dispatch('closeLoader');
            this.cta = "Successfully sent!"
          }, 500)
          
        }
      })}
  }
}
</script>

<style lang="scss">



</style>
