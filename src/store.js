import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
    }
  },
  actions: {
    join({ commit }, payload) {
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
    }
  }
});
