// State
export const state = () => ({
	groupLevels: [],
});

// Actions
export const actions = {
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
				throw error.response ? error.response.data.error : error;
			});
	},
};

// Mutations
export const mutations = {
	SET_GROUP_LEVEL(state, response) {
		state.groupLevels = response;
	},
};

// Getters
export const getters = {
	getGroupLevels: state => {
		return state.groupLevels;
	},
};
