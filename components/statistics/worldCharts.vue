<template>
	<v-card class="mx-auto" outlined>
		<v-card-text>
			<HighChartMap
				:data="chartHeatMap"
				:title="$t('worldMap')"
				:subtitle="$t('worldMapSubtitle')"
				:tooltip="$t('viewers')"
			/>
		</v-card-text>
	</v-card>
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
		},
	};
</script>

<style scoped>
</style>