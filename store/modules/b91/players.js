// State
const state = () => ({
	players: [],
	otherPlayers: [],
	deposit: [],
	withdrawals: [],
	bets: [],
	regPlayers: {
		banner: {
			id: '',
		}
	},
	assRegPlayers: {
		banner: {
			id: '',
		}
	},
	bannerRegPlayers: {
		banner: {
			id: '',
		}
	},
	regularPlayers: [],
	playerInfo: {
		loginip: {
			loginIpPool: []
		},
		clicks: {
			bannerClicks: [],
		},
		views: {
			bannerViews: []
		},
		info: []
	},
});

// Actions
const actions = {
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

				throw error.response ? error.response.data.error : error;
			});
	},

	// Registered players listing -- Decrypted.
	async getRegisteredPlayers({ commit }, data) {
		await this.$axios.get(`/direct/players/${data.id}`, {
			params: data.param
		}).then(response => {
			commit("SET_REG_PLAYERS", response.data.data);
		});
	},

	// Associated Registered players listing
	async getAssociatedRegisteredPlayers({ commit }, data) {
		await this.$axios.get(`/associated/players/${data.id}`, {
			params: data.param
		}).then(response => {
			commit("SET_ASS_REG_PLAYERS", response.data.data);
		});
	},

	// get Banner registered players
	async getBannerRegisteredPlayers({ commit }, data) {
		await this.$axios.get(`/players/banner/${data.id}`, {
			params: data.param
		}).then(response => {
			commit("SET_BANNER_REG_PLAYERS", response.data.data);
		});
	},

	// Regular Players
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

				throw error.response ? error.response.data.error : error;
			});
	},

	// Get login Ip detail
	async playerInfo({ commit }, data) {
		const $this = this;
		await $this.$axios
			.get(`/player/${data.type}`, {
				params: data.params
			})
			.then(response => {
				commit("SET_PLAYER_INFO", { type: data.type, data: response.data.data });
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });

				throw error.response ? error.response.data.error : error;
			});
	},
};

// Mutations
const mutations = {
	SET_PLAYERS(state, response) {
		state.players = response;
	},
	SET_OTHER_PLAYERS(state, response) {
		state.otherPlayers = response;
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
	SET_REG_PLAYERS(state, response) { // Regular players
		state.regPlayers = response;
	},
	SET_ASS_REG_PLAYERS(state, response) { // Associated regular players
		state.assRegPlayers = response;
	},
	SET_BANNER_REG_PLAYERS(state, response) { // Regular players
		state.bannerRegPlayers = response;
	},
	SET_PLAYER_INFO(state, response) { // player info
		state.playerInfo[response.type] = response.data;
	},
};

// Getters
const getters = {
	getPlayers: state => {
		return state.players;
	},
	getOtherPlayers: state => {
		return state.otherPlayers;
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
	getRegPlayers: state => { // Regular players
		return state.regPlayers;
	},
	getAssRegPlayers: state => { // Associated register players
		return state.assRegPlayers;
	},
	getBannerRegPlayers: state => { // Regular players
		return state.bannerRegPlayers;
	},
	getRegularPlayers: state => {
		return state.regularPlayers;
	},
	getPlayerInfo: state => {
		return state.playerInfo;
	},
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
