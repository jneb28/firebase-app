import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

export const EventBus = new Vue();

Vue.directive("active-nav", {
  bind(el) {
    //binding vnode
    el.style.background = "#ac41f4";
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
