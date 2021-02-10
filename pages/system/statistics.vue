<template>
	<div>
		<v-alert text type="info">
			Be Patient, It'll take some time, Live data are being computed and
			will be displayed soon.
		</v-alert>
		<v-alert text type="warning"
			>Finance data will update on every 30 minutes (eg. 10:00, 10:30,
			11:00...).
		</v-alert>

		<!-- World map -->
		<ChartsComponent
			@childFilterForCounter="filterValueForStatistics"
			:filterType="filterType"
		/>

		<!-- Counter Live -->
		<CounterComponent :filterType="filterType" />

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
			return {
				filterType: {
					defaultFilterDate: 1,
					filterDate: [
						{
							state: 7,
							abbr: "All (From - 26/01/2021)",
						},
						{
							state: 1,
							abbr: "Today",
						},
						{
							state: 2,
							abbr: "Yesterday",
						},
						{
							state: 3,
							abbr: "This Week",
						},
						{
							state: 4,
							abbr: "Last Week",
						},
						{
							state: 5,
							abbr: "This Month",
						},
						{
							state: 6,
							abbr: "Last Month",
						},
					],
				},
			};
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

				// top viewed banners
				this.$store.dispatch("getIpClients", {
					duration: value.duration,
					startDate: value.startDate,
					endDate: value.endDate,
					sort: "id|desc",
					limit: 1,
					page: 1,
					search: "",
				});
			},
		},
	};
</script>
