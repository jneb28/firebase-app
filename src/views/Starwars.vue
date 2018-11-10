<template>
  <div class="starwars">
    <router-view></router-view>
    <router-view name="editlist" :id="title"></router-view>
  </div>
</template>

<script>
// allow user to upgrade list storage depending on their subscription tier
import { EventBus } from "../main.js";

export default {
  name: "starwars",
  data() {
    return {
      title: ""
    };
  },

  mounted() {
    EventBus.$on("list", data => {
      this.title = data;
    });
  }
};
</script>
