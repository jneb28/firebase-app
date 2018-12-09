<template>
  <div id="app">
    <v-app dark>


      <v-navigation-drawer
        app
        v-model="drawer"
        clipped
        floating
      >
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
                <v-list-tile-title class="font-weight-medium title" style="color: #42b883; text-decoration: underline" v-if="!checkAuth">
                  {{ tileTitle }}
                </v-list-tile-title>

                <v-list-tile-title class="font-weight-medium title" 
                style="color: #42b883; text-decoration: underline" v-if="checkAuth">
                  {{ this.$store.state.username }}
                </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>
          
          <v-list-tile 
            @click="$router.push({ path: `/${items[0].link}` })"
          >
            <v-list-tile-action>
              <v-icon>{{ items[0].icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="font-weight-medium body-2">
                {{ items[0].title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile 
            v-if="!checkAuth"
            @click="$router.push({ path: `/${items[1].link}` })"
          >
            <v-list-tile-action>
              <v-icon>
                {{ items[1].icon }}
              </v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="font-weight-medium body-2">
                {{ items[1].title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            v-if="!checkAuth"
            @click="$router.push({ path: `/${items[2].link}` })"
          >
            <v-list-tile-action>
              <v-icon>
                {{ items[2].icon }}
              </v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="font-weight-medium body-2">
                {{ items[2].title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            v-if="checkAuth"
            @click="$router.push({ path: `/${items[3].link}` })"
          >
            <v-list-tile-action>
              <v-icon>
                {{ items[3].icon }}
              </v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="font-weight-medium body-2">
                {{ items[3].title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            v-if="checkAuth"
            @click="logOut"
          >
            <v-list-tile-action>
              <v-icon>
                {{ items[4].icon }}
              </v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="font-weight-medium body-2">
                {{ items[4].title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>


      <v-toolbar
        app
        flat
        clipped-left
        v-low-foot
      >
        <v-layout align-center> 
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title class="font-weight-medium headline">
            Vue Venue
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn flat class="py-3 px-3 mx-2 font-weight-medium body-1" to="/">
              Home
            </v-btn>

            <v-btn flat class="py-3 px-3 mx-2 font-weight-medium body-1" v-if="!checkAuth" to="/signup">
              New User
            </v-btn>

            <v-btn flat class="py-3 px-3 mx-2 font-weight-medium body-1" v-if="!checkAuth" to="/login">
              Login
            </v-btn>

            <v-btn flat class="py-3 px-3 mx-2 font-weight-medium body-1" v-if="checkAuth" to="/dashboard">
              Dashboard
            </v-btn>

            <v-btn flat class="py-3 px-3 mx-2 font-weight-medium body-1"  @click="logOut" v-if="checkAuth">
              Log Out
            </v-btn>
          </v-toolbar-items>
        </v-layout>
      </v-toolbar>


      <v-content>
        <v-container fluid>
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </v-container>
      </v-content>


      <v-footer
        app
        height="auto"
        inset
      >
        <v-layout justify-center row wrap>
          <v-btn flat class="caption font-weight-light" to="/">
            Home
          </v-btn>

          <v-btn flat class="caption font-weight-light" v-if="!checkAuth" to="/signup">
            New User
          </v-btn>

          <v-btn flat class="caption font-weight-light" v-if="!checkAuth" to="/login">
            Login
          </v-btn>

          <v-btn flat class="caption font-weight-light" v-if="checkAuth" to="/dashboard">
            Dashboard
          </v-btn>

          <v-btn flat class="caption font-weight-light" @click="logOut" v-if="checkAuth">
            Log Out
          </v-btn>

          <v-flex v-low-foot py-3 px-3 xs12>
          <span class="caption font-weight-thin">
            &copy;2018 Vue Venue
          </span> 
          </v-flex>
        </v-layout>
      </v-footer>


    </v-app>
  </div>
</template>

<script>
export default {
  name: "app",

  data() {
    return {
      drawer: null,
      right: null,
      items: [
        { title: "Home", icon: "home", link: "" },
        { title: "New User", icon: "create", link: "signup" },
        { title: "Login", icon: "done", link: "login" },
        { title: "Dashboard", icon: "dashboard", link: "dashboard" },
        { title: "Log Out", icon: "clear", link: "" }
      ],
      tileTitle: "Please log in . . ."
    };
  },

  computed: {
    checkAuth() {
      return this.$store.getters.isAuth;
    }
  },

  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    }
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
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
