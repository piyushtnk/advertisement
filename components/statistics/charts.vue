<template>
	<div>
		<v-row>
			<v-col cols="6">
				<v-dialog
					ref="dialog"
					v-model="modal"
					@input="(v) => v || whenDialogClosed()"
					:return-value.sync="date"
					persistent
					width="300px"
					overlay-opacity="0.8"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="dateRangeText"
							label="Specific date's data"
							prepend-icon="mdi-calendar"
							readonly
							v-bind="attrs"
							v-on="on"
						></v-text-field>
					</template>
					<v-date-picker v-model="date" scrollable range light>
						<v-spacer></v-spacer>
						<v-btn text color="primary" @click="modal = false">
							Cancel
						</v-btn>
						<v-btn
							text
							color="primary"
							@click="$refs.dialog.save(date)"
						>
							OK
						</v-btn>
					</v-date-picker>
				</v-dialog>
			</v-col>
			<v-col cols="6">
				<v-select
					v-model="defaultFilterDate"
					:items="filterDate"
					item-value="state"
					item-text="abbr"
					label="Filter Type"
				/>
			</v-col>
		</v-row>

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
				date: [],
				modal: false,
				defaultFilterDate: 1,
				filterDate: [
					{
						state: 7,
						abbr: "All Time",
					},
					{
						state: 1,
						abbr: "Today",
					},
					{
						state: 2,
						abbr: "Yesterday",
					},
					{
						state: 3,
						abbr: "This Week",
					},
					{
						state: 4,
						abbr: "Last Week",
					},
					{
						state: 5,
						abbr: "This Month",
					},
					{
						state: 6,
						abbr: "Last Month",
					},
				],
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
				min: am4core.color("#90caf9"),
				max: am4core.color("#f44336"),
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

			// Hitting parents.
			this.$emit("childFilterForCounter", {
				duration: this.defaultFilterDate,
				startDate: this.date[0],
				endDate: this.date[1],
			});
		},
		methods: {
			whenDialogClosed() {
				if (this.date.length == 2) {
					this.$emit("childFilterForCounter", {
						startDate: this.date[0],
						endDate: this.date[1],
					});
				}
			},
		},
		computed: {
			...mapGetters({
				statistics: "getStatistics",
			}),

			dateRangeText() {
				return this.date.join(" ~ ");
			},
		},
		watch: {
			statistics(value) {
				this.polygonSeries.data = value.graph;
			},
			defaultFilterDate(value) {
				this.$emit("childFilterForCounter", { duration: value });
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