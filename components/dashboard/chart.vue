<template>
	<v-card class="mx-auto">
		<!-- Chart Div -->
		<v-card-text>
			<HighChart
				:type="0"
				:data="dashboardGraphData"
				:title="$t('dashboardText.recentInteractionUserGraph')"
				:subtitle="`${$t('deposit')} ${$t('ofEachDay')}`"
				:xTitle="$t('dates')"
				:yTitle="`${$t('clicks')} /
						${$t('views')}`"
				:tooltip="$t('views')"
			/>
		</v-card-text>
	</v-card>
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
		},
	};
</script>