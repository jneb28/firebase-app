<template>
  <div id="app">
    <v-app dark>
      <v-navigation-drawer v-if="isUser"
        app
        v-model="drawer"
        clipped
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
        v-model="drawer"
        clipped
        floating
      >
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
                <v-list-tile-title class="font-weight-medium title">{{ username }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            @click="$router.push({ path: `/${items[0].link}` })"
          >
            <v-list-tile-action>
              <v-icon>{{ items[0].icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="font-weight-medium body-2">{{ items[0].title }}</v-list-tile-title>
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

          <v-list-tile
            @click="$router.push({ path: `/${items[2].link}` })"
          >
            <v-list-tile-action>
              <v-icon>{{ items[2].icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="font-weight-medium body-2">{{ items[2].title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>


      <v-toolbar v-if="isUser"
      app
      flat
      clipped-left
      v-low-foot>
        <v-layout align-center> 
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title class="font-weight-medium headline">Git Gifts</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn flat class="py-3 px-3 mx-2 font-weight-medium body-1" to="/">About</v-btn>
            <v-btn flat class="py-3 px-3 mx-2 font-weight-medium body-1" to="/join">Log Out</v-btn>
          </v-toolbar-items>
        </v-layout>
      </v-toolbar>

      <v-toolbar v-else
      app
      flat
      clipped-left
      v-low-foot>
        <v-layout align-center> 
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title class="font-weight-medium headline">Git Gifts</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn flat class="py-3 px-3 mx-2 font-weight-medium body-1" to="/">About</v-btn>
            <v-btn flat class="py-3 px-3 mx-2 font-weight-medium body-1" to="/join">Sign Up</v-btn>
            <v-btn flat class="py-3 px-3 mx-2 font-weight-medium body-1" to="/login">Login</v-btn>
          </v-toolbar-items>
        </v-layout>
      </v-toolbar>
      

      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>

      
      <v-footer v-if="isUser"
      app
      height="auto" 
      inset>
        <v-layout justify-center row wrap>
          <v-btn flat class="caption font-weight-light" to="/">About</v-btn>
          <v-btn flat class="caption font-weight-light" to="/join">Log Out</v-btn>
          <v-flex v-low-foot py-3 px-3 xs12> 
          <span class="caption font-weight-thin">&copy;2018 Git Gifts</span> 
          </v-flex>
        </v-layout>
      </v-footer>

      <v-footer v-else
      app
      height="auto"
      inset>
        <v-layout justify-center row wrap>
          <v-btn flat class="caption font-weight-light" to="/">About</v-btn>
          <v-btn flat class="caption font-weight-light" to="/join">Sign Up</v-btn>
          <v-btn flat class="caption font-weight-light" to="/login">Login</v-btn>
          <v-flex v-low-foot py-3 px-3 xs12> 
          <span class="caption font-weight-thin">&copy;2018 Git Gifts</span> 
          </v-flex>
        </v-layout>
      </v-footer>

    </v-app>
  </div>
</template>

<script>
//import { EventBus } from "./main.js";
//import axios from "axios";

export default {
  name: "app",

  data() {
    return {
      drawer: null,
      right: null,
      items: [
        { title: "About", icon: "dashboard", link: "" },
        { title: "Sign Up", icon: "person_add", link: "join" },
        { title: "Login", icon: "done", link: "login" },
        { title: "Starwars", icon: "star", link: "starwars" },
        { title: "New List", icon: "person_add", link: "starwars/add" },
        { title: "Edit List", icon: "gavel", link: "" },
        { title: "Share List", icon: "account_box", link: "" }
      ],
      username: "Welcome to Git Gifts!",
      isUser: false,
      lists: []
    };
  },

  mounted() {
    // EventBus.$on("name", data => {
    //   this.username = "Welcome, " + data + "!";
    //   this.isUser = true;
    // });
    // axios.get("https://git-gifts.firebaseio.com/users.json")
    // .then(response => {
    //   console.log(response);
    //   const data = response.data;
    //   const users = [];
    //   for (let key in data) {
    //     const user = data[key];
    //     console.log(key);
    //     user.id = key;
    //     users.push(user);
    //   }
    //   console.log(users);
    //   this.username = "Welcome, " + users[0].username + "!";
    // })
    // .catch(error => console.log(error));
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
