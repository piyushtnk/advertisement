<template>
	<div>
		<v-row>
			<v-col cols="12">
				<v-card class="mx-auto" outlined color="#FDFDFD">
					<v-list-item three-line>
						<v-list-item-content>
							<div class="overline mb-4 text-dark">
								WORLD CHART
							</div>
							<div id="chartdiv"></div>
						</v-list-item-content>
					</v-list-item>
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
			return {
				heatLegend: {},
				polygonSeries: {},
				chart: {},
			};
		},
		mounted() {
			let {
				am4core,
				am4themes_animated,
				am4maps,
				am4geodata_worldLow,
			} = this.$am4core();
			am4core.useTheme(am4themes_animated);

			let $this = this;
			$this.chart = am4core.create("chartdiv", am4maps.MapChart);
			$this.chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

			$this.chart.geodata = am4geodata_worldLow;
			$this.chart.projection = new am4maps.projections.Miller();

			var title = $this.chart.chartContainer.createChild(am4core.Label);
			title.text = "Visitors all over the world";
			title.fontSize = 20;
			title.paddingTop = 30;
			title.align = "center";
			title.zIndex = 100;
			title.fill = "#212121";

			$this.polygonSeries = $this.chart.series.push(
				new am4maps.MapPolygonSeries()
			);
			var polygonTemplate = $this.polygonSeries.mapPolygons.template;
			polygonTemplate.tooltipText =
				"{name}: {value.value.formatNumber('#.0')}";
			$this.polygonSeries.heatRules.push({
				property: "fill",
				target: $this.polygonSeries.mapPolygons.template,
				min: am4core.color("#ffffff"),
				max: am4core.color("#448AFF"),
			});
			$this.polygonSeries.useGeodata = true;

			// add heat legend
			$this.heatLegend = $this.chart.chartContainer.createChild(
				am4maps.HeatLegend
			);
			$this.heatLegend.valign = "bottom";
			$this.heatLegend.align = "left";
			$this.heatLegend.width = am4core.percent(100);
			$this.heatLegend.series = $this.polygonSeries;
			$this.heatLegend.orientation = "horizontal";
			$this.heatLegend.padding(20, 20, 20, 20);
			$this.heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
			$this.heatLegend.valueAxis.renderer.minGridDistance = 40;

			$this.polygonSeries.mapPolygons.template.events.on("over", (event) => {
				handleHover(event.target);
			});

			$this.polygonSeries.mapPolygons.template.events.on("hit", (event) => {
				handleHover(event.target);
			});

			function handleHover(mapPolygon) {
				if (!isNaN(mapPolygon.dataItem.value)) {
					$this.heatLegend.valueAxis.showTooltipAt(
						mapPolygon.dataItem.value
					);
				} else {
					$this.heatLegend.valueAxis.hideTooltip();
				}
			}

			$this.polygonSeries.mapPolygons.template.strokeOpacity = 0.4;
			$this.polygonSeries.mapPolygons.template.events.on("out", (event) => {
				$this.heatLegend.valueAxis.hideTooltip();
			});

			$this.chart.zoomControl = new am4maps.ZoomControl();
			$this.chart.zoomControl.valign = "top";

			// World statistics data from api.
			$this.polygonSeries.data = $this.statistics.graph;

			// excludes Antarctica
			$this.polygonSeries.exclude = ["AQ"];
		},
		computed: {
			...mapGetters({
				statistics: "getStatistics",
			}),
		},
		watch: {
			statistics(value) {
				this.polygonSeries.data = value.graph;
			},
		},
		beforeDestroy() {
			if (this.chart) {
				this.chart.dispose();
			}
		},
	};
</script>

<style scoped>
	body {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
			Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
			"Segoe UI Symbol";
	}
	#chartdiv {
		width: 100%;
		height: 50vh;
	}
</style>