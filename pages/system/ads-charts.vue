<template>
	<div>
		<v-alert text type="info">
			{{ $t("statsMessage") }}
		</v-alert>

		<!-- Filter section -->
		<v-card class="my-5" outlined>
			<v-card-text>
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
									:label="$t('chooseSpecificDate')"
									prepend-icon="mdi-calendar"
									readonly
									v-bind="attrs"
									v-on="on"
								></v-text-field>
							</template>
							<v-date-picker
								v-model="date"
								scrollable
								range
								light
								:locale="$t('localeType')"
							>
								<v-spacer></v-spacer>
								<v-btn
									text
									color="primary"
									@click="modal = false"
								>
									{{ $t("cancel") }}
								</v-btn>
								<v-btn
									text
									color="primary"
									@click="$refs.dialog.save(date)"
								>
									{{ $t("ok") }}
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
							:label="$t('filterType')"
						/>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

		<!-- World map -->
		<ChartsComponent :date.sync="date" />
	</div>
</template>

<script>
	// chart import
	import ChartsComponent from "~/components/statistics/adsCharts";
	import VariablesMixin from "~/mixins/variables";

	export default {
		name: "charts",
		middleware: "authenticate",
		mixins: [VariablesMixin],
		data() {
			return {
				modal: false,
				chartFilterValue: "clicks",
				optionsParam: {},
			};
		},
		mounted() {
			this.filterValueForStatistics();
		},
		computed: {},
		components: {
			ChartsComponent: ChartsComponent,
		},
		methods: {
			whenDialogClosed() {
				if (this.date.length == 2) {
					this.showDateText();
					this.filterValueForStatistics();
				}
			},

			filterValueForStatistics() {
				// Statistics part 1 and 2 api
				this.optionsParam.startDate = this.date[0];
				this.optionsParam.endDate = this.date[1];

				// Graph
				this.$store.dispatch("worldChart", this.optionsParam);
			},
		},
		watch: {
			defaultFilterDate() {
				this.filterValueForStatistics();
			},
		},
	};
</script>
