<template>
	<div>
		<v-alert type="info">
			Be Patient, It'll take some time, Live data are being computed and
			will be displayed soon.
		</v-alert>

		<v-icon>fas fa-circle-notch fa-spin</v-icon>

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
			const $this = this;
			$this.getStatistics();
			/* setInterval(function () {
					$this.getStatistics();
				}, 10000); */
		},
	};
</script>
