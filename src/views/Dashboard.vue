<template>
  <div class="dashboard">
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <book-show></book-show>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>Upcoming Shows</h1>
      </v-flex>
      <v-flex v-for="(user, index) in info" :key="index" xs4>
        <v-card dark>
          <v-card-text>
            <p>{{ user.name }}</p>
            <p>{{ user.date }}</p>
            
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// .PUT WILL UPDATE DATABASE VALUES
import axios from "axios";
import BookShow from "../components/BookShow.vue";

export default {
  name: "dashboard",

  data() {
    return {
      info: null
    };
  },

  components: {
    "book-show": BookShow
  },
  mounted() {
    if (!this.$store.state.idToken) {
      return;
    }
    axios
      .get(
        "https://git-gifts.firebaseio.com/bands.json" +
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
