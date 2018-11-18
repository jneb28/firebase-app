<template>
  <div class="addlist">
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>New List</h1>
      </v-flex>

      <v-flex xs6>
        
        <form @submit.prevent="submit" class="mx-3 py-2">
          <v-text-field
          v-model="$v.listTitle.$model"
          :error-messages="titleErrors"
          label="List Title"
          required
          @blur="$v.listTitle.$touch()"
          ></v-text-field>

          <v-btn @click="submit" :disabled="submitStatus === 'PENDING'">Create List</v-btn>

          
          <v-alert
            v-if="submitStatus === 'OK'"
            :value="true"
            type="success"
          >
            List created! Redirecting...
          </v-alert>
          <v-alert
            v-if="submitStatus === 'PENDING'"
            :value="true"
            type="info"
          >
            Creating List...
          </v-alert>
          <v-alert
            v-if="submitStatus === 'ERROR'"
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
// allow user to upgrade list storage depending on their subscription tier
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { EventBus } from "../main.js";

export default {
  name: "addlist",

  mixins: [validationMixin],

  validations: {
    listTitle: { required, minLength: minLength(1), maxLength: maxLength(24) }
  },

  data: () => ({
    listTitle: "",
    submitStatus: null,
    lists: []
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
        EventBus.$emit("list", this.listTitle);
        setTimeout(() => {
          this.submitStatus = "OK";
          setTimeout(() => {
            this.$store.state.lists.push(this.listTitle);
            console.log(this.$store.state.lists);
            //prop value is passed here
            this.$router.push("/starwars/add/edit/" + this.listTitle);
          }, 1000);
        }, 1000);
      }
    }
  }
};
</script>
