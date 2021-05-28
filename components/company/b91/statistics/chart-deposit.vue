<template>
	<v-card class="mx-auto">
		<v-card-text>
			<!-- Chart Div -->
			<HighChart
				:type="4"
				:data="chartDeposit"
				:title="$t('depositChart')"
				:subtitle="`${$t('deposit')} ${$t('ofEachDay')}`"
				:xTitle="$t('dates')"
				:yTitle="$t('deposits')"
				:tooltip="$t('deposit')"
			/>
		</v-card-text>
	</v-card>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "ChartDepositComponent",
		data: () => ({
			chart: {},
		}),
		computed: {
			...mapGetters({
				chartDeposit: "getChartDeposit",
			}),
		},
	};
</script>

<style scoped>
	.hello {
		width: 100%;
		height: 500px;
	}
</style>