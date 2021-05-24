<template>
	<div>
		<!-- Chart World -->
		<v-row class="my-5">
			<v-col cols="12">
				<v-card
					class="mx-auto"
					:loading="loading"
					:loader-height="7"
					outlined
				>
					<v-card-text class="headline d-flex">
						<div class="">
							{{ $t("regularPlayers") }} ({{
								regularPlayers.playerCount
							}})
						</div>
						<div class="ml-auto">
							{{ $t("averageTopupCount") }} ({{
								regularPlayers.averageTopupCount
							}})
						</div>
					</v-card-text>

					<v-card-text>
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th>{{ $t("userId") }}</th>
										<th class="text-left">
											{{ $t("name") }}
										</th>
										<th class="text-left">
											{{ $t("depositAvg") }}
										</th>
										<th class="text-left">
											{{ $t("loginCount") }}
										</th>
										<th>{{ $t("loginPlatform") }}</th>
										<th>{{ $t("cashbackBonus") }}</th>
										<th>{{ $t("topUpCount") }}</th>
										<th>{{ $t("totalBetAmount") }}</th>
										<th>{{ $t("totalBonus") }}</th>
										<th>{{ $t("totalDeposit") }}</th>
										<th>{{ $t("totalDepositCount") }}</th>
										<th>{{ $t("totalResult") }}</th>
										<th>{{ $t("totalWinLoss") }}</th>
										<th>{{ $t("totalWithdraw") }}</th>
										<th>{{ $t("totalWithdrawCount") }}</th>
										<th>{{ $t("validBet") }}</th>
										<th>{{ $t("withdrawAvg") }}</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="item in regularPlayers.regularPlayers"
										:key="item.id"
									>
										<td>{{ item.playerid }}</td>
										<td>
											{{
												item.firstname +
												" " +
												item.lastname
											}}
										</td>
										<td>
											{{ numberFormat(item.depositavg) }}
										</td>
										<td>{{ item.logincount }}</td>
										<td>{{ item.loginplatform }}</td>
										<td>
											{{
												numberFormat(item.cashbackbonus)
											}}
										</td>
										<td>{{ item.topupCount }}</td>
										<td>
											{{
												numberFormat(
													item.totalbetamount
												)
											}}
										</td>
										<td>
											{{ numberFormat(item.totalbonus) }}
										</td>
										<td>
											{{
												numberFormat(item.totaldeposit)
											}}
										</td>
										<td>{{ item.totaldepositcount }}</td>
										<td>
											{{ numberFormat(item.totalresult) }}
										</td>
										<td>
											{{
												numberFormat(item.totalwinloss)
											}}
										</td>
										<td>
											{{
												numberFormat(item.totalwithdraw)
											}}
										</td>
										<td>{{ item.totalwithdrawcount }}</td>
										<td>
											{{ numberFormat(item.validbet) }}
										</td>
										<td>
											{{ numberFormat(item.withdrawavg) }}
										</td>
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
	import { mapGetters } from "vuex";

	export default {
		name: "RegularPlayersComponent",
		data() {
			return {
				loading: false,
			};
		},
		props: {
			date: {
				type: Array,
			},
		},
		created() {},
		mounted() {},
		methods: {},
		computed: {
			...mapGetters({
				regularPlayers: "getRegularPlayers",
			}),
		},
		watch: {},
	};
</script>