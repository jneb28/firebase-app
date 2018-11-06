<template>
  <v-app>
    <v-container justify-center>




      <v-layout justify-center row>
        <v-flex>
          <app-add-list></app-add-list>
        </v-flex>
      </v-layout>


      <v-layout justify-center row>
        <v-flex>
          <app-add-gift></app-add-gift>
        </v-flex>
      </v-layout>



      <!--
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
      -->
    </v-container>
  </v-app>
</template>

<script>
// allow user to upgrade list storage depending on their subscription tier
import { people } from "../assets/people.js";
import AddGift from "../components/AddGift.vue";
import AddList from "../components/AddList.vue";

export default {
  name: "Starwars",

  components: {
    "app-add-gift": AddGift,
    "app-add-list": AddList
  },

  data: function() {
    return {
      people,
      gifts: [
        {
          name: "",
          price: 0,
          for: ""
        }
      ],
      maxGiftItems: 100,
      maxLists: 10
    };
  },
  methods: {
    addGift(e) {
      if (this.gifts.length >= this.maxGiftItems) {
        return alert("List capacity is full");
      }
      this.gifts.push(e);
    }
  }
};
</script>
