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
                  <v-list-tile-title>John Leider</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-toolbar>

          <v-list class="pt-0" dense>
            <v-divider></v-divider>

            <v-list-tile
              v-for="item in items"
              :key="item.title"
              @click="$router.push({ path: `/${item.title}` })"
            > <!-- @click="" -->
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
          <v-btn flat><router-link class="white--text" to="/">Home</router-link></v-btn>
          <v-btn flat><router-link class="white--text" to="/about">About</router-link></v-btn>
          <v-btn flat><router-link class="white--text" to="/contact">Contact</router-link></v-btn>
          <v-btn flat><router-link class="white--text" to="/starwars">Starwars</router-link></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      

      <!-- justify-center -->
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>



      <v-footer app color="accent lighten-1" height="auto">
        <v-layout justify-center row wrap>
          <v-btn flat color="white" round><router-link class="white--text" to="/home">Home</router-link></v-btn>
          <v-btn flat color="white" round><router-link class="white--text" to="/about">About</router-link></v-btn>
          <v-btn flat color="white" round><router-link class="white--text" to="/contact">Contact</router-link></v-btn>
          <v-btn flat color="white" round><router-link class="white--text" to="/starwars">Starwars</router-link></v-btn>
          <v-flex accent darken-1 py-3 text-xs-center white--text xs12>
            &copy;2018 — <strong>Git Gifts</strong>
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
  name: "app",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" },
        { title: "Contact", icon: "person_add" },
        { title: "Starwars", icon: "star" }
      ],
      right: null
    };
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
