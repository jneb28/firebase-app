import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

export const EventBus = new Vue();

Vue.directive("low-foot", {
  bind(el) {
    //binding vnode
    el.style.background = "#191919"; //1px solid #f7f7f7
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
