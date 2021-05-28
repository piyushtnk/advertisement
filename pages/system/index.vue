<template>
	<div>
		<v-row>
			<v-col>
				<!-- Chart -->
				<ChartComponent />
			</v-col>
		</v-row>

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
		name: "Dashboard",
		middleware: "authenticate",
		mixins: [VariablesMixin],
		components: {
			CountersComponent: CountersComponent,
			ChartComponent: ChartComponent,
		},
		data: () => ({}),
		methods: {
			...mapActions(["dashboardGraph"]),
			filterForCounter(value) {
				this.$store.dispatch("getStatisticsBannerClicksOverall", {
					startDate: value.startDate ? value.startDate : null,
					endDate: value.endDate ? value.endDate : null,
				});
				this.$store.dispatch("dashboardAllBannerCount", {
					startDate: value.startDate ? value.startDate : null,
					endDate: value.endDate ? value.endDate : null,
				});
				this.$store.dispatch("dashboardAllAdminCount", {
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
