// State
const state = () => ({
	clients: [],
	ipClients: [],
});

// Actions
const actions = {
	// Fetching clients only.
	async getClients({ commit, dispatch }, data) {
		await this.$axios
			.get("/clients", {
				params: data
			})
			.then(response => {
				commit("SET_CLIENTS", response.data.data);
			})
			.catch(error => {
				dispatch('setToast', { message: error, color: 'red' }, { root: true })

				throw error.response ? error.response.data.error : error;
			});
	},

	// Fetching IP Clients
	async getIpClients({ commit, dispatch }, data) {
		await this.$axios
			.get("/ip/views", {
				params: data
			})
			.then(response => {
				commit("SET_IP_CLIENTS", response.data.data);
			})
			.catch(error => {
				dispatch('setToast', { message: error, color: 'red' }, { root: true })

				throw error.response ? error.response.data.error : error;
			});
	},
};

// Mutations
const mutations = {
	SET_CLIENTS(state, response) {
		state.clients = response;
	},
	SET_IP_CLIENTS(state, response) {
		state.ipClients = response;
	},
};

// Getters
const getters = {
	getClients: state => {
		return state.clients;
	},
	getIpClients: state => {
		return state.ipClients;
	},
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
