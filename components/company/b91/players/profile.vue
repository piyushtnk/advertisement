<template>
	<div>
		<v-row class="my-3">
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-row>
					<!-- Profile -->
					<v-col cols="12">
						<v-card outlined>
							<v-card-text>
								<span>{{ $t("information") }}</span>
								<v-row>
									<v-col cols="12">
										<div
											class="text-h1 transition-swing"
											v-text="playerInfo.info.playerid"
										></div>
									</v-col>
									<v-col cols="12">
										<v-simple-table dense>
											<template v-slot:default>
												<tbody>
													<tr>
														<td class="text-right">
															{{ $t("userId") }}
														</td>
														<td>
															{{
																playerInfo.info
																	.playerid
															}}
														</td>
													</tr>
													<tr>
														<td class="text-right">
															{{ $t("regIp") }}
														</td>
														<td>
															{{
																playerInfo.info
																	.regip
															}}
														</td>
													</tr>
													<tr>
														<td class="text-right">
															{{
																$t("depositAvg")
															}}
														</td>
														<td>
															{{
																staticNumberFormat(
																	playerInfo
																		.info
																		.depositavg
																)
															}}
														</td>
													</tr>
													<tr>
														<td class="text-right">
															{{
																$t(
																	"withdrawAvg"
																)
															}}
														</td>
														<td>
															{{
																staticNumberFormat(
																	playerInfo
																		.info
																		.withdrawavg
																)
															}}
														</td>
													</tr>
													<tr>
														<td class="text-right">
															{{
																$t(
																	"cashbackBonus"
																)
															}}
														</td>
														<td>
															{{
																staticNumberFormat(
																	playerInfo
																		.info
																		.depositbonus
																)
															}}
														</td>
													</tr>
													<tr>
														<td class="text-right">
															{{
																$t(
																	"totalBetAmount"
																)
															}}
														</td>
														<td>
															{{
																staticNumberFormat(
																	playerInfo
																		.info
																		.totalbetamount
																)
															}}
														</td>
													</tr>
													<tr>
														<td class="text-right">
															{{
																$t("totalBonus")
															}}
														</td>
														<td>
															{{
																staticNumberFormat(
																	playerInfo
																		.info
																		.totalbonus
																)
															}}
														</td>
													</tr>
													<tr>
														<td class="text-right">
															{{
																$t(
																	"totalDeposit"
																)
															}}
														</td>
														<td>
															{{
																staticNumberFormat(
																	playerInfo
																		.info
																		.totaldeposit
																)
															}}
														</td>
													</tr>
													<tr>
														<td class="text-right">
															{{
																$t(
																	"totalDepositCount"
																)
															}}
														</td>
														<td>
															{{
																staticNumberFormat(
																	playerInfo
																		.info
																		.totaldepositcount
																)
															}}
														</td>
													</tr>
													<tr>
														<td class="text-right">
															{{
																$t(
																	"totalResult"
																)
															}}
														</td>
														<td>
															{{
																staticNumberFormat(
																	playerInfo
																		.info
																		.totalresult
																)
															}}
														</td>
													</tr>
													<tr>
														<td class="text-right">
															{{
																$t(
																	"totalWinLoss"
																)
															}}
														</td>
														<td>
															{{
																staticNumberFormat(
																	playerInfo
																		.info
																		.totalwinloss
																)
															}}
														</td>
													</tr>
													<tr>
														<td class="text-right">
															{{
																$t(
																	"totalWithdraw"
																)
															}}
														</td>
														<td>
															{{
																staticNumberFormat(
																	playerInfo
																		.info
																		.totalwithdraw
																)
															}}
														</td>
													</tr>
													<tr>
														<td class="text-right">
															{{
																$t(
																	"totalWithdrawCount"
																)
															}}
														</td>
														<td>
															{{
																staticNumberFormat(
																	playerInfo
																		.info
																		.totalwithdrawcount
																)
															}}
														</td>
													</tr>
													<tr>
														<td class="text-right">
															{{ $t("validBet") }}
														</td>
														<td>
															{{
																staticNumberFormat(
																	playerInfo
																		.info
																		.validbet
																)
															}}
														</td>
													</tr>
												</tbody>
											</template>
										</v-simple-table>
									</v-col>
								</v-row>
							</v-card-text>
						</v-card>
					</v-col>

					<!-- Login IP Pool Table Listing -->
					<v-col cols="12">
						<v-card outlined>
							<v-card-title>
								<v-row>
									<v-col cols="4">
										{{ $t("loginIpPool") }}
									</v-col>
									<v-col cols="4" offset-lg="4">
										<v-text-field
											v-model="searchIPPool"
											append-icon="mdi-magnify"
											label="Search"
											single-line
											hide-details
										></v-text-field>
									</v-col>
								</v-row>
							</v-card-title>
							<v-card-text>
								<v-data-table
									dense
									:headers="headersIPPool"
									:items="playerInfo.loginip.loginIpPool"
									:search="searchIPPool"
									item-key="logintime"
								>
									<template
										v-slot:[`item.logintime`]="{ item }"
									>
										{{
											$moment(item.logintime).format(
												"YYYY-MM-DD HH:mm:ss"
											)
										}}
									</template>
								</v-data-table>
							</v-card-text>
						</v-card>
					</v-col>

					<!-- Unique login IP pool -->
					<v-col cols="12">
						<v-card outlined>
							<v-card-title>
								<v-row>
									<v-col cols="4">
										{{ $t("uniqueLoginIpPool") }}
									</v-col>
									<v-col cols="4" offset-lg="4">
										<v-text-field
											v-model="searchIPPool"
											append-icon="mdi-magnify"
											label="Search"
											single-line
											hide-details
										></v-text-field>
									</v-col>
								</v-row>
							</v-card-title>
							<v-card-text>
								<v-data-table
									dense
									:headers="headersIPPool"
									:items="uniqueIpPool"
									:search="searchIPPool"
									item-key="logintime"
								>
									<template
										v-slot:[`item.logintime`]="{ item }"
									>
										{{
											$moment(item.logintime).format(
												"YYYY-MM-DD HH:mm:ss"
											)
										}}
									</template>
								</v-data-table>
							</v-card-text>
						</v-card>
					</v-col>

					<!-- Views -->
					<v-col cols="12">
						<SimpleDataTable
							:headers="headersViews"
							:items="playerInfo.views.bannerViews"
							:item-key="'id'"
							:label="$t('viewedBanners')"
						/>
					</v-col>

					<!-- Clicks -->
					<v-col cols="12">
						<SimpleDataTable
							:headers="headersClicks"
							:items="playerInfo.clicks.bannerClicks"
							:item-key="'cId'"
							:label="$t('clickedBanners')"
						/>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import Global from "~/mixins/global";
	import { mapGetters } from "vuex";

	export default {
		name: "ProfileComponent",
		mixins: [Global],
		data() {
			return {
				loading: false,
				searchIPPool: "",
			};
		},
		computed: {
			...mapGetters({
				playerInfo: "getPlayerInfo",
			}),
			headersIPPool() {
				return [
					{ text: this.$t("ip"), value: "ip" },
					{ text: this.$t("city"), value: "city" },
					{ text: this.$t("country"), value: "country" },
					{ text: this.$t("createdAt"), value: "logintime" },
				];
			},
			headersViews() {
				return [
					{ text: this.$t("bannerId"), value: "bannerid" },
					{ text: this.$t("advertisementSource"), value: "bannerSource" },
					{ text: this.$t("ip"), value: "ip" },
					{ text: this.$t("city"), value: "city" },
					{ text: this.$t("country"), value: "country" },
					{ text: this.$t("createdAt"), value: "createdAt" },
				];
			},
			headersClicks() {
				return [
					{ text: this.$t("bannerId"), value: "cBannerId" },
					{ text: this.$t("advertisementSource"), value: "bannerSource" },
					{ text: this.$t("ip"), value: "cIp" },
					{ text: this.$t("origin"), value: "cOrigin" },
					{ text: this.$t("device"), value: "cOs" },
					{ text: this.$t("createdAt"), value: "createdAt" },
				];
			},
			uniqueIpPool() {
				return this.findUniqueObjectFromArray(
					this.playerInfo.loginip.loginIpPool,
					"ip"
				);
			},
		},
		methods: {},
		watch: {
			playerInfo(v) {
				this.loading = false;
			},
		},
	};
</script>
