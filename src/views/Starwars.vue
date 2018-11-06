<template>
<div class="starwars">
  <v-container justify-center>
    <v-layout justify-center row wrap>
      <v-flex v-for="person in people" :key="person.name" xs4>
        <v-card dark color="secondary" class="my-1 mx-2">
          <v-card-text>{{ person.name }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center row wrap>
      <v-flex v-for="person in people" :key="person.name" xs4>
        <v-card dark color="secondary" class="my-1 mx-2">
          <v-card-text>{{ person.name }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import { people } from "../assets/people.js";

export default {
  name: "Starwars",

  data: function() {
    return {
      people,
      gifts: [
        {
          name: "",
          price: 0,
          for: ""
        }
      ]
    };
  }
};
</script>

<style scoped>
.starwars {
  text-align: center;
}
</style>
