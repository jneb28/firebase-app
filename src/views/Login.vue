<template>
  <div class="login">
    <v-layout row wrap justify-center>
      <v-flex xs4>

        <h1>Login</h1>
        <form class="px-3 py-2">

          <v-text-field
          v-model="$v.userEmail.$model"
          :error-messages="userEmailErrors"
          label="Email"
          required
          @blur="$v.userEmail.$touch()"
          ></v-text-field>

          <v-text-field 
          v-model.trim="$v.userPassword.$model"
          :error-messages="userPasswordErrors"
          type="password"
          label="Password"
          required
          @blur="$v.userPassword.$touch()"
          ></v-text-field>

          <v-btn @click="login" :disabled="loginStatus === 'PENDING'">Login</v-btn>

          <v-alert
            v-if="loginStatus === 'OK'"
            :value="true"
            type="success"
          >
            You are now logged in! Redirecting...
          </v-alert>
          <v-alert
            v-if="loginStatus === 'PENDING'"
            :value="true"
            type="info"
          >
            Logging in...
          </v-alert>
          <v-alert
            v-if="loginStatus === 'ERROR'"
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
  email
} from "vuelidate/lib/validators";
//import { EventBus } from "../main.js";
import axios from "axios";

export default {
  name: "login",

  props: [],

  mixins: [validationMixin],

  validations: {
    userEmail: { required, email },
    userPassword: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(24)
    }
  },

  data: () => ({
    userEmail: "",
    userPassword: "",
    loginStatus: null
  }),

  computed: {
    userEmailErrors() {
      const errors = [];
      if (!this.$v.userEmail.$dirty) return errors;
      !this.$v.userEmail.email && errors.push("Must be valid e-mail");
      !this.$v.userEmail.required && errors.push("E-mail is required");
      return errors;
    },

    userPasswordErrors() {
      const errors = [];
      if (!this.$v.userPassword.$dirty) return errors;
      !this.$v.userPassword.required && errors.push("Password is required");
      !this.$v.userPassword.minLength &&
        errors.push("Password must have at least 6 characters");
      !this.$v.userPassword.maxLength &&
        errors.push("Password must be at most 24 characters long");
      return errors;
    }
  },

  methods: {
    login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loginStatus = "ERROR";
      } else {
        this.loginStatus = "PENDING";
        setTimeout(() => {
          this.loginStatus = "OK";

          const user = {
            email: this.userEmail,
            password: this.userPassword
          };

          axios
            .post(
              "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDBzUAWbmfnPy__r0D88A3nHGwQVY_r93g",
              {
                email: user.email,
                password: user.password,
                returnSecureToken: true
              }
            )
            .then(response => console.log(response))
            .catch(error => console.log(error));

          //CATCH LOGIN ERROR AND DISPLAY FORM ALERT HERE

          //EventBus.$emit("name", user.name);
          setTimeout(() => {
            this.$router.push("/");
            //redirects to addlist
          }, 1000);
        }, 1000);
      }
    }
  }
};
</script>
