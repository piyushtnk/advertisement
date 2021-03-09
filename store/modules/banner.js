// State
const state = () => ({
	banners: [],
	tempBanners: [],
	bannerDomains: [],
	topViewedBanners: [],
	last10MinuteBanners: [],
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
				commit("PUSH_BANNERS", response.data.data);
				return true;
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error.response.data.error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
			});
	},

	// Update banner
	async updateBanner({ commit }, data) {
		let formData = new FormData();
		if (data.bannerImage) {
			formData.append("banner", data.bannerImage);
		}
		formData.append("redirectUrl", data.redirectUrl);
		formData.append("comment", data.comment);

		await this.$axios
			.put("/banner/" + data.uniqueId, formData, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			})
			.then(response => {
				commit("SET_SNACKBAR_TEXT", 'Banner updated successfully', { root: true });
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

	// Delete banner
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

	// Get all banners
	async getBanners({ commit, dispatch }, data) {
		const $this = this;
		await $this.$axios
			.get("/banners", {
				params: {
					duration: data.duration ? data.duration : null,
					startDate: data.startDate ? data.startDate : null,
					endDate: data.endDate ? data.endDate : null,
					sort: data.sort,
					limit: data.limit,
					page: data.page,
					search: data.search
				}
			})
			.then(response => {
				new Promise((resolve, reject) => {
					response.data.data.data.forEach((value, index, array) => {
						$this.$axios.get("/ipview/banner/" + value.id).then((countResponse) => {
							value.views = countResponse.data.data.bannerViewsCount;
							if (index === array.length - 1) {
								resolve();
							}
						});
					});
				}).then(() => {
					commit("SET_BANNERS", response.data.data);
				});
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// Get Top 10 Viewed Banners
	async getTopViewedBanners({ commit }, data) {
		await this.$axios
			.get("/topviewbanners", {
				params: {
					duration: data.duration ? data.duration : null,
					startDate: data.startDate ? data.startDate : null,
					endDate: data.endDate ? data.endDate : null,
				}
			})
			.then(response => {
				commit("SET_TOP_ViEWED_BANNERS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				commit("SET_SNACKBAR_VISIBLE", true, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// Last 10 Minutes Active Banners
	async getLast10MinuteBanners({ commit }, data) {
		await this.$axios
			.get("/activebanners")
			.then(response => {
				commit("SET_10_MINUTE_BANNERS", response.data);
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


};

// Mutations
const mutations = {
	SET_BANNERS(state, response) {
		state.banners = response;
	},
	PUSH_BANNERS(state, response) {
		state.banners.data.unshift(response);
	},
	UPDATE_BANNERS(state, response) {
		Object.assign(...state.banners.data, response)
	},
	SET_BANNER_DOMAIN(state, response) {
		state.bannerDomains = response;
	},
	SET_TOP_ViEWED_BANNERS(state, response) {
		state.topViewedBanners = response;
	},
	SET_10_MINUTE_BANNERS(state, response) {
		state.last10MinuteBanners = response;
	},
	UPDATE_BANNER_DOMAIN(state, response) {
		state.bannerDomains = [response, ...state.bannerDomains];
	},
};

// Getters
const getters = {
	getBanners: state => {
		return state.banners;
	},
	getTopViewedBanners: state => {
		return state.topViewedBanners;
	},
	getBannerDomains: state => {
		return state.bannerDomains;
	},
	getLast10MinuteBanners: state => {
		return state.last10MinuteBanners;
	},
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
