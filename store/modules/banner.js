// State
const state = () => ({
	banners: [],
	bannerDomains: []
});

// Actions
const actions = {
	// upload banner
	async uploadBanner({ commit }, data) {
		let formData = new FormData();
		formData.append("banner", data.image);
		formData.append("redirectUrl", data.url);
		formData.append("comment", data.comment);

		await this.$axios
			.post("/banner", formData, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			})
			.then(response => {
				commit("SET_SNACKBAR_TEXT", "Your banner successfully uploaded.", {
					root: true
				});
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				commit("UPDATE_BANNERS", response.data.data);
				return true;
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// Get all banners
	async getBanners({ commit }) {
		await this.$axios
			.get("/banners")
			.then(response => {
				commit("SET_BANNERS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// Add Domain name
	async addDomainName({ commit }, data) {
		await this.$axios
			.post("/domain", data)
			.then(response => {
				commit("SET_SNACKBAR_TEXT", "Your domain name registered successfully.", {
					root: true
				});
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				commit("UPDATE_BANNER_DOMAIN", response.data.data);
				return true;
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	async getBannerDomains({ commit }) {
		await this.$axios
			.get("/domains")
			.then(response => {
				commit("SET_BANNER_DOMAIN", response.data.data);
			})
			.catch(error => {
				throw error.response ? error.response.data.error : error;
			});
	},

	async deleteBannerDomain({ commit }, data) {
		await this.$axios
			.delete("/domain/" + data.id)
			.then(response => {
				commit("SET_SNACKBAR_TEXT", 'Banner domain deleted successfully', { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				return true;
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	async updateBanner({ commit }, data) {
		await this.$axios
			.put("/banner/" + data.uniqueId, {
				redirectUrl: data.redirectUrl,
				comment: data.comment
			})
			.then(response => {
				commit("UPDATE_BANNERS", response.data.data);
				commit("SET_SNACKBAR_TEXT", 'Banner updated successfully', { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				return true;
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	async deleteBanner({ commit }, data) {
		await this.$axios
			.delete("/banner/" + data.uniqueId)
			.then(response => {
				commit("SET_SNACKBAR_TEXT", 'Banner deleted successfully', { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				return true;
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},
};

// Mutations
const mutations = {
	SET_BANNERS(state, response) {
		state.banners = response;
	},
	UPDATE_BANNERS(state, response) {
		state.banners = [response, ...state.banners];
	},
	SET_BANNER_DOMAIN(state, response) {
		state.bannerDomains = response;
	},
	UPDATE_BANNER_DOMAIN(state, response) {
		state.bannerDomains = [response, ...state.bannerDomains];
	}
};

// Getters
const getters = {
	getBanners: state => {
		return state.banners;
	},
	getBannerDomains: state => {
		return state.bannerDomains;
	}
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
