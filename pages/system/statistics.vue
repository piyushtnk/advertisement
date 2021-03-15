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
					<v-btn elevation="2" outlined
						>{{ $t("statsMessage3") }}
						{{ getUpdateIntervalTime }}</v-btn
					>
				</v-col>
			</v-row>
		</v-alert>

		<!-- Filter section -->
		<v-card class="my-5">
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
							v-model="filterType.defaultFilterDate"
							:items="filterType.filterDate"
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
			@childFilterForCounter="filterValueForStatistics"
			:filterType="filterType"
			:date.sync="date"
		/>

		<!-- Counter Live -->
		<CounterComponent
			:filterType="filterType"
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
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import ChartsComponent from "~/components/statistics/charts";
	import CounterComponent from "~/components/statistics/counter";
	import TopViewedBannersComponent from "~/components/statistics/topViewedBanners";
	import Last10MinuteBannersComponent from "~/components/statistics/last10MinuteBanners";

	export default {
		middleware: "authenticate",
		data() {
			return {
				date: [],
				modal: false,
				filterType: {
					defaultFilterDate: 1,
					filterDate: [
						{
							state: 7,
							abbr: this.$t("all"),
						},
						{
							state: 1,
							abbr: this.$t("today"),
						},
						{
							state: 2,
							abbr: this.$t("yesterday"),
						},
						{
							state: 3,
							abbr: this.$t("thisWeek"),
						},
						{
							state: 4,
							abbr: this.$t("lastWeek"),
						},
						{
							state: 5,
							abbr: this.$t("thisMonth"),
						},
						{
							state: 6,
							abbr: this.$t("lastMonth"),
						},
					],
				},
				statistics2Loading: true,
				statisticsLoading: true,
				ipClientsLoading: true,
				topViewLoading: true,
				last10MinuteLoading: true,
			};
		},
		mounted() {
			let $this = this;
			setInterval(function () {
				$this.$store.dispatch("getUpdateIntervalTime");
			}, 1000);
		},
		computed: {
			...mapGetters({
				getUpdateIntervalTime: "getUpdateIntervalTime",
			}),
			dateRangeText() {
				return this.date.join(" ~ ");
			},
		},
		components: {
			ChartsComponent: ChartsComponent,
			CounterComponent: CounterComponent,
			TopViewedBannersComponent: TopViewedBannersComponent,
			Last10MinuteBannersComponent: Last10MinuteBannersComponent,
		},
		methods: {
			...mapActions({
				getStatistics: "getStatistics",
				getStatistics2: "getStatistics2",
				getTopViewedBanners: "getTopViewedBanners",
				getLast10MinuteBanners: "getLast10MinuteBanners",
			}),
			filterValueForStatistics(value) {
				// Set loading
				this.statistics2Loading = true;
				this.statisticsLoading = true;
				this.ipClientsLoading = true;
				this.topViewLoading = true;
				this.last10MinuteLoading = true;

				// Fire actions
				this.$store.dispatch("getStatistics", {
					duration: value.duration,
					startDate: value.startDate,
					endDate: value.endDate,
				});

				this.$store.dispatch("getStatistics2", {
					duration: value.duration,
					startDate: value.startDate,
					endDate: value.endDate,
				});

				// top viewed banners
				this.$store.dispatch("getTopViewedBanners", {
					duration: value.duration,
					startDate: value.startDate,
					endDate: value.endDate,
				});

				// top viewed banners
				this.$store.dispatch("getLast10MinuteBanners");

				// top viewed banners
				this.$store.dispatch("getIpClients", {
					duration: value.duration,
					startDate: value.startDate,
					endDate: value.endDate,
					sort: "id|desc",
					limit: 1,
					page: 1,
					search: "",
				});
			},
		},
	};
</script>
