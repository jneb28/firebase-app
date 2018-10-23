<template>
  <div id="app">
    <v-app>
      <v-toolbar app flat color="accent darken-1">
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat><router-link to="/">Home</router-link></v-btn>
          <v-btn flat><router-link to="/about">About</router-link></v-btn>
          <v-btn flat><router-link to="/contact">Contact</router-link></v-btn>
          <v-btn flat><router-link to="/starwars">Starwars</router-link></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>


    <v-footer color="accent lighten-1" height="auto">
      <v-layout justify-center row wrap>
        <v-btn flat color="white" round><router-link to="/">Home</router-link></v-btn>
        <v-btn flat color="white" round><router-link to="/about">About</router-link></v-btn>
        <v-btn flat color="white" round><router-link to="/contact">Contact</router-link></v-btn>
        <v-btn flat color="white" round><router-link to="/starwars">Starwars</router-link></v-btn>
        <v-flex accent darken-1 py-3 text-xs-center white--text xs12>
          &copy;2018 — <strong>Vuetify</strong>
        </v-flex>
      </v-layout>
    </v-footer>


    </v-app>
  </div>



  <!--
    <v-navigation-drawer app></v-navigation-drawer>

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/contact">Contact</router-link> |
      <router-link to="/starwars">Starwars</router-link>
    </div>
    <router-view/>
  -->
</template>

<script>
export default {
  name: "app"
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/*
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
*/

</style>
