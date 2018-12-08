<template>
  <div class="dashboard">
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>Booking</h1>
      </v-flex>
      <v-flex xs4 class="mr-4">
        <form @submit.prevent="signUp" class="px-3 py-2">
          <v-text-field
            v-model.trim="$v.name.$model"
            :error-messages="nameErrors"
            label="Name"
            required
            @blur="$v.name.$touch()"
          ></v-text-field>

          <v-menu
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field slot="activator" v-model="date" label="Date" readonly></v-text-field>
            <v-date-picker v-model="date" @input="menu = false" no-title></v-date-picker>
          </v-menu>

          <v-btn @click="bookShow" :disabled="this.$store.state.loginStatus === 'PENDING'">Book</v-btn>

          <v-alert
            v-if="this.$store.state.loginStatus === 'OK'"
            :value="true"
            type="success"
          >Band added!</v-alert>
          <v-alert
            v-if="this.$store.state.loginStatus === 'PENDING'"
            :value="true"
            type="info"
          >Adding band . . .</v-alert>
          <v-alert
            v-if="this.$store.state.loginStatus === 'ERROR'"
            :value="true"
            type="error"
          >Please fill the form correctly . . .</v-alert>
        </form>
      </v-flex>
    </v-layout>

    
    <v-divider></v-divider>
    

    <v-layout row wrap justify-center>
      <v-flex xs12 class="my-4">
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

import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "dashboard",

  mixins: [validationMixin],

  validations: {
    name: { required, minLength: minLength(2), maxLength: maxLength(24) },
    date: { required, minLength: minLength(10), maxLength: maxLength(10) }
  },

  data() {
    return {
      info: null,

      name: "",
      date: new Date().toISOString().substr(0, 10),
      menu: false
    };
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength &&
        errors.push("Name must have at least 2 characters");
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 24 characters long");
      !this.$v.name.required && errors.push("Name is required");
      return errors;
    }
  },

  methods: {
    bookShow() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$store.state.loginStatus = "ERROR";
      } else {
        this.$store.state.loginStatus = "PENDING";
        setTimeout(() => {
          const user = {
            name: this.name,
            date: this.date
          };

          console.log(user);
          this.$store.dispatch("addBand", user);
        }, 1000);
      }
    }
  },

  watch: {
    info() {
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
    // this.info = this.$store.dispatch("getBand");
    // console.log(this.info);
  }
};
</script>
