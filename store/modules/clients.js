import axios from "../config";

// State
const state = {
  clients: []
};

// Actions
const actions = {
  async getClients({ commit }) {
    await this.$axios
      .get("/clients")
      .then(response => {
        commit("SET_CLIENTS", response.data.data);
      })
      .catch(error => {
        $sentry.captureException(error);
      });
  }
};

// Mutations
const mutations = {
  SET_CLIENTS(state, response) {
    state.clients = response;
  }
};

// Getters
const getters = {
  getClients: state => {
    return state.clients;
  }
};

// Default export
export default {
  state,
  mutations,
  actions,
  getters
};
