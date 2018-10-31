<template>
<div class="join">
  <h1>Join Git Gifts</h1>
  <v-container>
    <v-layout align-center justify-center row>
      <v-flex xs6>
        <form @submit.prevent="submit">
          <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="10"
          label="Name"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="Email"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          ></v-text-field>

          <v-btn @click="submit" :disabled="submitStatus === 'PENDING'">Join</v-btn>
          <v-btn @click="clear">Reset</v-btn>

          <p v-if="submitStatus === 'OK'">Thanks for your submission!</p>
          <p v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
          <p v-if="submitStatus === 'PENDING'">Sending...</p>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { EventBus } from "../main.js";

export default {
  name: "join",

  props: [],

  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email }
  },

  data: () => ({
    name: "",
    email: "",
    submitStatus: null
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
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
        EventBus.$emit("username", this.name);
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },

    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
    }
  }
};
</script>
