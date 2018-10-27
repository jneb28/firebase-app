<template>
    <div class="starwars">
        <v-container>
            <v-layout row wrap>
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
      people
    };
  }
};
</script>

<style scoped>
</style>
