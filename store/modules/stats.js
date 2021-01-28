// State
const state = () => ({
	statsInfo: {
		graph: [
			{
				id: "LA",
				value: 0
			}
		]
	},
	osAndBrowser: []
});

// Actions
const actions = {
	// Get all stats
	async getStatistics({ commit }) {
		await this.$axios
			.get("/stats/banners", { params: { duration: 1 } })
			.then(response => {
				commit("SET_STATISTICS", response.data.data);
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
		state.osAndBrowser = [
			{
				name: "From Browser",
				data: response.browserType
			},
			{
				name: "From OS",
				data: response.osType
			}
		];
	}
};

// Getters
const getters = {
	getStatistics: state => {
		return state.statsInfo;
	},
	getStatisticsOfOsAndBrowser: state => {
		return state.osAndBrowser;
	}
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
