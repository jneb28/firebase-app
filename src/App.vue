<template>
<v-app dark>
  <v-navigation-drawer v-if="isUser"
    app
    clipped
    dark
    permanent
    floating
  >
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
            <v-list-tile-title class="font-weight-medium title">{{ username }}</v-list-tile-title>
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
          <v-list-tile-title class="font-weight-medium body-2">{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer v-else
    app
    clipped
    dark
    permanent
    floating
  >
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
            <v-list-tile-title class="font-weight-medium title">{{ username }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        @click="$router.push({ path: `/${items[1].link}` })"
      >
        <v-list-tile-action>
          <v-icon>{{ items[1].icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title class="font-weight-medium body-2">{{ items[1].title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

  

  <v-toolbar app flat dark clipped-left v-low-foot>
    <v-layout align-center> 
      <v-toolbar-title class="font-weight-medium headline">Git Gifts</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn flat class="py-2 px-3 mx-2 font-weight-medium body-1" to="/">About</v-btn>
        <v-btn flat class="py-2 px-3 mx-2 font-weight-medium body-1" to="/join">Join</v-btn>
        <v-btn flat class="py-2 px-3 mx-2 font-weight-medium body-1" to="/starwars">Starwars</v-btn>
      </v-toolbar-items>
    </v-layout>
  </v-toolbar>


  <v-content>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-content>

  
  <v-footer app dark height="auto" inset>
    <v-layout justify-center row wrap>
      <v-btn flat class="caption font-weight-light mx-3" to="/">About</v-btn>
      <v-btn flat class="caption font-weight-light mx-3" to="/join">Join</v-btn>
      <v-btn flat class="caption font-weight-light mx-3" to="/starwars">Starwars</v-btn>
      <v-flex v-low-foot py-3 px-3 xs12> 
      <span class="caption font-weight-thin">&copy;2018 Git Gifts</span> 
      </v-flex>
    </v-layout>
  </v-footer>


</v-app>
<!--
<router-link to="/">About</router-link>
<router-link to="/join">Join</router-link>
<router-link to="/starwars">Starwars</router-link>
-->
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
      isUser: false,
      lists: []
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
}
</style>
