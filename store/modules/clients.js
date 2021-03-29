// State
const state = () => ({
	clients: [],
	players: [],
	regPlayers: {
		banner: {
			id: '',
		}
	},
	otherPlayers: [],
	ipClients: [],
	deposit: [],
	withdrawals: [],
	bets: [],
	regularPlayers: []
});

// Actions
const actions = {
	// Fetching clients only.
	async getClients({ commit }, data) {
		await this.$axios
			.get("/clients", {
				params: data
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
				params: data
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
					sort: data.sortBy,
					limit: data.limit,
					page: data.page,
					search: data.search
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
				params: data
			})
			.then(response => {
				commit("SET_IP_CLIENTS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// Getting deposit details
	async getDeposit({ commit }, data) {
		await this.$axios
			.get("/deposits/all", {
				params: data
			})
			.then(response => {
				commit("SET_DEPOSIT", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// Getting withdrawal details
	async getWithdrawals({ commit }, data) {
		await this.$axios
			.get("/withdrawals/all", {
				params: data
			})
			.then(response => {
				commit("SET_WITHDRAWALS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// Getting bets details
	async getBets({ commit }, data) {
		await this.$axios
			.get("/bets/all", {
				params: data
			})
			.then(response => {
				commit("SET_BETS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// Registered players listing
	async getRegisteredPlayers({ commit }, data) {
		await this.$axios.get(`/direct/players/${data.id}`, {
			params: data.param
		}).then(response => {
			commit("SET_REG_PLAYERS", response.data.data);
		});
	},

	// Regular Players
	// Getting bets details
	async getRegularPlayers({ commit }, data) {
		await this.$axios
			.get("/regular/players", {
				params: data
			})
			.then(response => {
				commit("SET_REGULAR_PLAYERS", response.data.data);
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
	},
	SET_REG_PLAYERS(state, response) {
		state.regPlayers = response;
	},
	SET_DEPOSIT(state, response) {
		state.deposit = response;
	},
	SET_WITHDRAWALS(state, response) {
		state.withdrawals = response;
	},
	SET_BETS(state, response) {
		state.bets = response;
	},
	SET_REGULAR_PLAYERS(state, response) {
		state.regularPlayers = response;
	},
};

// Getters
const getters = {
	getClients: state => {
		return state.clients;
	},
	getPlayers: state => {
		return state.players;
	},
	getRegPlayers: state => {
		return state.regPlayers;
	},
	getOtherPlayers: state => {
		return state.otherPlayers;
	},
	getIpClients: state => {
		return state.ipClients;
	},
	getDeposit: state => {
		return state.deposit;
	},
	getWithdrawals: state => {
		return state.withdrawals;
	},
	getBets: state => {
		return state.bets;
	},
	getRegularPlayers: state => {
		return state.regularPlayers;
	},
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
