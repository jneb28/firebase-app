import Vue from "vue";
import Router from "vue-router";
import About from "./views/About.vue";
import Join from "./views/Join.vue";
import Starwars from "./views/Starwars.vue";
import AddList from "./components/AddList.vue";
import EditList from "./components/EditList.vue";

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
    }
  ]
});
