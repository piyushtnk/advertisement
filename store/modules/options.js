// State
const state = () => ({
	groupLevels: [],
});

// Actions
const actions = {
	async groupLevels({ commit }, data) {
		await this.$axios
			.get("/levels/all", {
				params: data
			})
			.then(response => {
				commit("SET_GROUP_LEVEL", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},
};

// Mutations
const mutations = {
	SET_GROUP_LEVEL(state, response) {
		state.groupLevels = response;
	},
};

// Getters
const getters = {
	getGroupLevels: state => {
		return state.groupLevels;
	},
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
