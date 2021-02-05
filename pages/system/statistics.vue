<template>
	<div>
		<v-alert text type="info">
			Be Patient, It'll take some time, Live data are being computed and
			will be displayed soon.
		</v-alert>
		<v-icon>fas fa-circle-notch fa-spin</v-icon>

		<!-- World map -->
		<ChartsComponent @childFilterForCounter="filterValueForStatistics" />

		<!-- Counter Live -->
		<CounterComponent />

		<!-- Top 10 Banner -->
		<TopViewedBannersComponent />

		<!-- Last 10 Minute Banners List -->
		<Last10MinuteBannersComponent />
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import ChartsComponent from "~/components/statistics/charts";
	import CounterComponent from "~/components/statistics/counter";
	import TopViewedBannersComponent from "~/components/statistics/topViewedBanners";
	import Last10MinuteBannersComponent from "~/components/statistics/last10MinuteBanners";

	export default {
		middleware: "authenticate",
		data() {
			return {};
		},
		components: {
			ChartsComponent: ChartsComponent,
			CounterComponent: CounterComponent,
			TopViewedBannersComponent: TopViewedBannersComponent,
			Last10MinuteBannersComponent: Last10MinuteBannersComponent,
		},
		methods: {
			...mapActions({
				getStatistics: "getStatistics",
				getStatistics2: "getStatistics2",
				getTopViewedBanners: "getTopViewedBanners",
				getLast10MinuteBanners: "getLast10MinuteBanners",
			}),
			filterValueForStatistics(value) {
				this.$store.dispatch("getStatistics", {
					duration: value.duration,
					startDate: value.startDate,
					endDate: value.endDate,
				});

				this.$store.dispatch("getStatistics2", {
					duration: value.duration,
					startDate: value.startDate,
					endDate: value.endDate,
				});

				// top viewed banners
				this.$store.dispatch("getTopViewedBanners", {
					duration: value.duration,
					startDate: value.startDate,
					endDate: value.endDate,
				});

				// top viewed banners
				this.$store.dispatch("getLast10MinuteBanners");
			},
		},
	};
</script>
