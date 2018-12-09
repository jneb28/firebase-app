<template>
  <div class="dashboard">
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>Add Band</h1>
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
        <h1>Shows</h1>
      </v-flex>
      <v-flex v-for="(band, index) in info" :key="index" xs4>
        <v-card dark class="ma-1 py-3">
          <v-card-text>
            <p class="band-name">{{ band.name }}</p>
            <p class="band-date">{{ band.date }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn flat @click="remove(band.name)">Remove Band</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase from "firebase";

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
      info: [],
      name: "",
      date: new Date().toISOString().substr(0, 10),
      menu: false,

      start: new Date().toISOString().substr(0, 6)
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
          this.$store.dispatch("addBand", user);
        }, 1000);
      }
    },

    remove(band) {
      var ref = firebase.database().ref("bands");
      ref
        .orderByChild("name")
        .equalTo(band)
        .once("value")
        .then(function(snapshot) {
          console.log(snapshot);
          snapshot.forEach(function(childSnapshot) {
            ref.child(childSnapshot.key).remove();
            return true;
          });
        });
    },

    fireDatabase() {
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.$store.state.email,
          this.$store.state.password
        )
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });

      var database = firebase.database();
      var ref = database.ref("bands");
      ref
        .orderByChild("date")
        .startAt(this.start)
        .on("value", this.getData, this.errorData);
    },

    getData(response) {
      this.info = [];
      response.forEach(child => {
        this.info.push(child.val());
      });
    },

    errorData(error) {
      console.log(error);
    }
  },
  mounted() {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.$store.state.email,
        this.$store.state.password
      )
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    var database = firebase.database();
    var ref = database.ref("bands");
    ref
      .orderByChild("date")
      .startAt(this.start)
      .on("value", this.getData, this.errorData);
  }
};
</script>

<style scoped>
.band-name {
  font-size: 18px;
  color: #f7f7f7;
  font-weight: bold;
}

.band-date {
  font-size: 14px;
  color: #42b883;
  text-decoration: underline;
}
</style>
