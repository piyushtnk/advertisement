<template>
	<div>
		<!-- Filter Area -->
		<v-card class="my-5" outlined>
			<v-card-text>
				<v-row align="center">
					<v-col cols="12" lg="3" md="4" sm="12">
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
					<v-col cols="12" lg="2" md="4" sm="12">
						<v-select
							v-model="playersType"
							:items="defaultPlayersType"
							item-value="key"
							item-text="value"
							:label="$t('playerType')"
						/>
					</v-col>
					<v-col cols="12" lg="2" md="4" sm="12">
						<v-select
							v-model="defaultFilterDate"
							:items="filterDate"
							item-value="state"
							item-text="abbr"
							:label="$t('filterType')"
						/>
					</v-col>
					<v-col cols="12" lg="2" md="4" sm="12">
						<v-select
							v-model="search.column"
							:items="headerSearch"
							item-value="value"
							item-text="text"
							:label="$t('columnName')"
						/>
					</v-col>
					<v-col cols="12" lg="3" md="4" sm="12">
						<v-text-field
							v-model="search.value"
							:label="$t('searchText')"
							required
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
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
							@click="clearSearchFilter(1)"
							block
							:loading="loading"
						>
							{{ $t("clear") }}
							<v-icon right dark> mdi-trash-can </v-icon>
						</v-btn>
					</v-col>
					<v-col cols="12" lg="2" md="2" sm="12">
						<ExcelDownloadButton
							:excelData="players.data"
							:fileName="$t('layout.players')"
							:loading="loading"
						/>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

		<!-- Table Listing -->
		<v-row>
			<v-col cols="12">
				<v-card outlined>
					<v-card-text>
						<v-data-table
							:items-per-page="10"
							:headers="headers"
							item-key="id"
							:options.sync="options"
							:server-items-length="players.total"
							:pageCount="players.totalPages"
							:items="players.data"
							:loading="loading"
							:footer-props="footerProps"
							show-expand
							single-expand
							item-expanded
						>
							<template v-slot:[`item.levelName`]="{ item }">
								{{ $t(removeSpaceAndComma(item.levelName)) }}
							</template>

							<template v-slot:[`item.totaldeposit`]="{ item }">
								{{ numberFormat(item.totaldeposit) }}
							</template>

							<template
								v-slot:[`item.totaldepositcount`]="{ item }"
							>
								{{ numberFormat(item.totaldepositcount) }}
							</template>

							<template
								v-slot:[`item.totalWithdrawal`]="{ item }"
							>
								{{ numberFormat(item.totalWithdrawal) }}
							</template>
							<template
								v-slot:[`item.totalwithdrawcount`]="{ item }"
							>
								{{ numberFormat(item.totalwithdrawcount) }}
							</template>

							<template v-slot:expanded-item="{ headers, item }">
								<td :colspan="headers.length">
									<v-row no-gutters>
										<!-- Col 1 -->
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Create
														Date</v-list-item-title
													>
													<v-list-item-subtitle>{{
														fixParameters(
															item.createdate
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Tag
														Name</v-list-item-title
													>
													<v-list-item-subtitle>{{
														arrayToText(
															item.tagsname
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Total
														Deposit</v-list-item-title
													>
													<v-list-item-subtitle>{{
														fixParameters(
															item.totaldeposit
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Last Withdraw
														Time</v-list-item-title
													>
													<v-list-item-subtitle>{{
														fixParameters(
															item.lastwithdrawtime
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Created
														At</v-list-item-title
													>
													<v-list-item-subtitle>{{
														fixParameters(
															item.createdAt
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>

										<!-- Col 2 -->
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Login
														Time</v-list-item-title
													>
													<v-list-item-subtitle>{{
														fixParameters(
															item.logintime
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Total Deposit
														Count</v-list-item-title
													>
													<v-list-item-subtitle>{{
														fixParameters(
															item.totaldepositcount
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Last Deposit
														Time</v-list-item-title
													>
													<v-list-item-subtitle>{{
														fixParameters(
															item.lastdeposittime
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Agent
														By</v-list-item-title
													>
													<v-list-item-subtitle>{{
														fixParameters(
															item.ulagentaccount
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Updated
														At</v-list-item-title
													>
													<v-list-item-subtitle>{{
														fixParameters(
															item.updatedAt
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>

										<!-- Col 3 -->
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Registered
														IP</v-list-item-title
													>
													<v-list-item-subtitle>{{
														fixParameters(
															item.regip
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Total
														Withdraw</v-list-item-title
													>
													<v-list-item-subtitle>{{
														fixParameters(
															item.totalwithdraw
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Total Withdraw
														Count</v-list-item-title
													>
													<v-list-item-subtitle>{{
														fixParameters(
															item.totalwithdrawcount
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>UL Agent
														ID</v-list-item-title
													>
													<v-list-item-subtitle>{{
														fixParameters(
															item.ulagentid
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
									</v-row>
								</td>
							</template>

							<!-- Fixed footer -->
							<template slot="body.append">
								<tr>
									<th colspan="5">Total</th>
									<th>
										{{
											numberFormat(
												sumField("totaldeposit")
											)
										}}
									</th>
									<th>
										{{
											numberFormat(
												sumField("totaldepositcount")
											)
										}}
									</th>
									<th>
										{{
											numberFormat(
												sumField("totalWithdrawal")
											)
										}}
									</th>
									<th>
										{{
											numberFormat(
												sumField("totalwithdrawcount")
											)
										}}
									</th>
									<th>
										{{
											numberFormat(sumField("totalbonus"))
										}}
									</th>
									<th>
										{{
											numberFormat(
												sumField("totalwinloss")
											)
										}}
									</th>
									<th>
										{{ numberFormat(sumField("validbet")) }}
									</th>
								</tr>
							</template>
						</v-data-table>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import Variables from "~/mixins/variables";
	import Global from "~/mixins/global";

	export default {
		name: "TableComponent",
		mixins: [Variables, Global],
		data() {
			return {
				sortBy: "id|desc",
				playersType: 1, // 0 = Other Sources, 1 = Registered Through Banner, 2 = Registered IP viewers but not clicked on banner.
			};
		},
		computed: {
			...mapGetters({
				players: "getPlayers",
			}),
			defaultPlayersType() {
				return [
					{
						key: "",
						value: this.$t("allSingle"),
					},
					{ key: 0, value: this.$t("otherSources") },
					{ key: 1, value: this.$t("regThroughBanner") },
					{
						key: 2,
						value: this.$t("regIpViewerButNotClick"),
					},
				];
			},
			headers() {
				return [
					{ text: this.$t("registrationTime"), value: "createdate" },
					{ text: this.$t("userId"), value: "playerid" },
					{ text: this.$t("name"), value: "firstname" },
					{
						text: this.$t("levelName"),
						value: "levelName",
						sortable: false,
					},
					{ text: this.$t("totalTopUp"), value: "totaldeposit" },
					{
						text: this.$t("totalTopUpCount"),
						value: "totaldepositcount",
					},
					{ text: this.$t("totalWithdrawal"), value: "totalwithdraw" },
					{
						text: this.$t("totalWithdrawalCount"),
						value: "totalwithdrawcount",
					},
					{ text: this.$t("totalClaimed"), value: "totalbonus" },
					{ text: this.$t("totalWinLoss"), value: "totalwinloss" },
					{ text: this.$t("totalValidBet"), value: "validbet" },
					{ text: this.$t("ip"), value: "regip" },
					{ text: this.$t("noOfIp"), value: "logincount" },
					{ text: this.$t("sourceURL"), value: "ulagentaccount" },
				];
			},
			headerSearch() {
				return [
					{ text: this.$t("registrationTime"), value: "createdate" },
					{ text: this.$t("userId"), value: "playerid" },
					{ text: this.$t("name"), value: "firstname" },
					{
						text: this.$t("levelName"),
						value: "levelName",
						sortable: false,
					},
					{ text: this.$t("totalTopUp"), value: "totaldeposit" },
					{
						text: this.$t("totalTopUpCount"),
						value: "totaldepositcount",
					},
					{ text: this.$t("totalWithdrawal"), value: "totalwithdraw" },
					{
						text: this.$t("totalWithdrawalCount"),
						value: "totalwithdrawcount",
					},
					{ text: this.$t("totalClaimed"), value: "totalbonus" },
					{ text: this.$t("totalWinLoss"), value: "totalwinloss" },
					{ text: this.$t("totalValidBet"), value: "validbet" },
					{ text: this.$t("ip"), value: "regip" },
					{ text: this.$t("noOfIp"), value: "logincount" },
					{ text: this.$t("sourceURL"), value: "ulagentaccount" },
				];
			},
		},
		methods: {
			fixParameters(value) {
				return value ? value : "-";
			},
			removeSpaceAndComma(text) {
				if (text) {
					return text.replace(/[- ]+/g, "");
				} else {
					return text;
				}
			},
			sumField(key) {
				if (this.players.data) {
					return this.players.data.reduce(
						(a, b) => parseFloat(a) + (parseFloat(b[key]) || 0),
						0
					);
				} else {
					return "";
				}
			},
		},
		watch: {
			players() {
				this.loading = false;
			},
		},
	};
</script>
