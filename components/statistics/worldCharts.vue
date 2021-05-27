<template>
	<div>
		<!-- Chart World -->
		<v-row>
			<v-col cols="12">
				<v-card class="mx-auto" outlined>
					<v-card-text>
						<highmap
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
		name: "ChartsComponent",
		data() {
			return {};
		},
		mounted() {},
		computed: {
			...mapGetters({
				chartHeatMap: "getWorldChart",
			}),
			chartOptions() {
				return {
					credits: false, // highchart.com
					chart: {
						map: "myMapName",
						height: "800vh",
						mapZoom: 1,
					},
					title: {
						text: this.$t("worldMap"),
					},
					subtitle: {
						text: this.$t("worldMapSubtitle"),
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
							name: "Viewers",
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
							data: this.$store.getters.getWorldChart,
						},
					],
				};
			},
		},
	};
</script>

<style scoped>
</style>