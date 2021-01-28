<template>
	<div>
		<!-- World map -->
		<ChartsComponent />

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
		},
		mounted() {
			this.getStatistics();
		},
	};
</script>
