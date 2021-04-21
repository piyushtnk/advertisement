<template>
	<div>
		<!-- Report section -->
		<v-card class="my-5 max-auto" outlined elevation="2" outlined>
			<v-list-item two-line>
				<v-list-item-content>
					<div class="overline">
						{{ $t("generateYourReport") }}
					</div>
				</v-list-item-content>
			</v-list-item>

			<v-card-text>
				<v-row align="center">
					<v-col cols="12" lg="3" md="3" sm="12">
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
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-select
							v-model="defaultFilterDate"
							:items="filterDate"
							item-value="state"
							item-text="abbr"
							:label="$t('filterType')"
						/>
					</v-col>
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-select
							v-model="search.column"
							:items="headerSearch"
							item-value="value"
							item-text="text"
							:label="$t('columnName')"
						/>
					</v-col>
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-text-field
							v-model="search.value"
							:label="$t('searchText')"
							required
						></v-text-field>
					</v-col>
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-btn
							color="blue"
							class="white--text mx-auto"
							@click="beforeSearchMiddleware"
							block
							:loading="loading"
						>
							{{ $t("search") }}
							<v-icon right dark> mdi-account-search </v-icon>
						</v-btn>
					</v-col>
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-btn
							color="red"
							class="white--text"
							@click="clearSearchFilter(7)"
							block
							:loading="loading"
						>
							{{ $t("clear") }}
							<v-icon right dark> mdi-trash-can </v-icon>
						</v-btn>
					</v-col>
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-btn
							color="green"
							class="white--text"
							@click="generateReport"
							block
							:loading="loading"
						>
							{{ $t("report") }}
							<v-icon right dark> mdi-file </v-icon>
						</v-btn>
					</v-col>
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-btn
							color="purple"
							class="white--text"
							@click="generateAssociatedReport"
							block
							:loading="loading"
						>
							{{ $t("associatedReport") }}
							<v-icon right dark> mdi-file </v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

		<!-- Table Listing -->
		<v-card outlined>
			<v-card-text>
				<v-data-table
					:headers="headers"
					item-key="id"
					:options.sync="options"
					:server-items-length="banners.total"
					:pageCount="banners.totalPages"
					:items="banners.data"
					:loading="loading"
					:footer-props="footerProps"
				>
					<template v-slot:[`item.uniqueId`]="{ item }">
						<div class="py-5">
							<a :href="findImage(item)" target="_blank">
								<v-img
									:src="findImage(item)"
									height="auto"
									width="300"
									class="grey lighten-2"
								/>
							</a>
						</div>
					</template>

					<template v-slot:[`item.uniqueClientsCount`]="{ item }">
						<v-chip
							outlined
							color="green"
							class="ma-2"
							:to="`/system/clients?bannerId=${item.id}&filterType=${defaultFilterDate}&unique=true`"
						>
							{{ staticNumberFormat(item.uniqueClientsCount) }}
						</v-chip>
					</template>

					<template v-slot:item.views="{ item }">
						<v-chip outlined color="purple" class="ma-2">
							{{ staticNumberFormat(item.views) }}
						</v-chip>
					</template>

					<!-- direct players -->
					<template
						v-slot:item.directRegisteredPlayersCount="{ item }"
					>
						<v-chip outlined color="secondary" class="ma-2">
							{{
								staticNumberFormat(
									item.directRegisteredPlayersCount
								)
							}}
						</v-chip>
					</template>
					<template
						v-slot:item.firstDepositCountOfDirectPlayers="{ item }"
					>
						<v-chip outlined color="secondary" class="ma-2">
							{{
								staticNumberFormat(
									item.firstDepositCountOfDirectPlayers
								)
							}}
						</v-chip>
					</template>

					<!-- associated players -->
					<template v-slot:item.associatedPlayersCount="{ item }">
						<v-chip outlined color="blue" class="ma-2">
							{{
								staticNumberFormat(item.associatedPlayersCount)
							}}
						</v-chip>
					</template>
					<template
						v-slot:item.firstDepositCountOfAssociatedPlayers="{
							item,
						}"
					>
						<v-chip outlined color="blue" class="ma-2">
							{{
								staticNumberFormat(
									item.firstDepositCountOfAssociatedPlayers
								)
							}}
						</v-chip>
					</template>

					<!-- Cost -->
					<template v-slot:item.costEffectivenessResponse="{ item }">
						<v-chip
							outlined
							class="ma-2"
							color="secondary"
							v-if="item.costEffectivenessResponse.costPerDay"
						>
							{{ $t("costPerDay") }}
							{{
								item.costEffectivenessResponse.costPerDay.toFixed(
									3
								)
							}}
							{{ item.costEffectivenessResponse.currency }}
						</v-chip>

						<v-chip
							outlined
							color="secondary"
							class="ma-2"
							v-if="item.costEffectivenessResponse"
						>
							{{ $t("eachPlayerCost") }}
							{{
								item.directRegisteredPlayersCount +
								item.associatedPlayersCount
									? (
											item.costEffectivenessResponse
												.costPerDay /
											(item.directRegisteredPlayersCount +
												item.associatedPlayersCount)
									  ).toFixed(3)
									: 0
							}}
							{{ item.costEffectivenessResponse.currency }}
						</v-chip>
						<v-chip outlined color="secondary" class="ma-2" v-else>
							({{ item.costEffectivenessResponse.currency }})
							{{ item.costEffectivenessResponse.costPerDay }}
						</v-chip>
					</template>

					<!-- Actions -->
					<template v-slot:[`item.actions`]="{ item }">
						<div class="my-2">
							<v-tooltip left color="purple">
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										v-bind="attrs"
										v-on="on"
										target="_blank"
										:href="
											localePath(
												`/system/company/b91/banner-players-list?bannerId=${item.id}&startDate=${date[0]}&endDate=${date[1]}&type=directPlayers`
											)
										"
										fab
										small
									>
										<v-icon color="secondary">
											mdi-account-group
										</v-icon>
									</v-btn>
								</template>
								<span>{{ $t("directPlayers") }}</span>
							</v-tooltip>
						</div>
						<div>
							<v-tooltip left color="purple">
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										v-bind="attrs"
										v-on="on"
										small
										target="_blank"
										:href="
											localePath(
												`/system/company/b91/banner-players-list?bannerId=${item.id}&startDate=${date[0]}&endDate=${date[1]}&type=assPlayers`
											)
										"
										fab
									>
										<v-icon color="light-blue lighten-3">
											mdi-account-group
										</v-icon>
									</v-btn>
								</template>
								<span>{{ $t("assPlayers") }}</span>
							</v-tooltip>
						</div>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import Variables from "~/mixins/variables";
	import Global from "~/mixins/global";

	export default {
		name: "PerformanceComponent",
		mixins: [Variables, Global],
		data() {
			return {
				defaultFilterDate: 1,
				loading: false,
				sortBy: "id|desc",
			};
		},
		computed: {
			...mapGetters({
				banners: "getBannersPerf",
				getViewsStore: "getViews",
			}),
			headerSearch() {
				return [
					{ text: this.$t("bannerLink"), value: "uniqueId" },
					// { text: this.$t("destinationURL"), value: "redirectUrl" },
					{ text: this.$t("advertisementSource"), value: "comment" },
				];
			},
			headers() {
				return [
					{
						text: this.$t("id"),
						value: "id",
						sortable: false,
					},
					{
						text: this.$t("banner"),
						value: "uniqueId",
						sortable: false,
					},
					// { text: this.$t("destinationURL"), value: "redirectUrl" },
					{ text: this.$t("advertisementSource"), value: "comment" },
					{ text: this.$t("uniqueClicks"), value: "uniqueClientsCount" },
					{ text: this.$t("views"), value: "views", sortable: false },
					{
						text: this.$t("directPlayers"),
						value: "directRegisteredPlayersCount",
						sortable: false,
					},
					{
						text: this.$t("firstDepositCountDP"),
						value: "firstDepositCountOfDirectPlayers",
						sortable: false,
					},
					{
						text: this.$t("associatedPlayers"),
						value: "associatedPlayersCount",
						sortable: false,
					},
					{
						text: this.$t("firstDepositCountAP"),
						value: "firstDepositCountOfAssociatedPlayers",
						sortable: false,
					},
					{
						text: this.$t("costPerDay"),
						value: "costEffectivenessResponse",
						sortable: false,
					},
					{ text: this.$t("createdAt"), value: "createdAt" },
					{ text: this.$t("actions"), value: "actions", sortable: false },
				];
			},
		},
		methods: {
			findImage(item) {
				let path = null;
				try {
					path = `${process.env.CLOUD_URL}/banner/${item.uniqueId}.${item.imageType}`;
				} catch (e) {
					path = require("~/assets/banner/default.jpg");
				}
				return path;
			},

			// Generate report
			generateReport() {
				this.loading = true;
				let date = new Date().toJSON().slice(0, 10).replace(/-/g, ".");
				this.$axios
					.get("/report/today", {
						params: {
							startDate: this.date[0],
							endDate: this.date[1],
						},
					})
					.then((response) => {
						const csvString = [
							...response.data.data.map((item) => [
								item.id,
								item.agentId,
								item.comment,
								item.allClientsCount,
								item.registeredPlayers,
								item.convertRate,
								item.firstDeposit,
								item.firstDepositCount,
								item.firstWithdrawal,
								item.firstWithdrawalCount,
								item.totalDeposits,
								item.totalDepositCount,
								item.totalWithdrawals,
								item.totalWithdrawalCount,
								item.profit,
							]),
						];

						let csv =
							"Banner Id, URL, Website, Unique Clicks, Register, Covert Rate, First Deposit, First Deposit Count, First Withdrawal, First Withdrawal Count, Total Deposit, Total Deposit Count, Total Withdrawal, Total Withdrawal Count, Profit\n";
						csvString.forEach(function (row) {
							csv += row.join(",");
							csv += "\n";
						});
						let hiddenElement = document.createElement("a");
						hiddenElement.href =
							"data:text/csv;charset=utf-8," +
							encodeURIComponent(
								"\uFEFF" +
									this.date[0] +
									" TO " +
									this.date[1] +
									"\n" +
									csv
							);
						hiddenElement.target = "_blank";
						hiddenElement.download =
							process.env.DOMAIN + "-reports-" + date + ".csv";
						hiddenElement.click();
						this.loading = false;
					});
			},

			// Generate associated report.
			generateAssociatedReport() {
				this.loading = true;
				let date = new Date().toJSON().slice(0, 10).replace(/-/g, ".");
				this.$axios
					.get("/report/associated", {
						params: {
							startDate: this.date[0],
							endDate: this.date[1],
						},
					})
					.then((response) => {
						const csvString = [
							...response.data.data.map((item) => [
								item.id,
								item.agentId,
								item.comment,
								item.allClientsCount,
								item.registeredPlayers,
								item.convertRateOfDirectPlayers,
								item.firstDepositOfDirectPlayers,
								item.firstDepositCountOfDirectPlayers,
								item.totalDepositsOfDirectPlayers,
								item.totalDepositCountOfDirectPlayers,
								item.firstWithdrawalOfDirectPlayers,
								item.firstWithdrawalCountOfDirectPlayers,
								item.totalWithdrawalsOfDirectPlayers,
								item.totalWithdrawalCountOfDirectPlayers,
								item.profitOfDirectPlayers,
								item.firstDepositOfAssociatedPlayers,
								item.firstDepositCountOfAssociatedPlayers,
								item.totalDepositsOfAssociatedPlayers,
								item.totalDepositCountOfAssociatedPlayers,
								item.firstWithdrawalOfAssociatedPlayers,
								item.firstWithdrawalCountOfAssociatedPlayers,
								item.totalWithdrawalsOfAssociatedPlayers,
								item.totalWithdrawalCountOfAssociatedPlayers,
								item.profitOfAssociatedPlayers,
								item.associatedPlayers,
								item.convertRateOfAssociatedPlayers,
								item.totalDepositAmount,
								item.totalProfit,
								item.totalWithdrawalAmount,
							]),
						];

						let csv =
							"Banner Id, URL, Website, Unique Clicks, Direct Registered Players, Covert Rate Direct Players, First Deposit Direct Players, First Deposit Count Direct Players, Total Deposit Direct Players, Total Deposit Count Direct Players, First Withdrawal Direct Players, First Withdrawal Count Direct Players, Total Withdrawal Direct Players, Total Withdrawal Count Direct Players, Profit Direct Players, First Deposit Associated Players, First Deposit Count Associated Players, Total Deposit Associated Players, Total Deposit Count Associated Players, First Withdrawal Associated Players, First Withdrawal Count Associated Players, Total Withdrawal Associated Players, Total Withdrawal Count Associated Players, Profit Associated Players, Associated Players, Convert Rate Associated Players, Total Deposit Amount(Associated+Direct), Total Profit(Associated+Direct), Total Withdrawal Amount(Associated+Direct)\n";
						csvString.forEach(function (row) {
							csv += row.join(",");
							csv += "\n";
						});
						let hiddenElement = document.createElement("a");
						hiddenElement.href =
							"data:text/csv;charset=utf-8," +
							encodeURIComponent(
								"\uFEFF" +
									this.date[0] +
									" TO " +
									this.date[1] +
									"\n" +
									csv
							);
						hiddenElement.target = "_blank";
						hiddenElement.download =
							process.env.DOMAIN +
							"-associated-reports-" +
							date[0] +
							".csv";
						hiddenElement.click();
						this.loading = false;
					});
			},
		},
		watch: {
			banners(value) {
				this.loading = false;
			},
			date(value) {
				if (value.length == 2) {
					this.reportDisable = false;
				} else {
					this.reportDisable = true;
				}
			},
		},
	};
</script>

