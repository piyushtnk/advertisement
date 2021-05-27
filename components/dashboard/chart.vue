<template>
	<div>
		<v-row no-gutters>
			<v-col cols="12" sm="12">
				<v-card class="mx-auto" outlined>
					<!-- Chart Div -->
					<v-card-text>
						<highchart
							:options="chartOptions"
							:update="['options.series']"
						/>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "ChartComponent",
		data: () => ({}),
		computed: {
			...mapGetters({
				dashboardGraphData: "getDashboardGraph",
			}),
			chartOptions() {
				const ctx = this;
				return {
					credits: false, // highchart.com
					chart: {
						backgroundColor: "#ffffff",
						className: "my-chart",
						type: this.$highcharts.chartTypes[0].toLowerCase(),
					},
					plotOptions: {
						series: {
							cursor: "pointer",
							point: {
								events: {
									click() {
										ctx.$emit("pointClicked", this);
									},
								},
							},
						},
					},
					xAxis: [
						{
							type: "category",
							labels: {
								format: "{value}",
							},
						},
					],
					yAxis: [
						{
							title: {
								text: "Clicks/Views",
								style: {
									color: "#000000",
								},
							},
						},
					],
					title: {
						style: {
							color: "#black",
						},
						text: this.$t("dashboardText.recentInteractionUserGraph"),
					},
					subtitle: {
						style: {
							color: "#black",
						},
						text: this.$t("dashboardText.recentVisitorThroughBanner"),
					},
					legend: {
						itemStyle: {
							color: "#black",
						},
					},
					series: [
						{
							name: "Viewers",
							data: this.dashboardGraphData,
						},
					],
				};
			},
		},
		watch: {
			dashboardGraphData(value) {
				let array = [];
				value.graph.forEach((element, index) => {
					array.push(
						(value.graph[index] = [element.date, element.value])
					);
				});
				this.chartOptions.series[0].data = array;
			},
		},
	};
</script>