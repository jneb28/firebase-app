import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

Vue.config.productionTip = false;

// ************************ VUE DIRECTIVE ************************
Vue.directive("low-foot", {
  bind(el) {
    //binding vnode
    el.style.background = "#191919";
  }
});

// ************************ FIREBASE ************************
var config = {
  apiKey: "AIzaSyDBzUAWbmfnPy__r0D88A3nHGwQVY_r93g",
  authDomain: "git-gifts.firebaseapp.com",
  databaseURL: "https://git-gifts.firebaseio.com",
  projectId: "git-gifts",
  storageBucket: "git-gifts.appspot.com",
  messagingSenderId: "701971701375"
};
firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
