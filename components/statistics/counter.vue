<template>
	<div>
		<!-- Finance Details - Deposit -->
		<v-row>
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-card class="mx-auto" elevation="2">
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
									:loading="statistics2Loading"
								>
									<v-card-title class="display-1">
										{{
											isNullValue(
												statistics2.overallTotalTopupValue
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("overallTotalTopUpValue") }}
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="statistics2Loading"
								>
									<v-card-title class="display-1">
										{{
											isNull(
												statistics2.overallTopupCount
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("overallTopUpCount") }}
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="statistics2Loading"
								>
									<v-card-title class="display-1">
										{{
											isNull(
												statistics2.overallTopupCountFromBanners
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("overallTopUpCountFromBanners") }}
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="statistics2Loading"
								>
									<v-card-title class="display-1">
										{{
											isNullValue(
												statistics2.overallTotalTopupValueFromBanners
											)
										}}
									</v-card-title>
									<v-card-text>
										{{
											$t(
												"overallTotalTopUpValueFromBanners"
											)
										}}
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
									:loading="statistics2Loading"
								>
									<v-card-title class="display-1">
										{{
											isNullValue(
												statistics2.overallWithdrawalValue
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("overallTotalWithdrawalValue") }}
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="statistics2Loading"
								>
									<v-card-title class="display-1">
										{{
											isNull(
												statistics2.overallWithdrawalCount
											)
										}}
									</v-card-title>
									<v-card-text>
										{{ $t("overallTotalWithdrawalCount") }}
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="statistics2Loading"
								>
									<v-card-title class="display-1">
										{{
											isNull(
												statistics2.overallWithdrawalCountFromBanners
											)
										}}
									</v-card-title>
									<v-card-text>
										{{
											$t(
												"overallWithdrawalCountFromBanner"
											)
										}}
									</v-card-text>
								</v-card>
							</v-col>
							<v-col cols="12" lg="3" md="3" sm="12">
								<v-card
									class="mx-auto"
									outlined
									:loading="statistics2Loading"
								>
									<v-card-title class="display-1">
										{{
											isNullValue(
												statistics2.overallWithdrawalValueFromBanners
											)
										}}
									</v-card-title>
									<v-card-text>
										{{
											$t(
												"overallWithdrawalValueFromBanner"
											)
										}}
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
									:loading="statistics2Loading"
								>
									<v-card-title class="display-1">
										{{
											isNullValue(
												statistics2.overallTotalTopupValue -
													statistics2.overallWithdrawalValue
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
		<v-card class="mx-auto mt-5" elevation="2">
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
								{{ isNull(statistics.allClients) }}
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
								{{ isNull(statistics.uniqueClients) }}
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
									isNull(
										statistics.registeredPlayersThroughBanners
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
									isNull(
										statistics.topupPlayersCountFromAllSources
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
								{{ isNull(statistics.clientsFromPcCount) }}
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
								{{ isNull(statistics.clientsFromMobileCount) }}
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
								{{ isNull(ipClients.total) }}
							</v-card-title>
							<v-card-text>
								{{ $t("bannerViewers") }}
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

		<!-- Table for Browser and OS -->
		<v-row class="mt-5">
			<v-col cols="12" lg="6" md="6" sm="12">
				<v-card :loading="statistics2Loading">
					<v-card-title class="subheading font-weight-bold">
						{{ $t("fromBrowser") }}
					</v-card-title>
					<v-card-text>
						<v-simple-table @click="alert('okay')">
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Browser</th>
										<th class="text-left">
											{{ $t("clicks") }}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="item in statisticsOsAndBrowser.browser"
										:key="item.key"
										@click="
											goToClientTablePageWithBrowserParam(
												item.browserType
											)
										"
									>
										<td>
											{{
												$t(
													item.browserType.replace(
														/\s+/g,
														""
													)
												)
											}}
										</td>
										<td>{{ item.count }}</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" lg="6" md="6" sm="12">
				<v-card :loading="statistics2Loading">
					<v-card-title class="subheading font-weight-bold">
						{{ $t("fromOS") }}
					</v-card-title>
					<v-card-text>
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">OS</th>
										<th class="text-left">
											{{ $t("clicks") }}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="item in statisticsOsAndBrowser.os"
										:key="item.key"
										@click="
											goToClientTablePageWithOsParam(
												item.osType
											)
										"
									>
										<td>
											{{
												$t(
													item.osType
														.replace(/\s+/g, "")
														.split(".")
														.join("")
												)
											}}
										</td>
										<td>{{ item.count }}</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<!-- Top 5 Banner listing -->
		<v-row class="mt-5">
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-card
					class="mx-auto mt-5"
					outlined
					:loading="statisticsLoading"
				>
					<v-card-title class="display-1">
						{{ $t("topRecentBannersPer") }}
					</v-card-title>
					<v-card-text>
						<v-simple-table fixed-header dense>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">
											{{ $t("image") }}
										</th>
										<th class="text-left">
											{{ $t("origin") }}
										</th>
										<th class="text-left">
											{{ $t("destinationURL") }}
										</th>
										<th class="text-left">
											{{ $t("clicks") }}
										</th>
										<th class="text-left">
											{{ $t("createdAt") }}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="item in statistics.topBanners"
										:key="item.uniqueId"
									>
										<td class="pa-2">
											<a
												:href="
													getImage(
														item.uniqueId,
														item.imageType
													)
												"
												target="_blank"
											>
												<v-img
													:src="
														getImage(
															item.uniqueId,
															item.imageType
														)
													"
													:lazy-src="
														getImage(
															item.uniqueId,
															item.imageType
														)
													"
													class="grey lighten-2"
													width="200"
													height="100"
												>
													<template
														v-slot:placeholder
													>
														<v-row
															class="fill-height ma-0"
															align="center"
															justify="center"
														>
															<v-progress-circular
																indeterminate
																color="grey lighten-5"
															></v-progress-circular>
														</v-row>
													</template>
												</v-img>
											</a>
										</td>
										<td>
											{{
												item.comment
													? item.comment
													: "No Info Provided"
											}}
										</td>
										<td>
											<a
												:href="item.redirectUrl"
												target="_blank"
											>
												{{ item.redirectUrl }}
											</a>
										</td>
										<td>
											<v-chip
												outlined
												class="ma-2"
												color="green"
												:to="
													'/system/clients?bannerId=' +
													item.id +
													'&filterType=' +
													defaultFilterDateProps
												"
											>
												{{ item.count }}
											</v-chip>
										</td>
										<td>{{ item.createdAt }}</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
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
			statistics2Loading: {
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
		mounted() {
			this.$store.dispatch("getIpClients", {
				duration: 1,
				sort: "id|desc",
				limit: 1,
				page: 1,
			});
		},
		computed: {
			...mapGetters({
				statisticsOsAndBrowser: "getStatisticsOfOsAndBrowser",
				statistics: "getStatistics",
				statistics2: "getStatistics2",
				ipClients: "getIpClients",
			}),
		},
		watch: {
			statistics() {
				this.$emit("update:statisticsLoading", false);
			},
			statistics2() {
				this.$emit("update:statistics2Loading", false);
			},
			ipClients() {
				this.$emit("update:ipClientsLoading", false);
			},
		},
		methods: {
			...mapActions(["getIpClients"]),
			getRealPercentage(value) {
				let number = value * 100;
				return Number.parseFloat(number).toPrecision(2) + "%";
			},
			getImage(imageName, imageType) {
				return `${process.env.CLOUD_URL}/banner/${imageName}.${imageType}`;
			},
			isNull(value) {
				if (value == null) {
					return 0;
				} else {
					return this.numberFormat(parseFloat(value.toFixed(2)));
				}
			},
			isNullValue(value) {
				if (value == null) {
					return 0;
				} else {
					value = value * 1000;
					return this.numberFormat(parseFloat(value.toFixed(2)));
				}
			},
			goToClientTablePageWithBrowserParam(value) {
				this.$router.replace(
					"/system/clients?browser=" +
						value +
						"&filterType=" +
						this.defaultFilterDateProps
				);
			},
			goToClientTablePageWithOsParam(value) {
				this.$router.replace(
					"/system/clients?os=" +
						value +
						"&filterType=" +
						this.defaultFilterDateProps
				);
			},
		},
	};
</script>

<style scoped>
	tr {
		cursor: pointer;
	}
</style>
