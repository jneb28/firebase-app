<template>
  <div class="bookshow">
    <v-layout row wrap justify-center>
      <v-flex xs4 class="mr-4">

        <h1>Sign Up</h1>
        <form @submit.prevent="signUp" class="px-3 py-2">
          <v-text-field
          v-model.trim="$v.name.$model"
          :error-messages="nameErrors"
          label="Name"
          required
          @blur="$v.name.$touch()"
          ></v-text-field>

          <v-text-field
          v-model.trim="$v.date.$model"
          :error-messages="dateErrors"
          label="Date"
          required
          @blur="$v.date.$touch()"
          ></v-text-field>

          

          <v-btn @click="bookShow" :disabled="signUpStatus === 'PENDING'">Book Show</v-btn>
          

          <v-alert
            v-if="this.$store.state.loginStatus === 'OK'"
            :value="true"
            type="success"
          >
            User created! Redirecting . . .
          </v-alert>
          <v-alert
            v-if="this.$store.state.loginStatus === 'PENDING'"
            :value="true"
            type="info"
          >
            Creating user . . .
          </v-alert>
          <v-alert
            v-if="this.$store.state.loginStatus === 'ERROR'"
            :value="true"
            type="error"
          >
            Please fill the form correctly . . .
          </v-alert>
        </form>

      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

export default {
  name: "bookshow",

  mixins: [validationMixin],

  validations: {
    name: { required, minLength: minLength(2), maxLength: maxLength(24) },
    date: { required, minLength: minLength(10), maxLength: maxLength(10) },
  },

  data: () => ({
    name: "",
    date: ""
  }),

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
    },

    dateErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength &&
        errors.push("Date must have at least 10 characters. i.e. 01/01/1234");
      !this.$v.name.maxLength &&
        errors.push("Date must have at least 10 characters. i.e. 01/01/1234");
      !this.$v.name.required && errors.push("Date is required");
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
          this.$store.state.loginStatus = "OK";

          const user = {
            name: this.name,
            date: this.date
          };

          console.log(user);
          this.$store.dispatch("addBand", user);

          setTimeout(() => {
            this.$router.push("/dashboard");
          }, 1000);
        }, 1000);
      }
    }
  }
};
</script>
