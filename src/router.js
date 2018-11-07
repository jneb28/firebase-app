import Vue from "vue";
import Router from "vue-router";
import About from "./views/About.vue";
import Join from "./views/Join.vue";
import Starwars from "./views/Starwars.vue";
import AddList from "./components/AddList.vue";
//import AddGift from "./components/AddGift.vue";

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
      path: "/starwars/:id",
      name: "starwars",
      component: Starwars,
      children: [
        {
          path: "addlist",
          component: AddList
        }
      ]
    }
  ]
});
/*
  {
    path: "/starwars",
    name: "starwars",
    components: {
      default: Starwars,
      addlist: AddList,
      addgift: AddGift
    }
  }
*/
