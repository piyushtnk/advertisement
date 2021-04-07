// State
const state = () => ({
	layout: {
		snackbarText: "Welcome!",
		snackbarVisible: false
	},
	user: {}
});

// Actions
const actions = {
	async login({ commit }, userData) {
		return await this.$axios
			.post(`/user/login`, userData)
			.then(response => {
				let responseData = response.data.data;
				responseData.token = response.headers.token;
				commit("SET_LOGIN", responseData);
				commit("SET_LAYOUT_SNACKBAR_TEXT", "Logged In successfully.");

				// Local storing
				localStorage.token = responseData.token;
				this.$cookie.set('user', responseData)
				return true;
			})
			.catch(error => {

				if (error.response) {
					commit("SET_LAYOUT_SNACKBAR_TEXT", error.response.data.error);

				} else {
					commit("SET_LAYOUT_SNACKBAR_TEXT", error);
				}
				return false;
			});
	},
	logout: ({ commit }) => {
		localStorage.clear();
		commit("SET_LAYOUT_SNACKBAR_TEXT", "Logged out successfully.");

		return true;
	}
};

// Mutations
const mutations = {
	SET_LOGIN(state, response) {
		state.user = response;
	},
	SET_LAYOUT_SNACKBAR_TEXT(state, text) {
		state.layout.snackbarText = text;
	},
	SET_LAYOUT_SNACKBAR_VISIBLE(state, type) {
		state.layout.snackbarVisible = type;
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
