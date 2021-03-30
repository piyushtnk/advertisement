<template>
	<div>
		<v-alert text type="info">
			{{ $t("statsMessage") }}
		</v-alert>
		<v-alert text type="warning">
			<v-row>
				<v-col class="grow">
					{{ $t("statsMessage2") }}
				</v-col>
				<v-col class="shrink">
					<v-btn elevation="2" outlined depressed color="primary"
						>{{ $t("statsMessage3") }}
						{{ getUpdateIntervalTime }}</v-btn
					>
				</v-col>
			</v-row>
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
		<ChartsComponent
			@childFilterForCounter="loadChartSeparately"
			:date.sync="date"
		/>

		<!-- Chart withdrawal -->
		<ChartWithdrawalComponent />

		<!-- Chart deposit -->
		<ChartDepositComponent />

		<!-- Counter Live -->
		<CounterComponent
			:defaultFilterDateProps="defaultFilterDate"
			:statistics2Loading.sync="statistics2Loading"
			:statisticsLoading.sync="statisticsLoading"
			:ipClientsLoading.sync="ipClientsLoading"
		/>

		<!-- Top 10 Banner -->
		<TopViewedBannersComponent :topViewLoading.sync="topViewLoading" />

		<!-- Last 10 Minute Banners List -->
		<Last10MinuteBannersComponent
			:last10MinuteLoading.sync="last10MinuteLoading"
		/>

		<!-- Regular users -->
		<RegularPlayersComponent />
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";

	// chart import
	import ChartsComponent from "~/components/statistics/charts";
	import ChartWithdrawalComponent from "~/components/statistics/chart-withdrawal";
	import ChartDepositComponent from "~/components/statistics/chart-deposit";

	import CounterComponent from "~/components/statistics/counter";
	import RegularPlayersComponent from "~/components/statistics/regular-players";
	import TopViewedBannersComponent from "~/components/statistics/topViewedBanners";
	import Last10MinuteBannersComponent from "~/components/statistics/last10MinuteBanners";
	import VariablesMixin from "~/mixins/variables";

	export default {
		name: "statistics",
		middleware: "authenticate",
		mixins: [VariablesMixin],
		data() {
			return {
				modal: false,
				statistics2Loading: true,
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
			ChartsComponent: ChartsComponent,
			CounterComponent: CounterComponent,
			TopViewedBannersComponent: TopViewedBannersComponent,
			Last10MinuteBannersComponent: Last10MinuteBannersComponent,
			ChartWithdrawalComponent: ChartWithdrawalComponent,
			ChartDepositComponent: ChartDepositComponent,
			RegularPlayersComponent: RegularPlayersComponent,
		},
		methods: {
			// ...mapActions({
			// 	getStatistics: "getStatistics",
			// 	getStatistics2: "getStatistics2",
			// 	getTopViewedBanners: "getTopViewedBanners",
			// 	getLast10MinuteBanners: "getLast10MinuteBanners",
			// }),
			whenDialogClosed() {
				if (this.date.length == 2) {
					this.showDateText();
					this.filterValueForStatistics();
				}
			},
			loadChartSeparately() {
				this.$store.dispatch("getStatistics", this.optionsParam);
			},

			filterValueForStatistics() {
				// Set loading
				this.statistics2Loading = true;
				this.statisticsLoading = true;
				this.ipClientsLoading = true;
				this.topViewLoading = true;
				this.last10MinuteLoading = true;

				// Statistics part 1 and 2 api
				this.optionsParam.startDate = this.date[0];
				this.optionsParam.endDate = this.date[1];

				// chart withdrawal
				this.$store.dispatch("getChartWithdrawal", this.optionsParam);
				this.$store.dispatch("getChartDeposit", this.optionsParam);
				this.$store.dispatch("getStatistics", this.optionsParam);
				this.$store.dispatch("getStatistics2", this.optionsParam);

				// Regular players
				this.$store.dispatch("getRegularPlayers", this.optionsParam);

				// top viewed banners
				this.$store.dispatch("getTopViewedBanners", this.optionsParam);

				// top viewed banners
				this.$store.dispatch("getLast10MinuteBanners");

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
