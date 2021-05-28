<template>
	<div>
		<!-- Chart World -->
		<v-row>
			<v-col cols="12">
				<v-card class="mx-auto" outlined>
					<v-select
						v-model="chartFilterValueChildren"
						:items="chartFilter"
						item-value="value"
						item-text="text"
						class="ma-3"
						:label="$t('chartFilter')"
					/>
					<v-card-text>
						<HighChartMap
							:data="getB91WorldChart"
							:title="$t('worldMap')"
							:subtitle="$t('worldMapSubtitle')"
							:tooltip="$t('viewers')"
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
			return {
				chartFilterValueChildren: this.chartFilterValue,
			};
		},
		props: {
			chartFilter: {
				type: Array,
			},
			chartFilterValue: {
				type: String,
			},
		},
		computed: {
			...mapGetters(["getB91WorldChart"]),
		},
		watch: {
			chartFilterValueChildren(value) {
				this.$emit("childFilterForCounter", value);
			},
		},
	};
</script>

<style scoped>
</style>