<template>
<div id="app">
  <v-app>


    <v-card>
      <v-navigation-drawer
          app
          v-model="drawer"
          permanent
          fixed
          clipped
      >
        <v-toolbar flat class="transparent">   
        <v-list class="pa-0">
            <v-list-tile avatar>
            <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
                <v-list-tile-title>{{ username }}</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
        </v-list>
        </v-toolbar>

        <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
            v-for="item in items"
            :key="item.title"
            @click="$router.push({ path: `/${item.link}` })"
        >
          <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-card>


    <v-toolbar app flat color="accent darken-1" clipped-left>
      <v-toolbar-title class="white--text text-xs-center">Git Gifts</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn flat v-list-item><router-link class="white--text" to="/">About</router-link></v-btn>
        <v-btn flat><router-link class="white--text" to="/join">Join</router-link></v-btn>
        <v-btn flat><router-link class="white--text" to="/starwars">Starwars</router-link></v-btn>
      </v-toolbar-items>
    </v-toolbar>


    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>

    
    <v-footer app color="accent lighten-1" height="auto">
      <v-layout justify-center row wrap>
        <v-btn flat color="white" round><router-link class="white--text" to="/">About</router-link></v-btn>
        <v-btn flat color="white" round><router-link class="white--text" to="/join">Join</router-link></v-btn>
        <v-btn flat color="white" round><router-link class="white--text" to="/starwars">Starwars</router-link></v-btn>
        <v-flex accent darken-1 py-3 text-xs-center white--text xs12>
        &copy;2018 — <strong>Git Gifts</strong>
        </v-flex>
      </v-layout>
    </v-footer>


  </v-app>
</div>
</template>

<script>
import { EventBus } from "./main.js";

export default {
  name: "app",

  data() {
    return {
      drawer: true,
      items: [
        { title: "About", icon: "dashboard", link: "" },
        { title: "Join", icon: "person_add", link: "join" },
        { title: "Starwars", icon: "star", link: "starwars" }
      ],
      right: null,
      username: "Sign up for free!"
    };
  },

  mounted() {
    EventBus.$on("username", data => {
      this.username = "Welcome, " + data + "!";
    });
  }
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
</style>
