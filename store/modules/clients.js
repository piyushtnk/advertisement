// State
const state = () => ({
	clients: [],
	players: [],
	otherPlayers: [],
	ipClients: []
});

// Actions
const actions = {
	// Fetching clients only.
	async getClients({ commit }, data) {
		await this.$axios
			.get("/clients", {
				params: {
					duration: data.duration ? data.duration : null,
					startDate: data.startDate ? data.startDate : null,
					endDate: data.endDate ? data.endDate : null,
					sort: 'cid|desc',
					limit: data.limit,
					page: data.page
				}
			})
			.then(response => {
				commit("SET_CLIENTS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// Fetching players only.
	async getPlayers({ commit }, data) {
		await this.$axios
			.get("/players", {
				params: {
					duration: data.duration ? data.duration : null,
					startDate: data.startDate ? data.startDate : null,
					endDate: data.endDate ? data.endDate : null,
					sort: 'id|desc',
					limit: data.limit,
					page: data.page
				}
			})
			.then(response => {
				commit("SET_PLAYERS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// Fetching other players only
	async getOtherPlayers({ commit }, data) {
		await this.$axios
			.get("/otherplayers", {
				params: {
					duration: data.duration ? data.duration : null,
					startDate: data.startDate ? data.startDate : null,
					endDate: data.endDate ? data.endDate : null,
					sort: 'id|desc',
					limit: data.limit,
					page: data.page
				}
			})
			.then(response => {
				commit("SET_OTHER_PLAYERS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// Fetching IP Clients
	async getIpClients({ commit }, data) {
		await this.$axios
			.get("/ip/clients", {
				params: {
					duration: data.duration ? data.duration : null,
					startDate: data.startDate ? data.startDate : null,
					endDate: data.endDate ? data.endDate : null,
					sort: 'id|desc',
					limit: data.limit,
					page: data.page
				}
			})
			.then(response => {
				commit("SET_IP_CLIENTS", response.data.data);
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
	SET_CLIENTS(state, response) {
		state.clients = response;
	},
	SET_PLAYERS(state, response) {
		state.players = response;
	},
	SET_OTHER_PLAYERS(state, response) {
		state.otherPlayers = response;
	},
	SET_IP_CLIENTS(state, response) {
		state.ipClients = response;
	}
};

// Getters
const getters = {
	getClients: state => {
		return state.clients;
	},
	getPlayers: state => {
		return state.players;
	},
	getOtherPlayers: state => {
		return state.otherPlayers;
	},
	getIpClients: state => {
		return state.ipClients;
	}
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
