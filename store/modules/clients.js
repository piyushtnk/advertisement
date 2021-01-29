// State
const state = () => ({
	layout: {
		snackbarText: "Welcome!",
		snackbarVisible: false
	},
	clients: [],
	players: []
});

// Actions
const actions = {
	async getClients({ commit }) {
		await this.$axios
			.get("/clients")
			.then(response => {
				commit("SET_CLIENTS", response.data.data);
			})
			.catch(error => {
				commit("SET_LAYOUT_SNACKBAR_TEXT", error);
				commit("SET_LAYOUT_SNACKBAR_VISIBLE", true);
				throw error.response ? error.response.data.error : error;
			});
	},
	async getPlayers({ commit }, data) {
		await this.$axios
			.get("/players", {
				params: {
					duration: data.duration ? data.duration : null,
					startDate: data.startDate ? data.startDate : null,
					endDate: data.endDate ? data.endDate : null
				}
			})
			.then(response => {
				commit("SET_PLAYERS", response.data.data);
			})
			.catch(error => {
				commit("SET_LAYOUT_SNACKBAR_TEXT", error);
				commit("SET_LAYOUT_SNACKBAR_VISIBLE", true);
				throw error.response ? error.response.data.error : error;
			});
	}
};

// Mutations
const mutations = {
	SET_LAYOUT_SNACKBAR_TEXT(state, text) {
		state.layout.snackbarText = text;
	},
	SET_LAYOUT_SNACKBAR_VISIBLE(state, type) {
		state.layout.snackbarVisible = type;
	},
	SET_CLIENTS(state, response) {
		state.clients = response;
	},
	SET_PLAYERS(state, response) {
		state.players = response;
	}
};

// Getters
const getters = {
	getClients: state => {
		return state.clients;
	},
	getPlayers: state => {
		return state.players;
	}
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
