<template>
  <div class="join">
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>Join Git Gifts</h1>
      </v-flex>
      
      <v-flex xs6>
        <form @submit.prevent="submit">
          <v-text-field
          v-model="$v.name.$model"
          :error-messages="nameErrors"
          label="Name"
          required
          @blur="$v.name.$touch()"
          ></v-text-field>

          <v-text-field
          v-model="$v.email.$model"
          :error-messages="emailErrors"
          label="Email"
          required
          @blur="$v.email.$touch()"
          ></v-text-field>

          <v-text-field
          v-model="$v.username.$model"
          :error-messages="usernameErrors"
          label="Username"
          required
          @blur="$v.username.$touch()"
          ></v-text-field>

          <v-text-field 
          v-model.trim="$v.password.$model"
          :error-messages="passwordErrors"
          type="password"
          label="Password"
          required
          @blur="$v.password.touch()"
          ></v-text-field>

          <v-text-field 
          v-model.trim="$v.repeatPassword.$model"
          :error-messages="repeatPasswordErrors"
          type="password"
          label="Repeat Password"
          required
          @blur="$v.repeatPassword.touch()"
          ></v-text-field>

          <v-btn @click="submit" :disabled="submitStatus === 'PENDING'">Join</v-btn>
          <v-btn @click="clear">Reset</v-btn>

          <p v-if="submitStatus === 'OK'">Thanks for joining Git Gifts!</p>
          <p v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
          <p v-if="submitStatus === 'PENDING'">Creating...</p>
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
import { EventBus } from "../main.js";

export default {
  name: "join",

  props: [],

  mixins: [validationMixin],

  validations: {
    name: { required, minLength: minLength(2), maxLength: maxLength(24) },
    email: { required, email },
    username: { required, minLength: minLength(2), maxLength: maxLength(16) },
    password: { required, minLength: minLength(8), maxLength: maxLength(24) },
    repeatPassword: { sameAsPassword: sameAs("password") }
  },

  data: () => ({
    name: "",
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
    submitStatus: null
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength &&
        errors.push("Name must have at least 2 characters");
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 24 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },

    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.minLength &&
        errors.push("Username must have at least 2 characters");
      !this.$v.username.maxLength &&
        errors.push("Username must be at most 16 characters long");
      !this.$v.username.required && errors.push("Username is required.");
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      !this.$v.password.minLength &&
        errors.push("Password must have at least 8 characters");
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
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";
        EventBus.$emit("username", this.username);
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 1000);
      }
    },

    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.username = "";
      this.password = "";
      this.repeatPassword = "";
    }
  }
};
</script>
