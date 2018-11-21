<template>
  <div class="join">
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
          v-model.trim="$v.email.$model"
          :error-messages="emailErrors"
          label="Email"
          required
          @blur="$v.email.$touch()"
          ></v-text-field>

          <v-text-field 
          v-model.trim="$v.password.$model"
          :error-messages="passwordErrors"
          type="password"
          label="Password"
          required
          @blur="$v.password.$touch()"
          ></v-text-field>

          <v-text-field 
          v-model.trim="$v.repeatPassword.$model"
          :error-messages="repeatPasswordErrors"
          type="password"
          label="Repeat Password"
          required
          @blur="$v.repeatPassword.$touch()"
          ></v-text-field>

          <v-btn @click="signUp" :disabled="signUpStatus === 'PENDING'">Sign Up</v-btn>
          

          <v-alert
            v-if="signUpStatus === 'OK'"
            :value="true"
            type="success"
          >
            Thanks for joining Git Gifts! Redirecting to login page...
          </v-alert>
          <v-alert
            v-if="signUpStatus === 'PENDING'"
            :value="true"
            type="info"
          >
            Creating account...
          </v-alert>
          <v-alert
            v-if="signUpStatus === 'ERROR'"
            :value="true"
            type="error"
          >
            Please fill the form correctly.
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
  maxLength,
  email,
  sameAs
} from "vuelidate/lib/validators";
//import { EventBus } from "../main.js";

export default {
  name: "join",

  props: [],

  mixins: [validationMixin],

  validations: {
    name: { required, minLength: minLength(2), maxLength: maxLength(24) },
    email: { required, email },
    password: { required, minLength: minLength(6), maxLength: maxLength(24) },
    repeatPassword: { sameAsPassword: sameAs("password") }
  },

  data: () => ({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    signUpStatus: null
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

    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      !this.$v.password.minLength &&
        errors.push("Password must have at least 6 characters");
      !this.$v.password.maxLength &&
        errors.push("Password must be at most 24 characters long");
      return errors;
    },

    repeatPasswordErrors() {
      const errors = [];
      if (!this.$v.repeatPassword.$dirty) return errors;
      !this.$v.password.required && errors.push("Repeat password is required");
      !this.$v.repeatPassword.sameAsPassword &&
        errors.push("Passwords must be identical");
      return errors;
    }
  },

  methods: {
    signUp() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.signUpStatus = "ERROR";
      } else {
        this.signUpStatus = "PENDING";
        setTimeout(() => {
          this.signUpStatus = "OK";

          const user = {
            name: this.name,
            email: this.email,
            password: this.password
          };

          console.log(user);
          this.$store.dispatch("join", user);

          //EventBus.$emit("name", user.name);
          setTimeout(() => {
            this.$router.push("/login");
            //redirects to addlist
          }, 1000);
        }, 1000);
      }
    }
  }
};
</script>
