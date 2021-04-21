<template>
	<div>
		<!-- Chart World -->
		<v-row>
			<v-col cols="12">
				<v-card
					class="mx-auto"
					:loading="loading"
					:loader-height="7"
					shaped
					outlined
				>
					<v-select
						v-model="chartFilterValueChildren"
						:items="chartFilter"
						item-value="value"
						item-text="text"
						class="ma-3"
						:label="$t('chartFilter')"
					/>
					<v-card-text style="background-color: #fdfdfd">
						<v-list-item three-line>
							<v-list-item-content>
								<div class="overline mb-4 text-dark"></div>
								<div id="chartdiv"></div>
							</v-list-item-content>
						</v-list-item>
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
			return {
				heatLegend: {},
				polygonSeries: {},
				chart: {},
				loading: true,
				chartFilterValueChildren: this.chartFilterValue,
			};
		},
		props: {
			date: {
				type: Array,
			},
			chartFilter: {
				type: Array,
			},
			chartFilterValue: {
				type: String,
			},
		},
		created() {
			this.chartCore.am4core.useTheme(this.chartCore.am4themes_animated);
		},
		mounted() {
			this.chart = this.chartCore.am4core.create(
				"chartdiv",
				this.chartCore.am4maps.MapChart
			);
			let $this = this;

			// Language selection
			if ($this._i18n.localeProperties.code == "en") {
				$this.chart.locale = $this.chartCore.am4lang_en;
				$this.chart.geodataNames = $this.chartCore.am4geodata_lang_en;
			} else {
				$this.chart.locale = $this.chartCore.am4lang_zh;
				$this.chart.geodataNames = $this.chartCore.am4geodata_lang_zh;
			}

			$this.chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

			$this.chart.geodata = this.chartCore.am4geodata_worldLow;
			$this.chart.projection = new this.chartCore.am4maps.projections.Miller();

			var title = $this.chart.chartContainer.createChild(
				this.chartCore.am4core.Label
			);
			title.text = this.$t("visitorAllOverWorld");
			title.fontSize = 20;
			title.paddingTop = 30;
			title.align = "center";
			title.zIndex = 100;
			title.fill = "#212121";

			$this.polygonSeries = $this.chart.series.push(
				new this.chartCore.am4maps.MapPolygonSeries()
			);
			var polygonTemplate = $this.polygonSeries.mapPolygons.template;
			polygonTemplate.tooltipText =
				"{name}: {value.value.formatNumber('#.0')}";
			$this.polygonSeries.heatRules.push({
				property: "fill",
				target: $this.polygonSeries.mapPolygons.template,
				min: this.chartCore.am4core.color("#90caf9"),
				max: this.chartCore.am4core.color("#f44336"),
			});

			this.chartHeat();

			$this.polygonSeries.useGeodata = true;

			$this.polygonSeries.mapPolygons.template.events.on("over", (event) => {
				this.handleHover(event.target);
			});

			$this.polygonSeries.mapPolygons.template.events.on("hit", (event) => {
				this.handleHover(event.target);
			});

			$this.polygonSeries.mapPolygons.template.strokeOpacity = 0.4;
			$this.polygonSeries.mapPolygons.template.events.on("out", (event) => {
				$this.heatLegend.valueAxis.hideTooltip();
			});

			$this.chart.zoomControl = new this.chartCore.am4maps.ZoomControl();
			$this.chart.zoomControl.valign = "top";

			// World chartHeatMap data from api.
			$this.polygonSeries.data = $this.chartHeatMap;

			// excludes Antarctica
			$this.polygonSeries.exclude = ["AQ"];
		},
		methods: {
			chartHeat() {
				this.heatLegend = this.chart.chartContainer.createChild(
					this.chartCore.am4maps.HeatLegend
				);
				this.heatLegend.valign = "bottom";
				this.heatLegend.align = "left";
				this.heatLegend.width = this.chartCore.am4core.percent(100);
				this.heatLegend.series = this.polygonSeries;
				this.heatLegend.orientation = "horizontal";
				this.heatLegend.padding(20, 20, 20, 20);
				this.heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
				this.heatLegend.valueAxis.renderer.minGridDistance = 40;
			},

			handleHover(mapPolygon) {
				if (!isNaN(mapPolygon.dataItem.value)) {
					this.heatLegend.valueAxis.showTooltipAt(
						mapPolygon.dataItem.value
					);
				} else {
					this.heatLegend.valueAxis.hideTooltip();
				}
			},
		},
		computed: {
			...mapGetters({
				chartHeatMap: "getGraph",
			}),

			chartCore() {
				return this.$am4core();
			},
		},
		watch: {
			chartHeatMap(value) {
				this.loading = false;
				this.polygonSeries.data = value;
			},
			chartFilterValueChildren(value) {
				this.loading = true;
				this.$emit("childFilterForCounter", value);
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
		background-color: "#FDFDFD";
	}
</style>