<template>
  <v-app dark>
     <v-container>
      <v-layout justify-center>
        <v-flex xs12>
          <h1>New List</h1>
        </v-flex>
      </v-layout>
      
      <v-layout justify-center>
        <v-flex xs6>
          <form @submit.prevent="submit">
            <v-text-field
            v-model="$v.listTitle.$model"
            :error-messages="titleErrors"
            label="List Title"
            required
            @blur="$v.listTitle.$touch()"
            ></v-text-field>

            <v-btn @click="submit" :disabled="submitStatus === 'PENDING'">Create List</v-btn>
            <v-btn @click="clear">Reset</v-btn>

            <p v-if="submitStatus === 'OK'">List created!</p>
            <p v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
            <p v-if="submitStatus === 'PENDING'">Creating List...</p>
          </form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
// allow user to upgrade list storage depending on their subscription tier
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { EventBus } from "../main.js";

export default {
  name: "AddList",

  mixins: [validationMixin],

  validations: {
    listTitle: { required, minLength: minLength(1), maxLength: maxLength(24) }
  },

  data: () => ({
    listTitle: "",
    submitStatus: null
  }),

  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.listTitle.$dirty) return errors;
      !this.$v.listTitle.minLength &&
        errors.push("List title must have at least 1 character");
      !this.$v.listTitle.maxLength &&
        errors.push("List title must be at most 24 characters long");
      !this.$v.listTitle.required && errors.push("List title is required");
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
        EventBus.$emit("newList", this.listTitle);
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 1000);
      }
    },

    clear() {
      this.$v.$reset();
      this.listTitle = "";
    }
  }
};
</script>
