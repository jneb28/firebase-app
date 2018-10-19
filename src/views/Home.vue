<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Starwars/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Starwars from "@/components/Starwars.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Starwars
  }
};
</script>
