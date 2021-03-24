// State
const state = () => ({
	dashboard: {
		graph: [0, 1],
		admins: 0,
		liveAdmins: 0,
		banners: 0,
	},
	chartWithdrawal: [0, 1],
	chartDeposit: [0, 1],
	stats: {
		banners: 0,
		visitors: 0,
		uniqueVisitors: 0,
		registeredVisitors: 0
	},
	updateIntervalTime: ''
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
	async getChartWithdrawal({ commit }, data) {
		await this.$axios
			.get("/withdrawal/chart", {
				params: data
			})
			.then(response => {
				commit("SET_CHART_WITHDRAWAL", response.data.data);
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
	async getChartDeposit({ commit }, data) {
		await this.$axios
			.get("/deposits/chart", {
				params: data
			})
			.then(response => {
				commit("SET_CHART_DEPOSIT", response.data.data);
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
				params: data
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
	},
	getUpdateIntervalTime({ commit }) {
		let now = new Date();
		let minutes = now.getMinutes();
		let seconds = now.getSeconds();
		if (minutes > 30) {
			let data = (60 - minutes >= 10 ? 60 - minutes : '0' + 60 - minutes) + ":" + ((60 - seconds) >= 10 ? (60 - seconds) : '0' + (60 - seconds));
			commit('SET_INTERVAL_TIME', data);
		} else {
			let data = (30 - minutes >= 10 ? 30 - minutes : '0' + 30 - minutes) + ":" + ((60 - seconds) >= 10 ? (60 - seconds) : '0' + (60 - seconds));
			commit('SET_INTERVAL_TIME', data);
		}
	}

};

// Mutations
const mutations = {
	SET_DASHBOARD(state, response) {
		state.dashboard = response;
	},
	SET_STATS(state, response) {
		state.stats = response;
	},
	SET_INTERVAL_TIME(state, response) {
		state.updateIntervalTime = response;
	},
	SET_CHART_WITHDRAWAL(state, response) {
		state.chartWithdrawal = response;
	},
	SET_CHART_DEPOSIT(state, response) {
		state.chartDeposit = response;
	}
};

// Getters
const getters = {
	getDashboard: state => {
		return state.dashboard;
	},
	getStats: state => {
		return state.stats;
	},
	getUpdateIntervalTime: state => {
		return state.updateIntervalTime;
	},
	getChartWithdrawal: state => {
		return state.chartWithdrawal;
	},
	getChartDeposit: state => {
		return state.chartDeposit;
	}
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
