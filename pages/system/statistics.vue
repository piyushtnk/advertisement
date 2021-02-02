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
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import ChartsComponent from "~/components/statistics/charts";
	import CounterComponent from "~/components/statistics/counter";

	export default {
		middleware: "authenticate",
		data() {
			return {};
		},
		components: {
			ChartsComponent: ChartsComponent,
			CounterComponent: CounterComponent,
		},
		methods: {
			...mapActions({ getStatistics: "getStatistics" }),
			filterValueForStatistics(value) {
				this.$store.dispatch("getStatistics", {
					duration: value.duration,
					startDate: value.startDate,
					endDate: value.endDate,
				});
			},
		},
		mounted() {
			// this.getStatistics();
		},
	};
</script>
