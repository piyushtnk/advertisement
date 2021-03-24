<template>
	<div>
		<v-row no-gutters class="my-5">
			<v-col cols="12" sm="12">
				<v-card class="mx-auto" outlined>
					<!-- Chart Details -->
					<v-card-title>
						{{ $t("withdrawalChart") }}
					</v-card-title>

					<v-card-text>
						<!-- Chart Div -->
						<div ref="chartWithdrawalDiv"></div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "ChartWithdrawalComponent",
		data: () => ({
			chart: {},
		}),
		computed: {
			...mapGetters({
				chartWithdrawal: "getChartWithdrawal",
			}),
			chartCore() {
				return this.$am4core();
			},
		},
		created() {
			this.chartCore.am4core.useTheme(this.chartCore.am4themes_dataviz);
			this.chartCore.am4core.useTheme(this.chartCore.am4themes_animated);
		},
		mounted() {
			this.createChart();
		},
		methods: {
			createChart() {
				this.chart = this.chartCore.am4core.create(
					this.$refs.chartWithdrawalDiv,
					this.chartCore.am4charts.XYChart
				);

				if (this._i18n.localeProperties.code == "en") {
					this.chart.locale = this.chartCore.am4lang_en;
					this.chart.numberFormatter.language.locale = this.chartCore.am4lang_en;
				} else {
					this.chart.locale = this.chartCore.am4lang_zh;
					this.chart.numberFormatter.language.locale = this.chartCore.am4lang_zh;
				}

				this.chart.background.fill = "#ffffff";

				// Create axes
				let dateAxis = this.chart.xAxes.push(
					new this.chartCore.am4charts.DateAxis()
				);
				dateAxis.renderer.minGridDistance = 60;

				let valueAxis = this.chart.yAxes.push(
					new this.chartCore.am4charts.ValueAxis()
				);
				valueAxis.renderer.minGridDistance = 60;

				// Create series
				let series = this.chart.series.push(
					new this.chartCore.am4charts.LineSeries()
				);
				series.dataFields.valueY = "value";
				series.dataFields.dateX = "date";
				series.tooltipText = "{value}";

				series.tooltip.pointerOrientation = "vertical";

				this.chart.cursor = new this.chartCore.am4charts.XYCursor();
				this.chart.cursor.snapToSeries = series;
				this.chart.cursor.xAxis = dateAxis;

				//this.chart.scrollbarY = new am4core.Scrollbar();
				this.chart.scrollbarX = new this.chartCore.am4core.Scrollbar();
			},
		},
		beforeDestroy() {
			if (this.chart) {
				this.chart.dispose();
			}
		},
		watch: {
			chartWithdrawal(value) {
				this.chart.data = value.graph;
			},
		},
	};
</script>

<style scoped>
	.hello {
		width: 100%;
		height: 500px;
	}
</style>