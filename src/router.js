import Vue from "vue";
import Router from "vue-router";
import About from "./views/About.vue";

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
      component: () => import("./views/Join.vue")
    },
    {
      path: "/starwars",
      name: "starwars",
      component: () => import("./views/Starwars.vue")
    }
  ]
});
