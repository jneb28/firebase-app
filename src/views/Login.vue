<template>
  <div class="login">
    <v-layout row wrap justify-center>
      <v-flex xs4>

        <h1>Log In</h1>
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
            v-if="this.$store.state.loginStatus === 'OK'"
            :value="true"
            type="success"
          >
            You are now logged in! Redirecting . . .
          </v-alert>
          <v-alert
            v-if="this.$store.state.loginStatus === 'PENDING'"
            :value="true"
            type="info"
          >
            Logging in . . .
          </v-alert>
          <v-alert
            v-if="this.$store.state.loginStatus === 'ERROR'"
            :value="true"
            type="error"
          >
            Invalid login attempt . . .
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

export default {
  name: "login",

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
        this.$store.state.loginStatus = "ERROR";
      } else {
        this.$store.state.loginStatus = "PENDING";
        setTimeout(() => {
          this.$store.state.loginStatus = "OK";

          const user = {
            email: this.userEmail,
            password: this.userPassword
          };

          this.$store.dispatch("login", {
            email: user.email,
            password: user.password
          });

          setTimeout(() => {
            this.$router.push("/dashboard");
          }, 1000);
        }, 1000);
      }
    }
  }
};
</script>
