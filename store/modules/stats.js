// State
const state = () => ({
	graph: [
		{
			id: "LA",
			value: 0
		}
	],
	statsInfo: {},
	statsInfoTwo: {
		overallTopupCount: 0,
		overallTopupCountFromBanners: 0,
		overallTotalTopupValue: 0,
		overallTotalTopupValueFromBanners: 0
	},
	osAndBrowser: []
});

// Actions
const actions = {
	async getGraph({ commit }, data) {
		await this.$axios
			.get("/stats/heatmap", {
				params: data
			})
			.then(response => {
				commit("SET_GRAPH", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},


	// Get all stats - 1 
	async getStatistics({ commit }, data) {
		await this.$axios
			.get("/stats/banners/1", {
				params: data
			})
			.then(response => {
				commit("SET_STATISTICS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// Get all stats - 2
	async getStatistics2({ commit }, data) {
		await this.$axios
			.get("/stats/banners/2", {
				params: data
			})
			.then(response => {
				commit("SET_STATISTICS_2", response.data.data);
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
	SET_STATISTICS: (state, response) => {
		state.statsInfo = response;
		state.osAndBrowser =
		{
			browser: response.browserType,
			os: response.osType
		};
	},
	SET_STATISTICS_2: (state, response) => {
		state.statsInfoTwo = response;
	},
	SET_GRAPH: (state, response) => {
		state.graph = response;
	},
};

// Getters
const getters = {
	getStatistics: state => {
		return state.statsInfo;
	},
	getStatistics2: state => {
		return state.statsInfoTwo;
	},
	getStatisticsOfOsAndBrowser: state => {
		return state.osAndBrowser;
	},
	getGraph: state => {
		return state.graph;
	}
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
