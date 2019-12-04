<template>
  <div :class="{active: MenuOpen, Menu: true}">
    <div class="Hamburger">
      <button class="Btn Btn--Round" @click="MenuOpen = !MenuOpen">
         <div id="nav-icon3" :class="{open: MenuOpen}">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
    <ul  class="Menu__List">
      <li>
        <router-link to="/report" class="Btn Btn--Secondary">Suggerisci un posto </router-link>
      </li>
      <li>
        <router-link to="/contact" class="Btn Btn--Secondary">Contatti</router-link>
      </li>
       <li>
        <router-link to="/" class="Btn Btn--Secondary">Home</router-link> 
      </li>
    </ul>
  </div>

</template>

<script>




export default {
  name: "Menu",


  data() {
    return {
      MenuOpen: false
    }
  }


};
</script>


<style lang="scss">

.Menu {
  position: fixed;
  z-index: 1;
  bottom: 20px;
  left: 20px;
  width: 100%;
  transition: all .2s ease-in-out;

  button {
    position: relative;
    z-index: 1;
  }

  &:after {
    content: '';
    display: block;
    width: 500px;
    height: 500px;
    background: rgba(255, 255, 255, .4);
    border-radius: 500px;
    position: absolute;
    top: -100px;
    left: -340px; 
    opacity: 0;
    visibility: hidden;
    scale: .5;
  }

    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }


    li {
      position: absolute;
      z-index: 1;
      opacity: 0;
      visibility: hidden;
      transition:  all .2s ease-in-out;

      &:first-child {
        bottom: 0;
        left: 80px;
      }

      &:nth-child(2) {
        bottom: 50px;
        left: 60px;
      }

      &:nth-child(3) {
        bottom: 100px;
        left: 0;
      }
    }
    
    &.active {

      li {
        opacity: 1;
        visibility: visible;
      }

      &:after {
        opacity: 1;
        visibility: visible;
        scale: 1;
      }
    }
  }





  * {
  margin: 0;
  padding: 0; 
}

/* Icon 1 */

#nav-icon3 {
  width: 28px;
  height: 18px;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
}

#nav-icon3 span {
  display: block;
  position: absolute;
  height: 4px;
  width: 100%;
  background: black;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
}



/* Icon 3 */

#nav-icon3 span:nth-child(1) {
  top: 0px;
}

#nav-icon3 span:nth-child(2),#nav-icon3 span:nth-child(3) {
  top: 9px;
}

#nav-icon3 span:nth-child(4) {
  top: 18px;
}

#nav-icon3.open span:nth-child(1) {
  top: 18px;
  width: 0%;
  left: 50%;
}

#nav-icon3.open span:nth-child(2) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

#nav-icon3.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

#nav-icon3.open span:nth-child(4) {
  top: 18px;
  width: 0%;
  left: 50%;
}



</style>
