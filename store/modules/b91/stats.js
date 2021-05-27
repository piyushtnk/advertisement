// State
const state = () => ({
	graph: [
		{
			id: "LA",
			value: 0
		}
	],
	winLoss: 0,
	statsInfoCounter: {},
	statisticsCashOverall: {
		topup: {},
		withdrawal: {},
		profit: {},
		percentage: {}
	},
	bonusHunters: [],
	validBet: 0,
});

// Actions
const actions = {
	// Get win loss
	async getWinLoss({ commit }, data) {
		await this.$axios
			.get("/stats/winloss", {
				params: data
			})
			.then(response => {
				commit("SET_WIN_LOSS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// get graph
	async getGraph({ commit }, data) {
		await this.$axios
			.get("/stats/heatmap/" + data.endpoint, {
				params: data
			})
			.then(response => {
				commit("SET_GRAPH", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},


	// Get all stats - 1 
	async getStatisticsCounter({ commit }, data) {
		await this.$axios
			.get("/stats/players/overall", {
				params: data
			})
			.then(response => {
				commit("SET_STATISTICS_COUNTER", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// Get all stats - 2
	async getStatisticsTopUpOverall({ commit }, data) {
		await this.$axios
			.get("/stats/topup/overall", {
				params: data
			})
			.then(response => {
				commit("SET_STATISTICS_TOP_UP_OVERALL", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// bonus hunters
	async bonusHunters({ commit }, data) {
		await this.$axios
			.get("/bonushunters", {
				params: data
			})
			.then(response => {
				commit("SET_BONUS_HUNTERS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// Valid bet
	async validBet({ commit }, data) {
		try {
			await this.$axios
				.get("/stats/validbet", {
					params: data
				})
				.then(response => {
					commit("SET_VALID_BET", response.data.data.totalValidBetAmount);
				})
				.catch(error => {
					throw error.response ? error.response.data.error : error;
				});
		} catch (error) {
			console.warn('store', error);
		}
	}
};

// Mutations
const mutations = {
	SET_STATISTICS_COUNTER: (state, response) => {
		state.statsInfoCounter = response;
	},
	SET_STATISTICS_TOP_UP_OVERALL: (state, response) => {
		state.statisticsCashOverall = response;
	},
	SET_GRAPH: (state, response) => {
		state.graph = response;
	},
	SET_WIN_LOSS: (state, response) => {
		state.winLoss = response.winloss;
	},
	SET_BONUS_HUNTERS: (state, response) => {
		state.bonusHunters = response;
	},
	SET_VALID_BET: (state, response) => {
		state.validBet = response;
	},
};

// Getters
const getters = {
	getStatisticsCounter: state => {
		return state.statsInfoCounter;
	},
	getStatisticsTopUpOverall: state => {
		return state.statisticsCashOverall;
	},
	getGraph: state => {
		return state.graph;
	},
	getWinLoss: state => {
		return state.winLoss;
	},
	getBonusHunters: state => {
		return state.bonusHunters;
	},
	getValidBet: state => {
		return state.validBet;
	}
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};