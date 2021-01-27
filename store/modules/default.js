// State
const state = () => ({
	snackbarText: "Welcome!",
	snackbarVisible: false,
});

// Actions
const actions = {
	setSnackbarText({ commit }, text) {
		commit("SET_SNACKBAR_TEXT", text);
	},
	setSnackbarVisible({ commit }, type) {
		commit("SET_SNACKBAR_VISIBLE", type);
	}
};

// Mutations
const mutations = {
	SET_SNACKBAR_TEXT(state, text) {
		state.snackbarText = text;
	},
	SET_SNACKBAR_VISIBLE(state, type) {
		state.snackbarVisible = type;
	},
};

// Getters
const getters = {};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
