import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

export const EventBus = new Vue();

Vue.directive("list-item", {
  bind(el) {
    //binding vnode
    el.style.background = "#424242";
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
