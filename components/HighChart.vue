<template>
	<highchart :options="chartOptions" :redraw="true" />
</template>

<script>
	export default {
		props: {
			type: {
				type: Number,
				default: 0,
			},
			data: {
				type: Array,
				default: [],
			},
			title: {
				type: String,
				default: "Title",
			},
			subtitle: {
				type: String,
				default: "Subtitle",
			},
			xTitle: {
				type: String,
				default: "X Axis",
			},
			yTitle: {
				type: String,
				default: "Y Axis",
			},
			tooltip: {
				type: String,
				default: "Tooltip title",
			},
		},
		computed: {
			chartOptions() {
				const ctx = this;
				return {
					credits: false, // highchart.com
					chart: {
						backgroundColor: "#ffffff",
						className: "my-chart",
						type: this.$highcharts.chartTypes[this.type].toLowerCase(),
						events: {
							load() {
								this.showLoading();
							},
							render() {
								this.hideLoading();
							},
						},
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
							title: {
								text: this.xTitle,
								style: {
									color: "#000000",
								},
							},
							type: "category",
							labels: {
								format: "{value}",
							},
						},
					],
					yAxis: [
						{
							title: {
								text: this.yTitle,
								style: {
									color: "#000000",
								},
							},
							type: "category",
							labels: {
								format: "{value}",
							},
						},
					],
					title: {
						text: this.title,
					},
					subtitle: {
						text: this.subtitle,
					},
					series: [
						{
							name: this.tooltip,
							data: this.data,
						},
					],
				};
			},
		},
	};
</script>

<style>
</style>