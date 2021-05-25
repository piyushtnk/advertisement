// State
export const state = () => ({
	toastContent: {
		text: '',
		color: ''
	},
	toastStatus: false,
});

// Actions
export const actions = {
	setToast({ commit }, obj) {
		commit("SET_TOAST_CONTENT", { text: obj.text, color: obj.color });
		commit("SET_TOAST_STATUS", true);
	},
};

// Mutations
export const mutations = {
	SET_TOAST_CONTENT(state, object) {
		state.toastContent = object;
	},
	SET_TOAST_STATUS(state, type) {
		state.toastStatus = type;
	},
};

// Getters
export const getters = {};
