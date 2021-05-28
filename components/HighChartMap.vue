<template>
	<highmap :options="chartOptions" :redraw="true" />
</template>

<script>
	export default {
		props: {
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
				default: "Sub Title",
			},
			tooltip: {
				type: String,
				default: "Tooltip",
			},
		},
		computed: {
			chartOptions() {
				return {
					credits: false, // highchart.com
					chart: {
						map: "myMapName",
						height: "800vh",
						mapZoom: 1,
						events: {
							load() {
								this.showLoading();
							},
							render() {
								this.hideLoading();
							},
						},
					},
					title: {
						text: this.title,
					},
					subtitle: {
						text: this.subtitle,
					},
					mapNavigation: {
						enabled: true,
						buttonOptions: {
							alignTo: "spacingBox",
						},
					},
					colorAxis: {
						min: 0,
					},
					series: [
						{
							name: this.tooltip,
							states: {
								hover: {
									color: "#BADA55",
								},
							},
							dataLabels: {
								enabled: true,
								format: "{point.name}",
							},
							allAreas: false,
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