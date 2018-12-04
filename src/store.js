import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    userId: null,
    idToken: null,
    loginStatus: null
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
    addBand({ state }, payload) {
      state.loginStatus = "PENDING";
      axios
      .post(
        "https://git-gifts.firebaseio.com/bands.json" + "?auth=" + state.idToken, payload
      )
      .then(response => {
        state.loginStatus = "OK";
        console.log(response);
        state.loginStatus = null;
      })
      .catch(error => {
        state.loginStatus = "ERROR";
        console.log(error);
      });
      
    },

    newUser({ commit, state, dispatch }, payload) {
      state.loginStatus = "PENDING";
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
          state.loginStatus = "OK";
          console.log(response);
          commit("authUser", {
            token: response.data.idToken,
            userId: response.data.localId
          });
          dispatch("storeUser", payload);
        })
        .catch(error => {
          state.loginStatus = "ERROR";
          console.log(error);
        });
    },

    login({ commit, state }, payload) {
      state.loginStatus = "PENDING";
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
          state.loginStatus = "OK";
          state.username = payload.email;
          console.log(response);
          commit("authUser", {
            token: response.data.idToken,
            userId: response.data.localId
          });
        })
        //CATCH LOGIN ERROR AND DISPLAY FORM ALERT HERE
        .catch(error => {
          state.loginStatus = "ERROR";
          console.log(error);
        });
    },

    logOut({ commit, state }) {
      state.loginStatus = null;
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
