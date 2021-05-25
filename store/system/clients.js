// State
export const state = () => ({
	clients: [],
	ipClients: [],
});

// Actions
export const actions = {
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
				throw error.response ? error.response.data.error : error;
			});
	},

	// Fetching IP Clients
	async getIpClients({ commit }, data) {
		await this.$axios
			.get("/ip/views", {
				params: data
			})
			.then(response => {
				commit("SET_IP_CLIENTS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},
};

// Mutations
export const mutations = {
	SET_CLIENTS(state, response) {
		state.clients = response;
	},
	SET_IP_CLIENTS(state, response) {
		state.ipClients = response;
	},
};

// Getters
export const getters = {
	getClients: state => {
		return state.clients;
	},
	getIpClients: state => {
		return state.ipClients;
	},
};
