<template>
  <div class="starwars">
  </div>
</template>

<script>
// allow user to upgrade list storage depending on their subscription tier
//import { people } from "../assets/people.js";

export default {
  name: "starwars",

  data: function() {
    return {
      //people,
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
