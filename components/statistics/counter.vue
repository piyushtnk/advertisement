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
											isNullValue(
												statisticsTopUpOverall.overallTotalTopupValue
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
												statisticsTopUpOverall.overallTopupCount
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
												statisticsTopUpOverall.overallTotalTopupCountFromDirectPlayers
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
												statisticsTopUpOverall.overallTotalTopupCountFromAssociatedPlayers
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
											isNullValue(
												statisticsTopUpOverall.overallTotalTopupValueFromDirectPlayers
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
											isNullValue(
												statisticsTopUpOverall.overallTotalTopupValueFromAssociatedPlayers
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
												statisticsTopUpOverall.percentageTopupValueFromDirectPlayers
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
												statisticsTopUpOverall.percentageTopupValueFromFromAssociatedPlayer
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
												statisticsTopUpOverall.totalOverallTopupCountFromBanners
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
											isNullValue(
												statisticsTopUpOverall.totalOverallTopupValueFromBanners
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
											isNullValue(
												statisticsTopUpOverall.overallWithdrawalValue
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalWithdrawal") }}
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
												statisticsTopUpOverall.overallWithdrawalCount
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
												statisticsTopUpOverall.overallWithdrawalCountFromDirectPlayers
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
												statisticsTopUpOverall.overallWithdrawalCountFromAssociatedPlayers
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
											isNullValue(
												statisticsTopUpOverall.overallWithdrawalValueFromDirectPlayers
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
											isNullValue(
												statisticsTopUpOverall.overallWithdrawalValueFromAssociatedPlayers
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalWithdrawalValue") }}
										({{ $t("assPlayers") }})
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
							<v-col cols="12" lg="12" md="12" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="overallLoading"
								>
									<v-card-title class="display-1">
										{{
											isNullValue(
												statisticsTopUpOverall.overallTotalTopupValue -
													statisticsTopUpOverall.overallWithdrawalValue
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("totalProfit") }}
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
	import Global from "~/mixins/global";

	export default {
		name: "CounterComponent",
		mixins: [Global],
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
				statisticsTopUpOverall: "getStatisticsTopUpOverall",
				getStatisticsBannerClicksOverall:
					"getStatisticsBannerClicksOverall",
				ipClients: "getIpClients",
				winLoss: "getWinLoss",
				clicksCountFromPC: "getClicksCountFromPC",
				clicksCountFromMobile: "getClicksCountFromMobile",
			}),
		},
		watch: {
			statisticsCounter() {
				this.$emit("update:statisticsLoading", false);
			},
			statisticsTopUpOverall() {
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
