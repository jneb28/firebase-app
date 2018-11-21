import Vue from "vue";
import Router from "vue-router";
import store from "./store.js";

import About from "./views/About.vue";
import Join from "./views/Join.vue";
import Login from "./views/Login.vue";
import Starwars from "./views/Starwars.vue";
import AddList from "./components/AddList.vue";
import EditList from "./components/EditList.vue";
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
      path: "/join",
      name: "join",
      component: Join
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/starwars/:id",
      component: Starwars,
      props: true,
      children: [
        {
          path: "",
          component: AddList
        },
        {
          path: "/starwars/add/edit/:id",
          name: "editlist",
          component: EditList,
          props: true
        }
      ]
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
