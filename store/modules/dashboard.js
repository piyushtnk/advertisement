// State
const state = () => ({
	dashboardGraph: [0, 1],
	dashboardAllBannerCount: 0,
	updateIntervalTime: '',
	dashboardAllAdminCount: 0
});

// Actions
const actions = {

	// Get dashboard graph
	async dashboardGraph({ commit, dispatch }) {
		await this.$axios
			.get("/stats/clicks/lastweek")
			.then(response => {
				commit("SET_DASHBOARD_GRAPH", response.data.data);
			})
			.catch(error => {
				dispatch('setToast', { message: error, color: 'red' }, { root: true })


				throw error.response ? error.response.data.error : error;
			});
	},

	// Get dashboard graph
	async dashboardAllBannerCount({ commit, dispatch }, data) {
		await this.$axios
			.get("/stats/banners/count", {
				params: data
			})
			.then(response => {
				commit("SET_DASHBOARD_ALL_BANNER_COUNT", response.data.data);
			})
			.catch(error => {
				dispatch('setToast', { message: error, color: 'red' }, { root: true })


				throw error.response ? error.response.data.error : error;
			});
	},

	// Statistics page interval time.
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
	},

	// Statistics admin count
	async dashboardAllAdminCount({ commit, dispatch }, data) {
		await this.$axios
			.get("/admins/count/all", {
				params: data
			})
			.then(response => {
				commit("SET_DASHBOARD_ALL_ADMIN_COUNT", response.data.data);
			})
			.catch(error => {
				dispatch('setToast', { message: error, color: 'red' }, { root: true })


				throw error.response ? error.response.data.error : error;
			});
	},

};

// Mutations
const mutations = {
	SET_DASHBOARD_GRAPH(state, response) {
		response.graph.reverse()
		let array = [];
		response.graph.map(element => {
			array.push([element.date, element.value])
		})
		state.dashboardGraph = array;
	},
	SET_DASHBOARD_ALL_BANNER_COUNT(state, response) {
		state.dashboardAllBannerCount = response;
	},
	SET_DASHBOARD_ALL_ADMIN_COUNT(state, response) {
		state.dashboardAllAdminCount = response;
	},
	SET_INTERVAL_TIME(state, response) {
		state.updateIntervalTime = response;
	},
};

// Getters
const getters = {
	getDashboardGraph: state => {
		return state.dashboardGraph;
	},
	getDashboardAllBannerCount: state => {
		return state.dashboardAllBannerCount;
	},
	getDashboardAllAdminCount: state => {
		return state.dashboardAllAdminCount;
	},
	getUpdateIntervalTime: state => {
		return state.updateIntervalTime;
	},
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
