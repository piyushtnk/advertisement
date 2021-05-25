<template>
	<div>
		<v-row class="mt-6">
			<v-col cols="12">
				<v-card class="mx-auto" outlined>
					<v-app-bar flat>
						<v-toolbar-title>{{
							$t("dashboardText.liveStatistics")
						}}</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-row>
							<v-col cols="auto" class="ml-auto">
								<v-select
									v-model="defaultFilterDate"
									:items="filterDate"
									item-value="state"
									item-text="abbr"
									label="Filter Type"
									full-width
								/>
							</v-col>
						</v-row>
					</v-app-bar>

					<v-card-text>
						<v-row>
							<v-col cols="12" lg="12" md="12" sm="12">
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

							<v-col cols="12" lg="4" md="4" sm="12">
								<v-card
									class="mx-auto"
									outlined
									to="/system/clients"
								>
									<v-card-title class="display-3">{{
										staticNumberFormat(
											bannerClickOverall.allClients
										)
									}}</v-card-title>
									<v-card-text>
										{{ $t("visitors") }}
									</v-card-text>
								</v-card>
							</v-col>

							<v-col cols="12" lg="4" md="4" sm="12">
								<v-card
									class="mx-auto"
									outlined
									to="/system/clients?unique=true"
								>
									<v-card-title class="display-3">{{
										staticNumberFormat(
											bannerClickOverall.uniqueClients
										)
									}}</v-card-title>
									<v-card-text>
										{{ $t("dashboardText.actualVisitors") }}
									</v-card-text>
								</v-card>
							</v-col>

							<v-col cols="12" lg="4" md="4" sm="12">
								<v-card
									class="mx-auto"
									outlined
									to="/system/banner"
								>
									<v-card-title class="display-3">{{
										staticNumberFormat(
											bannerCount.allBannersCount
										)
									}}</v-card-title>
									<v-card-text>
										{{
											$t(
												"dashboardText.registeredBanners"
											)
										}}
									</v-card-text>
								</v-card>
							</v-col>

							<v-col cols="12" lg="4" md="4" sm="12">
								<v-card class="mx-auto" outlined>
									<v-card-title class="display-3">{{
										staticNumberFormat(
											dashboardAllAdminCount.allAdminsCount
										)
									}}</v-card-title>
									<v-card-text>
										{{ $t("dashboardText.admins") }}
									</v-card-text>
								</v-card>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import Variables from "~/mixins/variables";

	export default {
		name: "CountersComponent",
		data: () => ({
			modal: false,
		}),
		mixins: [Variables],
		computed: {
			...mapGetters({
				bannerCount: "system/dashboard/getDashboardAllBannerCount",
				bannerClickOverall:
					"system/banner/getStatisticsBannerClicksOverall",
				dashboardAllAdminCount:
					"system/dashboard/getDashboardAllAdminCount",
			}),
		},
		mounted() {
			this.defaultFilterDate = 7;
			this.callParentEvent();
		},
		methods: {
			callParentEvent() {
				this.$emit("childFilterForDate", {
					startDate: this.date[0],
					endDate: this.date[1],
				});
			},
			whenDialogClosed() {
				if (this.date.length == 2) {
					this.showDateText();
					this.callParentEvent();
				}
			},
		},
		watch: {
			defaultFilterDate(value) {
				this.callParentEvent();
			},
		},
	};
</script>
