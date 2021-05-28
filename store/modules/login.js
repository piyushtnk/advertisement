// State
const state = () => ({
	user: {}
});

// Actions
const actions = {
	async login({ commit, dispatch }, userData) {
		try {
			return await this.$axios
				.post(`/user/login`, userData)
				.then(response => {
					let responseData = response.data.data;
					responseData.token = response.headers.token;
					commit("SET_LOGIN", responseData);
					dispatch('setToast', { message: 'Logged in successful.', color: 'primary' }, { root: true })

					// Local storing
					this.$cookie.set('token', responseData.token)
					this.$cookie.set('user', responseData)
					return true;
				})
				.catch(error => {
					dispatch('setToast', { message: error.response ? error.response.data.error : error, color: 'red' }, { root: true })
					return false;
				});
		} catch (error) {
			dispatch('setToast', { message: error, color: 'red' }, { root: true })

		}

	},

	async logout({ dispatch }) {
		try {
			this.$cookie.removeAll();
			dispatch('setToast', { message: 'Logged out successfully.', color: 'primary' }, { root: true })
			return true;

		} catch (error) {
			dispatch('setToast', { message: error, color: 'red' }, { root: true })
		}
	}
};

// Mutations
const mutations = {
	SET_LOGIN(state, response) {
		state.user = response;
	},
};

// Getters
const getters = {
	isLoggedIn: state => {
		return state.user;
	}
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
