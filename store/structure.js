// State
const state = () => ({
	default: 0,
});

// Actions
const actions = {
	async getDefault({ commit }) {
		await this.$axios
			.get("/api")
			.then(response => {
				commit("SET_DEFAULT", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, {
					root: true
				});
				throw error.response ? error.response.data.error : error;
			});
	},
};

// Mutations
const mutations = {
	SET_DEFAULT(state, response) {
		state.default = response;
	},
};

// Getters
const getters = {
	getDefault: state => {
		return state.default;
	},
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
