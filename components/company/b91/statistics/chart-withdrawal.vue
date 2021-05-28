<template>
	<v-card class="mx-auto">
		<v-card-text>
			<!-- Chart Div -->
			<HighChart
				:type="4"
				:data="chartWithdrawal"
				:title="$t('withdrawalChart')"
				:subtitle="`${$t('withdrawal')} ${$t('ofEachDay')}`"
				:xTitle="$t('dates')"
				:yTitle="$t('withdrawals')"
				:tooltip="$t('withdrawal')"
			/>
		</v-card-text>
	</v-card>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "ChartWithdrawalComponent",
		data: () => ({}),
		computed: {
			...mapGetters({
				chartWithdrawal: "getChartWithdrawal",
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