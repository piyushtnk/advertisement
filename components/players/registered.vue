<template>
	<div>
		<!-- Table Listing -->
		<v-row>
			<v-col cols="12">
				<v-card>
					<v-card-title>
						<v-text-field
							v-model="search"
							append-icon="mdi-magnify"
							label="Search"
							single-line
							hide-details
						></v-text-field>
					</v-card-title>
					<v-card-text>
						<v-data-table
							:headers="headers"
							:items="players"
							item-key="playerId"
							class="elevation-1"
							:search="search"
							show-expand
							single-expand
							item-expanded
						>
							<template v-slot:[`item.firstName`]="{ item }">
								{{
									isNull(item.firstName) +
									" " +
									isNull(item.lastName)
								}}
							</template>

							<template v-slot:expanded-item="{ headers, item }">
								<td :colspan="headers.length">
									<v-row no-gutters>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title>{{
														$t("loginDevice")
													}}</v-list-item-title>
													<v-list-item-subtitle>{{
														fixParameters(
															item.loginDevice
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title>{{
														$t("loginPlatform")
													}}</v-list-item-title>
													<v-list-item-subtitle>{{
														fixParameters(
															item.loginPlatform
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title>{{
														$t("currency")
													}}</v-list-item-title>
													<v-list-item-subtitle>{{
														fixParameters(
															item.currency
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title>{{
														$t("depositAmount")
													}}</v-list-item-title>
													<v-list-item-subtitle>{{
														numberFormat(
															item.depositAmount
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title>{{
														$t("depositAverage")
													}}</v-list-item-title>
													<v-list-item-subtitle>{{
														numberFormat(
															item.depositAverage
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title>{{
														$t("depositCount")
													}}</v-list-item-title>
													<v-list-item-subtitle>{{
														fixParameters(
															item.depositCount
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title>{{
														$t("email")
													}}</v-list-item-title>
													<v-list-item-subtitle>{{
														fixParameters(
															item.email
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title>{{
														$t("firstDepositTime")
													}}</v-list-item-title>
													<v-list-item-subtitle>{{
														fixParameters(
															item.firstDepositTime
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title>{{
														$t(
															"firstWithdrawalTime"
														)
													}}</v-list-item-title>
													<v-list-item-subtitle>{{
														fixParameters(
															item.firstWithdrawalTime
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title>{{
														$t("lastLoginTime")
													}}</v-list-item-title>
													<v-list-item-subtitle>{{
														fixParameters(
															item.lastLoginTime
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title>{{
														$t("totalBonus")
													}}</v-list-item-title>
													<v-list-item-subtitle>{{
														numberFormat(
															item.totalBonus
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title>{{
														$t("totalValidBet")
													}}</v-list-item-title>
													<v-list-item-subtitle>{{
														numberFormat(
															item.validBet
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title>{{
														$t("withdrawAverage")
													}}</v-list-item-title>
													<v-list-item-subtitle>{{
														fixParameters(
															item.withdrawAverage
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title>{{
														$t("agentBy")
													}}</v-list-item-title>
													<v-list-item-subtitle>{{
														fixParameters(
															item.agentAccount
														)
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title>{{
														$t("bannerId")
													}}</v-list-item-title>
													<v-list-item-subtitle>{{
														fixParameters(
															item.firstViewedBannerId
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
	import GlobalMixin from "~/mixins/global";

	export default {
		name: "TableComponent",
		mixins: [Variables, GlobalMixin],
		data() {
			return {
				search: "",
			};
		},
		computed: {
			...mapGetters({
				players: "getRegPlayers",
			}),
			headers() {
				return [
					{ text: this.$t("userId"), value: "playerId" },
					{ text: this.$t("name"), value: "firstName" },
					{ text: this.$t("firstVisitIp"), value: "bannerVisitIp" },
					{
						text: this.$t("firstVisitTime"),
						value: "firstVisitTime",
					},
					{ text: this.$t("firstClickTime"), value: "firstVisitTime" },
					{ text: this.$t("registrationIp"), value: "registrationIp" },
					{
						text: this.$t("registrationDate"),
						value: "registrationDate",
					},
					{ text: this.$t("originSource"), value: "originSource" },

					{ text: this.$t("numberOfVisits"), value: "numberOfVisits" },
				];
			},
		},
		mounted() {
			const bannerId = this.$route.query.bannerId;
			this.$store.dispatch("getRegisteredPlayers", bannerId);
		},
		methods: {},
		watch: {},
	};
</script>
