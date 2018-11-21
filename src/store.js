import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [],
    userName: "",
    isUser: false,
    userId: null,
    idToken: null
  },
  mutations: {
    authUser(state, authData) {
      state.userId = authData.userId;
      state.idToken = authData.token;
    },
    clearAuth(state) {
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: {
    join({ commit, dispatch }, payload) {
      axios
        .post(
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDBzUAWbmfnPy__r0D88A3nHGwQVY_r93g",
          {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
          }
        )
        .then(response => {
          console.log(response);
          commit("authUser", {
            token: response.data.idToken,
            userId: response.data.localId
          });
          dispatch("storeUser", payload);
        })
        .catch(error => console.log(error));
    },
    login({ commit }, payload) {
      axios
        .post(
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDBzUAWbmfnPy__r0D88A3nHGwQVY_r93g",
          {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
          }
        )
        .then(response => {
          console.log(response);
          commit("authUser", {
            token: response.data.idToken,
            userId: response.data.localId
          });
        })
        //CATCH LOGIN ERROR AND DISPLAY FORM ALERT HERE
        .catch(error => console.log(error));
    },

    logOut({ commit }) {
      commit("clearAuth");
      router.replace("/");
    },

    storeUser({ state }, payload) {
      if (!state.idToken) {
        return;
      }
      axios
        .post(
          "https://git-gifts.firebaseio.com/users.json" +
            "?auth=" +
            state.idToken,
          payload
        )
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
  },
  getters: {
    isAuth(state) {
      return state.idToken !== null;
    }
  }
});
