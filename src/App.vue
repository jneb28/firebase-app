<template>
<v-app dark>
  <v-navigation-drawer v-if="isUser"
    app
    clipped
    dark
    permanent
  >
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
            <v-list-tile-title>{{ username }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile
        v-for="(item, index) in items.slice(3)"
        :key="index"
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

  <v-navigation-drawer v-else
    app
    clipped
    dark
    permanent
  >
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
            <v-list-tile-title>{{ username }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        @click="$router.push({ path: `/${items[1].link}` })"
      >
        <v-list-tile-action>
          <v-icon>{{ items[1].icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ items[1].title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

  

  <v-toolbar app flat dark clipped-left>
    <v-toolbar-title class="white--text">Git Gifts</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn replace flat color="white" v-active-nav><router-link class="white--text" to="/">About</router-link></v-btn>
      <v-btn replace flat color="white"><router-link class="white--text" to="/join">Join</router-link></v-btn>
      <v-btn replace flat color="white"><router-link class="white--text" to="/starwars">Starwars</router-link></v-btn>
    </v-toolbar-items>
  </v-toolbar>


  <v-content>
    <v-container fluid justify-center>
      <router-view></router-view>
    </v-container>
  </v-content>

  
  <v-footer app dark height="auto">
    <v-layout justify-center row wrap>
      <v-btn flat color="white"><router-link class="white--text" to="/">About</router-link></v-btn>
      <v-btn flat color="white"><router-link class="white--text" to="/join">Join</router-link></v-btn>
      <v-btn flat color="white"><router-link class="white--text" to="/starwars">Starwars</router-link></v-btn>
      <v-flex color="grey" lighten-2 py-3 px-3 text-xs-center white--text xs12> 
      &copy;2018 — <strong>Git Gifts</strong> 
      </v-flex>
    </v-layout>
  </v-footer>


</v-app>
</template>

<script>
import { EventBus } from "./main.js";

export default {
  name: "app",

  data() {
    return {
      items: [
        { title: "About", icon: "dashboard", link: "" },
        { title: "Join", icon: "person_add", link: "join" },
        { title: "Starwars", icon: "star", link: "starwars" },
        { title: "Create List", icon: "person_add", link: "" },
        { title: "Edit List", icon: "gavel", link: "" },
        { title: "Share List", icon: "account_box", link: "" }
      ],
      username: "Sign up for free!",
      isUser: false
    };
  },

  mounted() {
    EventBus.$on("username", data => {
      this.username = "Welcome, " + data + "!";
      this.isUser = true;
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
