// State
const state = () => ({
  banners: []
});

// Actions
const actions = {
  // upload banner
  async uploadBanner({ commit }, data) {
    let formData = new FormData();
    formData.append("banner", data.image);
    formData.append("redirectUrl", data.url);

    await this.$axios
      .post("/banner", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        commit("SET_SNACKBAR_TEXT", "Your banner successfully uploaded.", {
          root: true
        });
        commit("SET_SNACKBAR_VISIBLE", true, { root: true });

        commit("SET_BANNERS", response.data.data);

        return true;
      })
      .catch(error => {
        commit("SET_SNACKBAR_TEXT", error, { root: true });
        commit("SET_SNACKBAR_VISIBLE", true, { root: true });
        throw error.response ? error.response.data.error : error;
      });
  },

  // Get all banners
  async getBanners({ commit }) {
    await this.$axios
      .get("/banners")
      .then(response => {
        commit("SET_BANNERS", response.data.data);
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
  SET_BANNERS(state, response) {
    if (state.banners.length > 0) {
      state.banners = [response, ...state.banners];
    } else {
      state.banners = response;
    }
  }
};

// Getters
const getters = {
  getBanners: state => {
    return state.banners;
  }
};

// Default export
export default {
  state,
  mutations,
  actions,
  getters
};
