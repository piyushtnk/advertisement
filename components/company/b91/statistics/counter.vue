<template>
	<div>
		<!-- Finance Details - Deposit -->
		<v-row>
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-card class="mx-auto" elevation="2" outlined>
					<v-list-item two-line>
						<v-list-item-content>
							<div class="overline">
								{{ $t("financeDetailedInformation") }}
							</div>
						</v-list-item-content>
					</v-list-item>

					<v-card-text>
						<!-- Deposit Information -->
						<v-row>
							<v-col cols="12" lg="12" md="12" sm="12">
								<div class="transition-swing text-h6">
									{{ $t("depositInformation") }}
								</div>
							</v-col>
						</v-row>
						<v-row class="">
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.topup
													.overallTotalTopupValue
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalDeposit") }}
										({{ $t("allSources") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.topup
													.overallTotalTopupCount
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("depositCount") }}
										({{ $t("allSources") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.topup
													.overallTotalTopupCountFromDirectPlayers
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalTopUpCount") }}
										({{ $t("directPlayers") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.topup
													.overallTotalTopupCountFromAssociatedPlayers
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalTopUpCount") }}
										({{ $t("assPlayers") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.topup
													.overallTotalTopupValueFromDirectPlayers
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalTopUpValue") }}
										({{ $t("directPlayers") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.topup
													.overallTotalTopupValueFromAssociatedPlayers
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalTopUpValue") }}
										({{ $t("assPlayers") }})
									</v-card-text>
								</v-card>
							</v-col>

							<!-- Extra fields -->
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNull(
												statisticsCashOverall.percentage
													.percentageTopupValueFromDirectPlayers
											)
										}}%
									</v-card-title>
									<v-card-text>
										{{ $t("topUpValue") }}
										({{ $t("directPlayers") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNull(
												statisticsCashOverall.percentage
													.percentageTopupValueFromAssociatedPlayer
											)
										}}%
									</v-card-title>
									<v-card-text>
										{{ $t("topUpValue") }}
										({{ $t("assPlayers") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNull(
												statisticsCashOverall.percentage
													.percentageTotalTopupValueFromBanners
											)
										}}%
									</v-card-title>
									<v-card-text>
										{{ $t("topUpValue") }}
										({{ $t("fromBanners") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNull(
												statisticsCashOverall.topup
													.totalOverallTopupCountFromBanners
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("overallTopUpCount") }}
										({{ $t("fromBanners") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.topup
													.totalOverallTopupValueFromBanners
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("overall") }}
										{{ $t("topUpValue") }}
										({{ $t("fromBanners") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.topup
													.totalOverallTopupValueFromOtherSources
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("overall") }}
										{{ $t("topUpValue") }}
										({{ $t("otherSources") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.topup
													.totalOverallTopupCountFromOtherSources
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("overall") }}
										{{ $t("topUpValue") }}
										({{ $t("otherSources") }})
									</v-card-text>
								</v-card>
							</v-col>
						</v-row>

						<!-- Withdrawal Information -->
						<v-row class="mt-5">
							<v-col cols="12" lg="12" md="12" sm="12">
								<div class="transition-swing text-h6">
									{{ $t("withdrawalInformation") }}
								</div>
							</v-col>
						</v-row>
						<v-row class="">
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.withdrawal
													.overallTotalWithdrawalCount
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("withdrawalCount") }}
										({{ $t("allSources") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.withdrawal
													.overallTotalWithdrawalValue
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalWithdrawalValue") }}
										({{ $t("allSources") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.withdrawal
													.overallWithdrawalCountFromDirectPlayers
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalWithdrawalCount") }}
										({{ $t("directPlayers") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.withdrawal
													.overallWithdrawalCountFromAssociatedPlayers
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalWithdrawalCount") }}
										({{ $t("assPlayers") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.withdrawal
													.overallWithdrawalValueFromDirectPlayers
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalWithdrawalValue") }}
										({{ $t("directPlayers") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.withdrawal
													.overallWithdrawalValueFromAssociatedPlayers
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalWithdrawalValue") }}
										({{ $t("assPlayers") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.withdrawal
													.totalOverallWithdrawalValueFromBanners
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalWithdrawalValue") }}
										({{ $t("fromBanners") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.withdrawal
													.totalOverallWithdrawalCountFromBanners
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("withdrawalCount") }}
										({{ $t("fromBanners") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNull(
												statisticsCashOverall.percentage
													.percentageWithdrawalValueFromDirectPlayers
											)
										}}%
									</v-card-title>
									<v-card-text>
										{{ $t("totalWithdrawal") }}
										({{ $t("directPlayers") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNull(
												statisticsCashOverall.percentage
													.percentageWithdrawalValueFromAssociatedPlayer
											)
										}}%
									</v-card-title>
									<v-card-text>
										{{ $t("totalWithdrawalValue") }}
										({{ $t("assPlayers") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNull(
												statisticsCashOverall.percentage
													.percentageTotalWithdrawalValueFromBanners
											)
										}}%
									</v-card-title>
									<v-card-text>
										{{ $t("totalWithdrawalValue") }}
										({{ $t("fromBanners") }})
									</v-card-text>
								</v-card>
							</v-col>
						</v-row>

						<!-- Profit -->
						<v-row class="mt-5">
							<v-col cols="12" lg="12" md="12" sm="12">
								<div class="transition-swing text-h6">
									{{ $t("profitInformation") }}
								</div>
							</v-col>
						</v-row>
						<v-row class="">
							<v-col cols="12" lg="2" md="2" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.profit
													.overallProfitFromBanners
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalProfit") }}
										({{ $t("fromBanners") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.profit
													.overallProfitFromOtherSources
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalProfit") }}
										({{ $t("otherSources") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												statisticsCashOverall.profit
													.overallProfitFromAllSources
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalProfit") }}
										({{ $t("allSources") }})
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="2" md="2" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullNumber(
												convertToVND(validBet - winLoss)
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("ggr") }}
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="2" md="2" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											(
												(validBet - winLoss) /
												validBet
											).toFixed(2)
										}}%
									</v-card-title>
									<v-card-text>
										{{ $t("houseEdge") }}
									</v-card-text>
								</v-card>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<!-- PC AND Mobile -->
		<v-card class="mx-auto mt-5" elevation="2" outlined>
			<v-card-text>
				<v-row>
					<v-col cols="12" lg="4" md="4" sm="12">
						<v-card
							class="mx-auto mt-5"
							outlined
							:loading="statisticsLoading"
							:to="
								'/system/clients?filterType=' +
								defaultFilterDateProps
							"
						>
							<v-card-title class="display-1">
								{{
									isNullNumber(
										getStatisticsBannerClicksOverall.allClients
									)
								}}
							</v-card-title>
							<v-card-text>
								{{ $t("overallClicksOnBanners") }}
							</v-card-text>
						</v-card>
					</v-col>

					<v-col cols="12" lg="4" md="4" sm="12">
						<v-card
							class="mx-auto mt-5"
							outlined
							:loading="statisticsLoading"
							:to="
								'/system/clients?unique=true&filterType=' +
								defaultFilterDateProps
							"
						>
							<v-card-title class="display-1">
								{{
									isNullNumber(
										getStatisticsBannerClicksOverall.uniqueClients
									)
								}}
							</v-card-title>
							<v-card-text>
								{{ $t("uniqueClicksOnBanners") }}
							</v-card-text>
						</v-card>
					</v-col>

					<v-col cols="12" lg="4" md="4" sm="12">
						<v-card
							class="mx-auto mt-5"
							outlined
							:loading="statisticsLoading"
							:to="
								'/system/players?filterType=' +
								defaultFilterDateProps
							"
						>
							<v-card-title class="display-1">
								{{
									isNullNumber(
										statisticsCounter.registeredPlayersThroughBanners
									)
								}}
							</v-card-title>
							<v-card-text>
								{{ $t("regPlayersFromBanners") }}
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>

				<!-- Registered players, Top-up players and Unique clients  -->
				<v-row>
					<v-col cols="12" lg="4" md="4" sm="12">
						<v-card
							class="mx-auto mt-5"
							outlined
							:loading="statisticsLoading"
							:to="
								'/system/players?topUp=true&filterType=' +
								defaultFilterDateProps
							"
						>
							<v-card-title class="display-1">
								{{
									isNullNumber(
										statisticsCounter.topupPlayersCountFromAllSources
									)
								}}
							</v-card-title>
							<v-card-text>
								{{ $t("topPlayersFromAllSources") }}
							</v-card-text>
						</v-card>
					</v-col>
					<v-col cols="12" lg="4" md="4" sm="12">
						<v-card
							class="mx-auto mt-5"
							outlined
							:loading="statisticsLoading"
							:to="
								'/system/clients?unique=true&device=pc&filterType=' +
								defaultFilterDateProps
							"
						>
							<v-card-title class="display-1">
								{{
									isNullNumber(
										clicksCountFromPC.clicksCountFromPc
									)
								}}
							</v-card-title>
							<v-card-text
								>{{ $t("uniqueBannerClicksFromPC") }}
							</v-card-text>
						</v-card>
					</v-col>
					<v-col cols="12" lg="4" md="4" sm="12">
						<v-card
							class="mx-auto mt-5"
							outlined
							:loading="statisticsLoading"
							:to="
								'/system/clients?unique=true&device=smartphone&filterType=' +
								defaultFilterDateProps
							"
						>
							<v-card-title class="display-1">
								{{
									isNullNumber(
										clicksCountFromMobile.clicksCountFromMobile
									)
								}}
							</v-card-title>
							<v-card-text>
								{{ $t("uniqueBannerClicksFromMobile") }}
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>

				<!-- IP 2 -->
				<v-row>
					<v-col cols="12" lg="4" md="4" sm="12">
						<v-card
							class="mx-auto mt-5"
							outlined
							:loading="ipClientsLoading"
							:to="
								'/system/ip?filterType=' +
								defaultFilterDateProps
							"
						>
							<v-card-title class="display-1">
								{{ isNullNumber(ipClients.total) }}
							</v-card-title>
							<v-card-text>
								{{ $t("bannerViewers") }}
							</v-card-text>
						</v-card>
					</v-col>

					<v-col cols="12" lg="4" md="4" sm="12">
						<v-card
							class="mx-auto mt-5"
							outlined
							:loading="statisticsLoading"
						>
							<v-card-title class="display-1">
								{{ isNullNumber(winLoss) }}
							</v-card-title>
							<v-card-text>
								{{ $t("winLoss") }}
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "CounterComponent",
		data() {
			return {};
		},
		props: {
			defaultFilterDateProps: {
				type: Number,
			},
			overallLoading: {
				type: Boolean,
				default: false,
			},
			statisticsLoading: {
				type: Boolean,
				default: false,
			},
			ipClientsLoading: {
				type: Boolean,
				default: false,
			},
		},
		mounted() {},
		computed: {
			...mapGetters({
				statisticsCounter: "getStatisticsCounter",
				statisticsCashOverall: "getStatisticsTopUpOverall",
				getStatisticsBannerClicksOverall:
					"getStatisticsBannerClicksOverall",
				ipClients: "getIpClients",
				winLoss: "getWinLoss",
				clicksCountFromPC: "getClicksCountFromPC",
				clicksCountFromMobile: "getClicksCountFromMobile",
				validBet: "getValidBet",
			}),
		},
		watch: {
			statisticsCounter() {
				this.$emit("update:statisticsLoading", false);
			},
			statisticsCashOverall() {
				this.$emit("update:overallLoading", false);
			},
			ipClients() {
				this.$emit("update:ipClientsLoading", false);
			},
		},
		methods: {
			getRealPercentage(value) {
				let number = value * 100;
				return Number.parseFloat(number).toPrecision(2) + "%";
			},
			getImage(imageName, imageType) {
				return `${process.env.CLOUD_URL}/banner/${imageName}.${imageType}`;
			},
		},
	};
</script>

<style scoped>
	tr {
		cursor: pointer;
	}
</style>
