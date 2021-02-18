<template>
	<div>
		<v-alert text type="info">
			{{ $t("statsMessage") }}
		</v-alert>
		<v-alert text type="warning">
			<v-row>
				<v-col class="grow">
					{{ $t("statsMessage2") }}
				</v-col>
				<v-col class="shrink">
					<v-btn elevation="2" outlined
						>{{ $t("statsMessage3") }}
						{{ getUpdateIntervalTime }}</v-btn
					>
				</v-col>
			</v-row>
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
	import { mapActions, mapGetters } from "vuex";
	import ChartsComponent from "~/components/statistics/charts";
	import CounterComponent from "~/components/statistics/counter";
	import TopViewedBannersComponent from "~/components/statistics/topViewedBanners";
	import Last10MinuteBannersComponent from "~/components/statistics/last10MinuteBanners";

	export default {
		middleware: "authenticate",
		data() {
			return {};
		},
		mounted() {
			let $this = this;
			setInterval(function () {
				$this.$store.dispatch("getUpdateIntervalTime");
			}, 1000);
		},
		computed: {
			...mapGetters({
				getUpdateIntervalTime: "getUpdateIntervalTime",
			}),
			filterType() {
				return {
					defaultFilterDate: 1,
					filterDate: [
						{
							state: 7,
							abbr: this.$t("all") + " (From - 26/01/2021)",
						},
						{
							state: 1,
							abbr: this.$t("today"),
						},
						{
							state: 2,
							abbr: this.$t("yesterday"),
						},
						{
							state: 3,
							abbr: this.$t("thisWeek"),
						},
						{
							state: 4,
							abbr: this.$t("lastWeek"),
						},
						{
							state: 5,
							abbr: this.$t("thisMonth"),
						},
						{
							state: 6,
							abbr: this.$t("lastMonth"),
						},
					],
				};
			},
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
