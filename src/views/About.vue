<template>
  <div class="about">
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <img alt="Vue logo" src="../assets/logo.png">
        <h1 class="display-4">Vue Venue</h1>
        <h2 class="display-3">Online Booking</h2>
      </v-flex>


      <v-flex xs3>
      <v-card class="mr-4 mt-5">
        
        <v-card-title primary-title>
          <div class="mx-auto">
            <v-icon x-large>create</v-icon>
            <h3 class="headline mb-0">Add a new user</h3>
            <div>Grant authorization</div>
            <v-btn to="/signup" flat style="color: #42b883; text-decoration: underline">New User</v-btn>
          </div>
        </v-card-title>
        
      </v-card>
    </v-flex>

    <v-flex xs3>
      <v-card class="ml-4 mt-5">

        <v-card-title primary-title>
          <div class="mx-auto">
            <v-icon x-large>done</v-icon>
            <h3 class="headline mb-0" >Log in to your account</h3>
            <div>Access the dashboard</div>
            <v-btn to="/login" class="text-xs-center" flat style="color: #42b883; text-decoration: underline">Login</v-btn>
          </div>
        </v-card-title>

      </v-card>
    </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "about"
};
</script>
