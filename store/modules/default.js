// State
const state = () => ({
	toastContent: {
		message: '',
		color: ''
	},
	toastStatus: false,
});

// Actions
const actions = {
	setToast({ commit }, obj) {
		commit("SET_TOAST_CONTENT", { message: obj.message, color: obj.color });
		commit("SET_TOAST_STATUS", true);
	},
};

// Mutations
const mutations = {
	SET_TOAST_CONTENT(state, object) {
		state.toastContent = object;
	},
	SET_TOAST_STATUS(state, type) {
		state.toastStatus = type;
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
