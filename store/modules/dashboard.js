// State
const state = () => ({
	dashboard: {
		graph: [0, 1],
		admins: 0,
		liveAdmins: 0,
		banners: 0,
	},
	stats: {
		banners: 0,
		visitors: 0,
		uniqueVisitors: 0,
		registeredVisitors: 0
	}
});

// Actions
const actions = {
	async getDashboard({ commit }) {
		await this.$axios
			.get("/dashboard")
			.then(response => {
				commit("SET_DASHBOARD", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, {
					root: true
				});
				commit("SET_SNACKBAR_VISIBLE", true, {
					root: true
				});
				throw error.response ? error.response.data.error : error;
			});
	},
	async getStats({ commit }, data) {
		await this.$axios
			.get("/stats", {
				params: {
					duration: data.filterForCounter ? data.filterForCounter : null,
					startDate: data.startDate ? data.startDate : null,
					endDate: data.endDate ? data.endDate : null
				}
			})
			.then(response => {
				commit("SET_STATS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, {
					root: true
				});
				commit("SET_SNACKBAR_VISIBLE", true, {
					root: true
				});
				throw error.response ? error.response.data.error : error;
			});
	}
};

// Mutations
const mutations = {
	SET_DASHBOARD(state, response) {
		state.dashboard = response;
	},
	SET_STATS(state, response) {
		state.stats = response;
	}
};

// Getters
const getters = {
	getDashboard: state => {
		return state.dashboard;
	},
	getStats: state => {
		return state.stats;
	}
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
