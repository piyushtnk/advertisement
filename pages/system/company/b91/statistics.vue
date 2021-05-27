<template>
	<div>
		<v-row>
			<v-col>
				<v-alert text type="info" dense>
					{{ $t("statsMessage") }}
				</v-alert>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-alert prominent type="error">
					<v-row align="center">
						<v-col class="grow">
							{{ $t("statsMessage2") }}
						</v-col>
						<v-col class="shrink">
							<v-btn
								>{{ $t("statsMessage3") }}
								{{ getUpdateIntervalTime }}</v-btn
							>
						</v-col>
					</v-row>
				</v-alert>
			</v-col>
		</v-row>

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

		<!-- Counter Live -->
		<CounterComponent
			:defaultFilterDateProps="defaultFilterDate"
			:overallLoading.sync="overallLoading"
			:statisticsLoading.sync="statisticsLoading"
			:ipClientsLoading.sync="ipClientsLoading"
		/>

		<!-- Regular users -->
		<RegularPlayersComponent />
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	import CounterComponent from "~/components/company/b91/statistics/counter";
	import RegularPlayersComponent from "~/components/company/b91/statistics/regular-players";
	import VariablesMixin from "~/mixins/variables";

	export default {
		name: "statistics",
		middleware: "authenticate",
		mixins: [VariablesMixin],
		data() {
			return {
				modal: false,
				overallLoading: true,
				statisticsLoading: true,
				ipClientsLoading: true,
				topViewLoading: true,
				last10MinuteLoading: true,
				optionsParam: {},
			};
		},
		mounted() {
			let $this = this;
			setInterval(function () {
				$this.$store.dispatch("getUpdateIntervalTime");
			}, 1000);
			this.filterValueForStatistics();
		},
		computed: {
			...mapGetters({
				getUpdateIntervalTime: "getUpdateIntervalTime",
			}),
		},
		components: {
			CounterComponent: CounterComponent,
			RegularPlayersComponent: RegularPlayersComponent,
		},
		methods: {
			whenDialogClosed() {
				if (this.date.length == 2) {
					this.showDateText();
					this.filterValueForStatistics();
				}
			},

			filterValueForStatistics() {
				// Set loading
				this.overallLoading = true;
				this.statisticsLoading = true;
				this.ipClientsLoading = true;
				this.topViewLoading = true;
				this.last10MinuteLoading = true;

				// Statistics part 1 and 2 api
				this.optionsParam.startDate = this.date[0];
				this.optionsParam.endDate = this.date[1];

				// Win Loss
				this.$store.dispatch("getWinLoss", this.optionsParam);

				// Valid bet
				this.$store.dispatch("validBet", this.optionsParam);

				// chart withdrawal
				this.$store.dispatch("getStatisticsCounter", this.optionsParam);
				this.$store.dispatch(
					"getStatisticsTopUpOverall",
					this.optionsParam
				);

				this.$store.dispatch(
					"getStatisticsBannerClicksOverall",
					this.optionsParam
				);
				this.$store.dispatch("clicksCountFromPC", this.optionsParam);
				this.$store.dispatch("clicksCountFromMobile", this.optionsParam);
				// Regular players
				this.$store.dispatch("getRegularPlayers", this.optionsParam);

				// top viewed banners
				this.optionsParam.sort = "id|desc";
				this.optionsParam.limit = 1;
				this.optionsParam.page = 1;
				this.optionsParam.search = "";
				this.$store.dispatch("getIpClients", this.optionsParam);
			},
		},
		watch: {
			defaultFilterDate() {
				this.filterValueForStatistics();
			},
		},
	};
</script>
