<template>
<div id="app">
  <v-app>
    
    <!-- <v-card v-if="isUser">
      <v-navigation-drawer 
      v-model="drawer"
      fixed
      clipped
      permanent
      app
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
        
        <v-list-tile v-for="(item, index) in items.slice(3)" :key="index" @click="$router.push({ path: `/${item.link}` })">
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

    <v-card v-else>
      <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      permanent
      app
      >
        <v-toolbar flat class="transparent">   
        <v-list class="pa-0">
            <v-list-tile avatar>

            <v-list-tile-content>
                <v-list-tile-title>{{ username }}</v-list-tile-title>
            </v-list-tile-content>
            </v-list-tile>
        </v-list>
        </v-toolbar>

        <v-list class="pt-0" dense>
        <v-divider></v-divider>
        
        <v-list-tile @click="$router.push({ path: `/${items[1].link}` })">
          <v-list-tile-action>
          <v-icon>{{ items[1].icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
          <v-list-tile-title>{{ items[1].title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-card> -->

    
    <v-navigation-drawer v-if="isUser"
    v-model="drawer"
    fixed
    clipped
    permanent
    app
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
      
      <v-list-tile v-for="(item, index) in items.slice(3)" :key="index" @click="$router.push({ path: `/${item.link}` })">
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
    v-model="drawer"
    fixed
    clipped
    permanent
    app
    >
      <v-toolbar flat class="transparent">   
      <v-list class="pa-0">
          <v-list-tile avatar>

          <v-list-tile-content>
              <v-list-tile-title>{{ username }}</v-list-tile-title>
          </v-list-tile-content>
          </v-list-tile>
      </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
      <v-divider></v-divider>
      
      <v-list-tile @click="$router.push({ path: `/${items[1].link}` })">
        <v-list-tile-action>
        <v-icon>{{ items[1].icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
        <v-list-tile-title>{{ items[1].title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    

    <v-toolbar app flat color="accent darken-1" clipped-left>
      <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
      <v-toolbar-title class="white--text text-xs-center">Git Gifts</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn flat color="white" v-active-nav><router-link class="white--text" to="/">About</router-link></v-btn>
        <v-btn flat color="white"><router-link class="white--text" to="/join">Join</router-link></v-btn>
        <v-btn flat color="white"><router-link class="white--text" to="/starwars">Starwars</router-link></v-btn>
      </v-toolbar-items>
    </v-toolbar>


    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    
    <v-footer app color="accent lighten-1" height="auto">
      <v-layout justify-center row wrap>
        <v-btn flat color="white"><router-link class="white--text" to="/">About</router-link></v-btn>
        <v-btn flat color="white"><router-link class="white--text" to="/join">Join</router-link></v-btn>
        <v-btn flat color="white"><router-link class="white--text" to="/starwars">Starwars</router-link></v-btn>
        <v-flex accent darken-1 py-3 px-3 text-xs-center white--text xs12> 
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
        { title: "Starwars", icon: "star", link: "starwars" },
        { title: "Create List", icon: "star", link: "" },
        { title: "Edit List", icon: "star", link: "" },
        { title: "Share List", icon: "star", link: "" }
      ],
      right: null,
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
