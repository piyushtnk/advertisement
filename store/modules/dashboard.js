// State
const state = () => ({
  dashboard: {
    all: {},
    today: {}
  }
});

// Actions
const actions = {
  async getDashboard({ commit }, data) {
    console.log("From Props", data);
    await this.$axios
      .get("/dashboard", { params: { duration: data.filterForCounter } })
      .then(response => {
        commit("SET_DASHBOARD", response.data.data);
      })
      .catch(error => {
        commit("SET_SNACKBAR_TEXT", error, { root: true });
        commit("SET_SNACKBAR_VISIBLE", true, { root: true });
        throw error.response ? error.response.data.error : error;
      });
  }
};

// Mutations
const mutations = {
  SET_DASHBOARD(state, response) {
    state.dashboard = response;
  }
};

// Getters
const getters = {
  getDashboard: state => {
    return state.dashboard;
  }
};

// Default export
export default {
  state,
  mutations,
  actions,
  getters
};
