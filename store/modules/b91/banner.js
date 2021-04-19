// State
const state = () => ({
	bannersPerf: [],
});

// Actions
const actions = {

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

				// For calculating cost effectiveness.
				await $this.$axios.get("/banner/cost/effectiveness/" + value.id, {
					params: {
						startDate: data.startDate,
						endDate: data.endDate,
					}
				}).then((costEffectivenessResponse) => {
					value.costEffectivenessResponse = costEffectivenessResponse.data.data.bannerCostEffectiveness;
				});
			});
			await Promise.all(promise);
			commit("SET_BANNERS_PERF", bannerData.data.data);

		} catch (error) {
			console.log('error-', error);
		}
	},
};

// Mutations
const mutations = {
	SET_BANNERS_PERF(state, response) {
		state.bannersPerf = response;
	},
};

// Getters
const getters = {
	getBannersPerf: state => {
		return state.bannersPerf;
	},
};

// Default export
export default {
	state,
	mutations,
	actions,
	getters
};
