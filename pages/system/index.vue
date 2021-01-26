<template>
	<div>
		<!-- Chart -->
		<ChartComponent />

		<!-- Counters area -->
		<CountersComponent @childFilterForCounter="filterForCounter" />
	</div>
</template>

<script>
	import { mapActions } from "vuex";

	import CountersComponent from "~/components/index/counters";
	import ChartComponent from "~/components/index/chart";

	export default {
		middleware: "authenticate",
		components: {
			CountersComponent: CountersComponent,
			ChartComponent: ChartComponent,
		},
		data: () => ({}),
		methods: {
			...mapActions({ getDashboard: "getDashboard", getStats: "getStats" }),
			filterForCounter(value) {
				this.$store.dispatch("getStats", {
					filterForCounter: value.counter,
					startDate: value.startDate,
					endDate: value.endDate,
				});
			},
		},
		mounted() {
			this.getDashboard();
			// this.getStats({ filterForCounter: 1, startDate: null, endDate: null });
		},
	};
</script>