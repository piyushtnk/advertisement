<template>
	<div>
		<div
			class="text-h3 transition-swing my-5"
			v-text="$t($route.query.type)"
		></div>

		<v-row class="mb-2">
			<v-col cols="12" lg="2" md="2" sm="12">
				<v-card class="mx-auto" outlined>
					<v-card-title class="h6">
						{{ $t("id") }}
					</v-card-title>
					<v-card-text>
						{{ players.banner.id }}
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" lg="3" md="3" sm="12">
				<v-card class="mx-auto" outlined>
					<v-card-title class="h6">
						{{ $t("advertisementSource") }}
					</v-card-title>
					<v-card-text>
						{{ players.banner.comment }}
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" lg="2" md="2" sm="12">
				<v-card class="mx-auto" outlined>
					<v-card-title class="h6">
						{{ $t("destinationURL") }}
					</v-card-title>
					<v-card-text>
						{{ players.banner.redirectUrl }}
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

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
					<v-col cols="12" lg="2" md="2" sm="12">
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
					<v-col cols="12" lg="2" md="2" sm="12">
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
					<v-col cols="12" lg="2" md="2" sm="12">
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
				</v-row>
			</v-card-text>
		</v-card>

		<!-- Information of this banner -->
		<v-row class="mb-2">
			<v-col
				cols="12"
				lg="3"
				md="3"
				sm="12"
				v-for="(player, index) in players"
				:key="index"
				v-if="typeof player == 'number'"
			>
				<v-card class="mx-auto" outlined>
					<v-card-title class="display-1">
						{{ diffCountVsValue(player, index) }}
					</v-card-title>
					<v-card-text>
						{{ $t(index) }}
					</v-card-text>
					<v-card-actions
						v-if="
							index == 'playersCount' ||
							index == 'allPlayersCount'
						"
					>
						<v-btn
							text
							color="teal accent-4"
							@click="showTableData(index)"
						>
							{{ $t("clickToCheck") }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>

		<!-- Table Listing -->
		<v-row>
			<v-col cols="12">
				<v-data-table
					:headers="headers"
					item-key="id"
					:options.sync="options"
					:server-items-length="players.total"
					:pageCount="players.totalPages"
					:items="tableItems"
					:loading="loading"
					class="elevation-1"
					:footer-props="footerProps"
					show-expand
					single-expand
					item-expanded
				>
					<template v-slot:[`item.firstName`]="{ item }">
						{{
							isNull(item.firstname) + " " + isNull(item.lastname)
						}}
					</template>

					<template v-slot:expanded-item="{ headers, item }">
						<td :colspan="headers.length">
							<v-row no-gutters>
								<v-col lg="4" md="6" sm="12">
									<v-list-item two-line>
										<v-list-item-content>
											<v-list-item-title>{{
												$t("agentBy")
											}}</v-list-item-title>
											<v-list-item-subtitle>{{
												fixParameters(
													item.ulagentaccount
												)
											}}</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-col>
								<v-col lg="4" md="6" sm="12">
									<v-list-item two-line>
										<v-list-item-content>
											<v-list-item-title>{{
												$t("createdAt")
											}}</v-list-item-title>
											<v-list-item-subtitle>{{
												fixParameters(item.createdAt)
											}}</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-col>
								<v-col lg="4" md="6" sm="12">
									<v-list-item two-line>
										<v-list-item-content>
											<v-list-item-title>{{
												$t("depositAvg")
											}}</v-list-item-title>
											<v-list-item-subtitle>{{
												fixParameters(item.depositavg)
											}}</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-col>
								<v-col lg="4" md="6" sm="12">
									<v-list-item two-line>
										<v-list-item-content>
											<v-list-item-title>{{
												$t("createdAt")
											}}</v-list-item-title>
											<v-list-item-subtitle>{{
												fixParameters(item.createdAt)
											}}</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-col>
								<v-col lg="4" md="6" sm="12">
									<v-list-item two-line>
										<v-list-item-content>
											<v-list-item-title>{{
												$t("firstWithdrawalTime")
											}}</v-list-item-title>
											<v-list-item-subtitle>{{
												fixParameters(
													item.firstwithdrawtime
												)
											}}</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-col>
								<v-col lg="4" md="6" sm="12">
									<v-list-item two-line>
										<v-list-item-content>
											<v-list-item-title>{{
												$t("manualBonus")
											}}</v-list-item-title>
											<v-list-item-subtitle>{{
												fixParameters(item.manualbonus)
											}}</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-col>
							</v-row>
						</td>
					</template>
				</v-data-table>
			</v-col>
		</v-row>

		<v-row class="my-2">
			<v-col cols="12" lg="2" md="2" sm="12" offset-lg="10">
				<v-card class="mx-auto" outlined>
					<v-card-title class="h6">
						{{ $t("banner") }} {{ $t("createdAt") }}
					</v-card-title>
					<v-card-text>
						{{ players.banner.createdAt }}
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import Variables from "~/mixins/variables";
	import GlobalMixin from "~/mixins/global";

	export default {
		name: "TableComponent",
		mixins: [Variables, GlobalMixin],
		data() {
			return {
				defaultFilterDate: 1,
				loading: false,
				sortBy: "id|desc",
				tableItems: [],
			};
		},
		computed: {
			...mapGetters({
				players: "getBannerRegPlayers",
			}),
			headers() {
				return [
					{ text: this.$t("userId"), value: "playerid" },
					{ text: this.$t("name"), value: "firstname" },
					{ text: this.$t("registrationIp"), value: "regip" },
					{
						text: this.$t("totalBetAmount"),
						value: "totalbetamount",
					},
					{ text: this.$t("totalBonus"), value: "totalbonus" },
					{ text: this.$t("totalDeposit"), value: "totaldeposit" },
					{
						text: this.$t("totalDepositCount"),
						value: "totaldepositcount",
					},
					{ text: this.$t("totalWithdraw"), value: "totalwithdraw" },
					{
						text: this.$t("totalWithdrawCount"),
						value: "totalwithdrawcount",
					},
				];
			},
			headerSearch() {
				return [
					{ text: this.$t("userId"), value: "playerid" },
					{ text: this.$t("name"), value: "firstname" },
					{ text: this.$t("registrationIp"), value: "regip" },
					{
						text: this.$t("totalBetAmount"),
						value: "totalbetamount",
					},
					{ text: this.$t("totalBonus"), value: "totalbonus" },
					{ text: this.$t("totalDeposit"), value: "totaldeposit" },
					{
						text: this.$t("totalDepositCount"),
						value: "totaldepositcount",
					},
					{ text: this.$t("totalWithdraw"), value: "totalwithdraw" },
					{
						text: this.$t("totalWithdrawCount"),
						value: "totalwithdrawcount",
					},
				];
			},
		},
		methods: {
			// Generate report
			async generateReport() {
				this.loading = true;
				let date = new Date().toJSON().slice(0, 10).replace(/-/g, ".");
				const csvString = [
					...this.players.directRegisteredPlayersList.map((item) => [
						item.playerid,
						item.firstname,
						item.totalbetamount,
						item.totalbonus,
						item.totaldeposit,
						item.totaldepositcount,
						item.totalwithdraw,
						item.totalwithdrawcount,
					]),
				];

				let csv =
					"User ID, Registration Ip, Total Bet Amount, Total Bonus, Total Deposit, Total Deposit Count, Total Withdrawal, Total Withdrawal Count\n";
				csvString.forEach(function (row) {
					csv += row.join(",");
					csv += "\n";
				});
				let hiddenElement = document.createElement("a");
				hiddenElement.href =
					"data:text/csv;charset=utf-8," +
					encodeURIComponent(
						"\uFEFF" +
							"Report Date," +
							this.date[0] +
							" TO " +
							this.date[1] +
							"\n" +
							"\n" +
							this.$t(this.$route.query.type),
						"\n" +
							"\n" +
							"Direct Registered Players Count," +
							this.players.allDirectRegisteredPlayersCount +
							"\n" +
							"First Deposit Count Of " +
							this.$t($route.query.type) +
							"," +
							this.players.firstDepositCountOfDirectPlayers +
							"\n" +
							"First Deposit Of " +
							this.$t($route.query.type) +
							"," +
							this.players.firstDepositOfDirectPlayers +
							"\n" +
							"First Withdrawal Count Of " +
							this.$t($route.query.type) +
							"," +
							this.players.firstWithdrawalCountOfDirectPlayers +
							"\n" +
							"First Withdrawal Of " +
							this.$t($route.query.type) +
							"," +
							this.players.firstWithdrawalOfDirectPlayers +
							"\n" +
							"Total Deposit Count Of " +
							this.$t($route.query.type) +
							"," +
							this.players.totalDepositCountOfDirectPlayers +
							"\n" +
							"Total Deposit Of " +
							this.$t($route.query.type) +
							"," +
							this.players.totalDepositsOfDirectPlayers +
							"\n" +
							"Total WIthdrawal Count Of " +
							this.$t($route.query.type) +
							"," +
							this.players.totalWithdrawalCountOfDirectPlayers +
							"\n" +
							"Total Withdrawal Of Direct Player," +
							this.players.totalWithdrawalsOfDirectPlayers +
							"\n" +
							"\n" +
							"Banner ID," +
							this.players.banner.id +
							"\n" +
							"Advertisement Source," +
							this.players.banner.comment +
							"\n" +
							"Redirect URL," +
							this.players.banner.comment +
							"\n" +
							"Banner Creation Date," +
							this.players.banner.createdAt +
							"\n" +
							"\n" +
							csv
					);
				hiddenElement.target = "_blank";
				hiddenElement.download =
					window.location.origin + "-direct-players-" + date + ".csv";
				await hiddenElement.click();
				this.loading = false;
			},

			// Load table data
			showTableData(index) {
				if (index == "allPlayersCount") {
					this.tableItems = this.players.allPlayersList;
				} else if (index == "playersCount") {
					this.tableItems = this.players.playersList;
				}
			},

			diffCountVsValue(player, index) {
				if (
					index == "firstDepositValue" ||
					index == "firstWithdrawalValue" ||
					index == "totalDepositValue" ||
					index == "totalWithdrawalValue"
				) {
					player = player * 1000;
					return this.staticNumberFormat(player);
				} else {
					return this.staticNumberFormat(player);
				}
			},
		},
		watch: {
			players(v) {
				this.loading = false;
			},
		},
	};
</script>
