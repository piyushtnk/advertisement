// State
const state = () => ({
	chartWithdrawal: [[0, 1]],
	chartDeposit: [[0, 1]],
});

// Actions
const actions = {
	async getChartWithdrawal({ commit, dispatch }, data) {
		await this.$axios
			.get("/withdrawal/chart", {
				params: data
			})
			.then(response => {
				commit("SET_CHART_WITHDRAWAL", response.data.data);
			})
			.catch(error => {
				dispatch('setToast', { message: error, color: 'red' }, { root: true })
				throw error.response ? error.response.data.error : error;
			});
	},
	async getChartDeposit({ commit, dispatch }, data) {
		await this.$axios
			.get("/deposits/chart", {
				params: data
			})
			.then(response => {
				commit("SET_CHART_DEPOSIT", response.data.data);
			})
			.catch(error => {
				dispatch('setToast', { message: error, color: 'red' }, { root: true })
				throw error.response ? error.response.data.error : error;
			});
	},
};

// Mutations
const mutations = {
	SET_CHART_WITHDRAWAL(state, response) {
		let array = [];
		response.graph.map(element => {
			array.push([element.date, element.value])
		})
		state.chartDeposit = array;
		state.chartWithdrawal = array;
	},
	SET_CHART_DEPOSIT(state, response) {
		let array = [];
		response.graph.map(element => {
			array.push([element.date, element.value])
		})
		state.chartDeposit = array;
	}
};

// Getters
const getters = {
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
