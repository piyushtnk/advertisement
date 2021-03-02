<template>
	<div>
		<!-- Table Listing -->
		<v-row>
			<v-col cols="12">
				<v-card>
					<v-card-text>
						<v-data-table
							:headers="headers"
							:items="players"
							item-key="id"
							class="elevation-1"
							:search="search"
							show-expand
							single-expand
							item-expanded
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
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Total Bet Count
														ID</v-list-item-title
													>
													<v-list-item-subtitle>{{
														fixParameters(
															item.totalBetCount
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
		name: "TableComponent",
		mixins: [Variables],
		data() {
			return {
				search: "",
				calories: "",
			};
		},
		computed: {
			...mapGetters({
				players: "getRegPlayers",
			}),
			headers() {
				return [
					{ text: this.$t("userId"), value: "playerid" },
					{ text: this.$t("name"), value: "firstname" },
					{ text: this.$t("mobile"), value: "mobile" },
					{ text: this.$t("registrationTime"), value: "createdate" },
					{ text: this.$t("ip"), value: "regip" },
					{ text: this.$t("device"), value: "logindevice" },
					{ text: this.$t("sourceURL"), value: "ulagentaccount" },
					{ text: this.$t("totalTopUp"), value: "depositAmount" },
					{
						text: this.$t("totalTopUpCount"),
						value: "depositCount",
					},
					{ text: this.$t("totalWithdrawal"), value: "totalwithdraw" },
					{
						text: this.$t("totalWithdrawalCount"),
						value: "totalwithdrawcount",
					},
					{ text: this.$t("totalClaimed"), value: "totalbonus" },
					{ text: this.$t("totalWinLoss"), value: "totalwinloss" },
					{ text: this.$t("totalValidBet"), value: "validbet" },
					{ text: this.$t("country"), value: "country" },
					// { text: "Language", value: "language" },
					{ text: this.$t("noOfIp"), value: "logincount" },
				];
			},
		},
		mounted() {
			const bannerId = this.$route.query.bannerId;
			this.$store.dispatch("getRegisteredPlayers", bannerId);
		},
		methods: {
			fixParameters(value) {
				return value ? value : "-";
			},
		},
		watch: {},
	};
</script>
