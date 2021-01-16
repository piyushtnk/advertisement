import axios from "../config";

// State
const state = {
  layout: {
    snackbarText: "Welcome to login page"
  },
  user: {}
};

// Actions
const actions = {
  login: async ({ commit }, userData) => {
    return await axios
      .post(`/user/login`, {
        username: userData.username,
        password: userData.password
      })
      .then(response => {
        commit("SET_LOGIN", response);
        commit("SET_LAYOUT_SNACKBAR_TEXT", response);
        return response.data.data;
      })
      .catch(error => {
        commit("SET_LAYOUT_SNACKBAR_TEXT", error);
        throw error.response ? error.response.data.error : error;
      });
  }
};

// Mutations
const mutations = {
  SET_LOGIN(state, response) {
    state.user = response;
  },
  SET_LAYOUT_SNACKBAR_TEXT(state, text) {
    state.layout.snackbarText = text;
  }
};

// Getters
const getters = {
  isLoggedIn: state => {
    return state.user;
  }
};

// Default export
export default {
  state,
  mutations,
  actions,
  getters
};
