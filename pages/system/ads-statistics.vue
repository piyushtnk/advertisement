<template>
	<div>
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

		<!-- Top 10 Banner -->
		<TopViewedBannersComponent :topViewLoading.sync="topViewLoading" />

		<!-- Last 10 Minute Banners List -->
		<Last10MinuteBannersComponent
			:last10MinuteLoading.sync="last10MinuteLoading"
		/>

		<!-- Top click wise banner listing -->
		<TopClickWiseBannerComponent
			:defaultFilterDateProps="defaultFilterDate"
			:topClickWiseViewBannerLoading.sync="topClickWiseViewBannerLoading"
		/>

		<!-- Counter Live -->
		<OSAndBrowserComponent
			:defaultFilterDateProps="defaultFilterDate"
			:pcInfoLoading.sync="pcInfoLoading"
		/>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	import OSAndBrowserComponent from "~/components/statistics/osAndBrowserCounter";
	import TopViewedBannersComponent from "~/components/statistics/topViewedBanners";
	import TopClickWiseBannerComponent from "~/components/statistics/topClickWiseBanner";
	import Last10MinuteBannersComponent from "~/components/statistics/last10MinuteBanners";
	import VariablesMixin from "~/mixins/variables";

	export default {
		name: "statistics",
		middleware: "authenticate",
		mixins: [VariablesMixin],
		data() {
			return {
				modal: false,
				pcInfoLoading: true,
				topClickWiseViewBannerLoading: true,
				ipClientsLoading: true,
				topViewLoading: true,
				last10MinuteLoading: true,
				optionsParam: {},
			};
		},
		mounted() {
			this.filterValueForStatistics();
		},
		computed: {},
		components: {
			OSAndBrowserComponent: OSAndBrowserComponent,
			TopViewedBannersComponent: TopViewedBannersComponent,
			Last10MinuteBannersComponent: Last10MinuteBannersComponent,
			TopClickWiseBannerComponent: TopClickWiseBannerComponent,
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
				this.pcInfoLoading = true;
				this.topClickWiseViewBannerLoading = true;
				this.ipClientsLoading = true;
				this.topViewLoading = true;
				this.last10MinuteLoading = true;

				// Statistics part 1 and 2 api
				this.optionsParam.startDate = this.date[0];
				this.optionsParam.endDate = this.date[1];

				// top viewed banners
				this.$store.dispatch(
					"system/banner/getTopViewedBanners",
					this.optionsParam
				);

				// top viewed banners
				this.$store.dispatch("system/banner/getLast10MinuteBanners");

				// Top click wise banner
				this.$store.dispatch(
					"system/banner/topClickWiseBanners",
					this.optionsParam
				);

				// Click wise browser and os
				this.$store.dispatch(
					"system/banner/clicksByBrowser",
					this.optionsParam
				);
				this.$store.dispatch("system/banner/clicksByOS", this.optionsParam);
			},
		},
		watch: {
			defaultFilterDate() {
				this.filterValueForStatistics();
			},
		},
	};
</script>
