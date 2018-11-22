import Vue from "vue";
import Router from "vue-router";
import store from "./store.js";

import About from "./views/About.vue";
import SignUp from "./views/SignUp.vue";
import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "about",
      component: About
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      beforeEnter(to, from, next) {
        if (store.state.idToken) {
          next();
        } else {
          next("/login");
        }
      }
    }
  ]
});
