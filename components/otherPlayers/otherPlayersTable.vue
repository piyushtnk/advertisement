<template>
	<div>
		<!-- Filter Area -->
		<v-card class="my-5">
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
									label="Specific date's data"
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
									Cancel
								</v-btn>
								<v-btn
									text
									color="primary"
									@click="$refs.dialog.save(date)"
								>
									OK
								</v-btn>
							</v-date-picker>
						</v-dialog>
					</v-col>
					<v-col cols="12" lg="2" md="3" sm="12">
						<v-select
							v-model="defaultFilterDate"
							:items="filterDate"
							item-value="state"
							item-text="abbr"
							label="Filter Type"
						/>
					</v-col>
					<v-col cols="12" lg="2" md="3" sm="12">
						<v-select
							v-model="search.column"
							:items="headers"
							item-value="value"
							item-text="text"
							label="Column Name"
						/>
					</v-col>
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-text-field
							v-model="search.value"
							label="Search Text"
							required
						></v-text-field>
					</v-col>
					<v-col cols="12" lg="1" md="3" sm="12">
						<v-btn
							color="blue"
							class="white--text mx-auto"
							@click="beforeSearchMiddleware"
							block
							:loading="loading"
						>
							Search
							<v-icon right dark> mdi-account-search </v-icon>
						</v-btn>
					</v-col>
					<v-col cols="12" lg="1" md="3" sm="12">
						<v-btn
							color="red"
							class="white--text"
							@click="clearSearchFilter"
							block
							:loading="loading"
						>
							Clear
							<v-icon right dark> mdi-trash-can </v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

		<!-- Table Listing -->
		<v-row>
			<v-col cols="12">
				<v-card>
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
						>
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
														>UL Agent
														Account</v-list-item-title
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

	export default {
		name: "OtherPlayersTableComponent",
		mixins: [Variables],
		data() {
			return {
				headers: [
					{ text: "User ID", value: "playerid" },
					{ text: "Name", value: "firstname" },
					{ text: "Mobile", value: "mobile" },
					{ text: "Registration Time", value: "createdate" },
					{ text: "IP", value: "regip" },
					{ text: "Device", value: "logindevice" },
					{ text: "Source URL", value: "ulagentaccount" },
					{ text: "Total Top-up", value: "totaldeposit" },
					{ text: "Total Top-up Count", value: "totaldepositcount" },
					{ text: "Total Withdrawal", value: "totalwithdraw" },
					{ text: "Total Withdrawal Count", value: "totalwithdrawcount" },
					{ text: "Total Claimed", value: "totalbonus" },
					{ text: "Total Win/Lose", value: "totalwinloss" },
					{ text: "Total Valid Bet", value: "validbet" },
					{ text: "Country", value: "country" },
					// { text: "Language", value: "language" },
					{ text: "No. of IP", value: "logincount" },
				],
				sortBy: "id|desc",
			};
		},
		computed: {
			...mapGetters({
				players: "getOtherPlayers",
			}),
		},
		methods: {
			fixParameters(value) {
				return value ? value : "-";
			},
		},
		watch: {
			players() {
				this.loading = false;
			},
		},
	};
</script>
