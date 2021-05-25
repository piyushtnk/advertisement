<template>
	<div>
		<!-- Chart -->
		<ChartComponent />

		<!-- Counters area -->
		<CountersComponent @childFilterForDate="filterForCounter" />
	</div>
</template>

<script>
	import { mapActions } from "vuex";

	import CountersComponent from "~/components/dashboard/counters";
	import ChartComponent from "~/components/dashboard/chart";
	import VariablesMixin from "~/mixins/variables";

	export default {
		name: "Index",
		middleware: "authenticate",
		mixins: [VariablesMixin],
		components: {
			CountersComponent: CountersComponent,
			ChartComponent: ChartComponent,
		},
		data: () => ({}),
		methods: {
			...mapActions({ dashboardGraph: "system/dashboard/dashboardGraph" }),
			filterForCounter(value) {
				this.$store.dispatch(
					"system/banner/getStatisticsBannerClicksOverall",
					{
						startDate: value.startDate ? value.startDate : null,
						endDate: value.endDate ? value.endDate : null,
					}
				);
				this.$store.dispatch("system/dashboard/dashboardAllBannerCount", {
					startDate: value.startDate ? value.startDate : null,
					endDate: value.endDate ? value.endDate : null,
				});
				this.$store.dispatch("system/dashboard/dashboardAllAdminCount", {
					startDate: value.startDate ? value.startDate : null,
					endDate: value.endDate ? value.endDate : null,
				});
			},
		},
		mounted() {
			this.dashboardGraph();
		},
	};
</script>
