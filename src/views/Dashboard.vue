<template>
  <div class="dashboard">
    <v-layout row wrap justify-center>
      
      <v-flex v-for="(user, index) in info" :key="index" xs4>
        <v-card dark>
          <v-card-text>
            <p>{{ user.name }}</p>
            <p>{{ user.email }}</p>
            <p>{{ user.password }}</p>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </div>  
</template>

<script>
import axios from "axios";

export default {
  name: "dashboard",

  data() {
    return {
      info: null
    };
  },

  mounted() {
    if (!this.$store.state.idToken) {
      return;
    }
    axios
      .get(
        "https://git-gifts.firebaseio.com/users.json" +
          "?auth=" +
          this.$store.state.idToken
      )
      .then(response => {
        this.info = response.data;
        console.log(this.info);
      })
      .catch(error => console.log(error));
  }
};
</script>
