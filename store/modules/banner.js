// State
const state = () => ({
	banners: [],
	bannersPerf: [],
	tempBanners: [],
	bannerDomains: [],
	topViewedBanners: [],
	last10MinuteBanners: [],
	statisticsBannerClicksOverall: {
		allClients: 0,
		uniqueClients: 0
	},
	osAndBrowser: [],
	topClickWiseBanners: [],
	clicksPC: 0,
	clicksMobile: 0,
	clicksBrowser: [],
	clicksOS: [],
	worldChart: [{
		id: "LA",
		value: 0
	}]

});

// Actions
const actions = {
	// upload banner
	async uploadBanner({ commit }, data) {
		let formData = new FormData();
		formData.append("banner", data.image);
		formData.append("redirectUrl", data.url);
		formData.append("comment", data.comment);
		formData.append("cost", data.cost);

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


				response.data.data.allClientsCount = 0;
				response.data.data.views = 0;
				commit("PUSH_BANNERS", response.data.data);
				return true;
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error.response.data.error, { root: true });

			});
	},

	// get graph of clicks
	async worldChart({ commit }, data) {
		await this.$axios
			.get("/stats/heatmap/clicks", {
				params: data
			})
			.then(response => {
				commit("SET_WORLD_CHART", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				throw error.response ? error.response.data.error : error;
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
		formData.append("cost", data.cost);

		await this.$axios
			.put("/banner/" + data.uniqueId, formData, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			})
			.then(response => {
				commit("SET_SNACKBAR_TEXT", 'Banner updated successfully', { root: true });

				commit("UPDATE_BANNERS", response.data.data);
				return true;
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });

				throw error.response ? error.response.data.error : error;
			});
	},

	// Delete banner
	async deleteBanner({ commit }, data) {
		await this.$axios
			.delete("/banner/" + data.uniqueId)
			.then(response => {
				commit("SET_SNACKBAR_TEXT", 'Banner deleted successfully', { root: true });

				return true;
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });

				throw error.response ? error.response.data.error : error;
			});
	},

	// Get all banners
	async getBanners({ commit }, data) {
		const $this = this;
		try {
			let bannerData = await $this.$axios
				.get("/banners", {
					params: data
				});
			const promise = bannerData.data.data.data.map(async (value) => {
				await $this.$axios.get("/ipview/banner/" + value.id).then((countResponse) => {
					value.views = countResponse.data.data.bannerViewsCount;
				});
			});
			await Promise.all(promise);
			commit("SET_BANNERS", bannerData.data.data);

		} catch (error) {
			console.log('error-', error);
		}
	},

	// Get all banners performance
	async getBannersPerf({ commit }, data) {
		const $this = this;
		try {
			let bannerData = await $this.$axios
				.get("/banners/performance", {
					params: data
				});
			const promise = bannerData.data.data.data.map(async (value) => {
				// For views count
				await $this.$axios.get("/ipview/banner/" + value.id).then((countResponse) => {
					value.views = countResponse.data.data.bannerViewsCount;
				});

				// For calculating direct registered players
				await $this.$axios.get("/players/banner/" + value.id, {
					params: {
						startDate: data.startDate,
						endDate: data.endDate,
						type: 'direct'
					}
				}).then((playerCountResponse) => {
					value.directRegisteredPlayersCount = playerCountResponse.data.data.allPlayersCount;
					value.firstDepositCountOfDirectPlayers = playerCountResponse.data.data.firstDepositCount;
				});

				// For calculating associated registered players
				await $this.$axios.get("/players/banner/" + value.id, {
					params: {
						startDate: data.startDate,
						endDate: data.endDate,
						type: 'associated'
					}
				}).then((playerCountResponse) => {
					value.associatedPlayersCount = playerCountResponse.data.data.playersCount;
					value.firstDepositCountOfAssociatedPlayers = playerCountResponse.data.data.firstDepositCount;
				});
			});
			await Promise.all(promise);
			commit("SET_BANNERS_PERF", bannerData.data.data);

		} catch (error) {
			console.log('error-', error);
		}
	},

	// Get Top 10 Viewed Banners
	async getTopViewedBanners({ commit }, data) {
		await this.$axios
			.get("/stats/topviewbanners", {
				params: data
			})
			.then(response => {
				commit("SET_TOP_ViEWED_BANNERS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });

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

				throw error.response ? error.response.data.error : error;
			});
	},

	// Add Domain name
	async addDomainName({ commit }, data) {
		await this.$axios
			.post("/domain/create", data)
			.then(response => {
				commit("SET_SNACKBAR_TEXT", "Your domain name registered successfully.", {
					root: true
				});

				commit("UPDATE_BANNER_DOMAIN", response.data.data);
				return true;
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });

				throw error.response ? error.response.data.error : error;
			});
	},

	async getBannerDomains({ commit }) {
		await this.$axios
			.get("/domains/all")
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

				return true;
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });

				throw error.response ? error.response.data.error : error;
			});
	},

	// Get all stats - 3
	async getStatisticsBannerClicksOverall({ commit }, data) {
		await this.$axios
			.get("/stats/bannerclick/overall", {
				params: data
			})
			.then(response => {
				commit("SET_STATISTICS_BANNER_CLICKS_OVERALL", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// clicks browser
	async clicksByBrowser({ commit }, data) {
		await this.$axios
			.get("/stats/clicks/browsertype", {
				params: data
			})
			.then(response => {
				commit("SET_BROWSER_CLICKS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// clicks os
	async clicksByOS({ commit }, data) {
		await this.$axios
			.get("/stats/clicks/ostype", {
				params: data
			})
			.then(response => {
				commit("SET_OS_CLICKS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// top clicks wise banner
	async topClickWiseBanners({ commit }, data) {
		await this.$axios
			.get("/stats/topbanners", {
				params: data
			})
			.then(response => {
				commit("SET_TOP_CLICK_WISE_BANNERS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// clicks from pc
	async clicksCountFromPC({ commit }, data) {
		await this.$axios
			.get("/stats/clicks/pc", {
				params: data
			})
			.then(response => {
				commit("SET_PC_CLICKS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},

	// clicks from mobile
	async clicksCountFromMobile({ commit }, data) {
		await this.$axios
			.get("/stats/clicks/mobile", {
				params: data
			})
			.then(response => {
				commit("SET_MOBILE_CLICKS", response.data.data);
			})
			.catch(error => {
				commit("SET_SNACKBAR_TEXT", error, { root: true });
				throw error.response ? error.response.data.error : error;
			});
	},


};

// Mutations
const mutations = {
	SET_BANNERS(state, response) {
		state.banners = response;
	},
	SET_BANNERS_PERF(state, response) {
		state.bannersPerf = response;
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
	SET_PC_CLICKS: (state, response) => {
		state.clicksPC = response;
	},
	SET_MOBILE_CLICKS: (state, response) => {
		state.clicksMobile = response;
	},
	SET_STATISTICS_BANNER_CLICKS_OVERALL: (state, response) => {
		state.statisticsBannerClicksOverall = response;
	},
	SET_WORLD_CHART: (state, response) => {
		state.worldChart = response;
	},
	SET_BROWSER_CLICKS: (state, response) => {
		state.clicksBrowser = response.clicksCountByBrowserType;
	},
	SET_OS_CLICKS: (state, response) => {
		state.clicksOS = response.clicksCountByOsType;
	},
	SET_TOP_CLICK_WISE_BANNERS: (state, response) => {
		state.topClickWiseBanners = response;
	},
};

// Getters
const getters = {
	getBanners: state => {
		return state.banners;
	},
	getBannersPerf: state => {
		return state.bannersPerf;
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
	getStatisticsBannerClicksOverall: state => {
		return state.statisticsBannerClicksOverall;
	},
	getStatisticsOfOsAndBrowser: state => {
		return state.osAndBrowser;
	},
	getClicksByBrowser: state => {
		return state.clicksBrowser;
	},
	getClicksByOS: state => {
		return state.clicksOS;
	},
	getClicksCountFromPC: state => {
		return state.clicksPC;
	},
	getClicksCountFromMobile: state => {
		return state.clicksMobile;
	},
	getTopClickWiseBanners: state => {
		return state.topClickWiseBanners;
	},
	getWorldChart: state => {
		return state.worldChart;
	},
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
