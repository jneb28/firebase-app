<template>
  <v-app dark>
     <v-container>
      <v-layout justify-center>
        <v-flex xs12>
          <h1>Add Gifts</h1>
        </v-flex>
      </v-layout>
      
      <v-layout justify-center>
        <v-flex xs6>
          <form @submit.prevent="submit">
            <v-text-field
            v-model.trim="$v.gift.$model"
            :error-messages="giftErrors"
            label="Gift Title"
            required
            @blur="$v.gift.$touch()"
            ></v-text-field>

            <v-text-field
            v-model.trim.lazy="$v.price.$model"
            :error-messages="priceErrors"
            label="Price"
            required
            @blur="$v.price.$touch()"
            ></v-text-field>

            <v-text-field
            v-model="$v.recipient.$model"
            :error-messages="recipientErrors"
            label="Recipient"
            required
            @blur="$v.recipient.$touch()"
            ></v-text-field>

            <v-btn @click="submit" :disabled="submitStatus === 'PENDING'">Add Gift</v-btn>
            <v-btn @click="clear">Reset</v-btn>

            <p v-if="submitStatus === 'OK'">Gift added!</p>
            <p v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
            <p v-if="submitStatus === 'PENDING'">Adding Gift...</p>
          </form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
// allow user to upgrade list storage depending on their subscription tier
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  between
} from "vuelidate/lib/validators";
import { EventBus } from "../main.js";

export default {
  name: "AddGift",

  mixins: [validationMixin],

  validations: {
    gift: { required, minLength: minLength(1), maxLength: maxLength(24) },
    price: { required, between: between(0, 999999999) },
    recipient: { required, minLength: minLength(1), maxLength: maxLength(24) }
  },

  data: () => ({
    gift: "",
    price: 0,
    recipient: "",
    submitStatus: null,
    giftObj: {
      gift: this.gift,
      price: this.price,
      recipient: this.recipient
    }
  }),

  computed: {
    giftErrors() {
      const errors = [];
      if (!this.$v.gift.$dirty) return errors;
      !this.$v.gift.minLength &&
        errors.push("Gift title must have at least 1 characters");
      !this.$v.gift.maxLength &&
        errors.push("Gift title must be at most 24 characters long");
      !this.$v.gift.required && errors.push("Gift title is required.");
      return errors;
    },

    priceErrors() {
      const errors = [];
      if (!this.$v.price.$dirty) return errors;
      !this.$v.price.between &&
        errors.push("Price must be between 0 and 999999999");
      !this.$v.price.required && errors.push("Price is required");
      return errors;
    },

    recipientErrors() {
      const errors = [];
      if (!this.$v.recipient.$dirty) return errors;
      !this.$v.recipient.minLength &&
        errors.push("Recipient must have at least 1 characters");
      !this.$v.recipient.maxLength &&
        errors.push("Recipient must be at most 24 characters long");
      !this.$v.recipient.required && errors.push("Recipient is required.");
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
        EventBus.$emit("giftObject", this.giftObj);
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 1000);
      }
    },

    clear() {
      this.$v.$reset();
      this.gift = "";
      this.price = "";
      this.recipient = "";
    }
  }
};
</script>
