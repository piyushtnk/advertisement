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
					<v-card-text class="headline">
						<div class="d-flex mx-3">
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
						</div>

						<!-- Table -->
						<v-data-table
							:headers="headers"
							item-key="id"
							:items="regularPlayers.regularPlayers"
							class="elevation-1 mt-5"
							@click:row="handleClick"
						>
							<template v-slot:[`item.firstName`]="{ item }">
								{{
									isNull(item.firstname) +
									" " +
									isNull(item.lastname)
								}}
							</template>
							<template v-slot:[`item.depositavg`]="{ item }">
								{{ numberFormat(item.depositavg) }}
							</template>
							<template v-slot:[`item.cashbackbonus`]="{ item }">
								{{ numberFormat(item.cashbackbonus) }}
							</template>
							<template v-slot:[`item.totalbetamount`]="{ item }">
								{{ numberFormat(item.totalbetamount) }}
							</template>
							<template v-slot:[`item.totalbonus`]="{ item }">
								{{ numberFormat(item.totalbonus) }}
							</template>
							<template v-slot:[`item.totaldeposit`]="{ item }">
								{{ numberFormat(item.totaldeposit) }}
							</template>
							<template v-slot:[`item.totalresult`]="{ item }">
								{{ numberFormat(item.totalresult) }}
							</template>
							<template v-slot:[`item.totalwinloss`]="{ item }">
								{{ numberFormat(item.totalwinloss) }}
							</template>
							<template v-slot:[`item.totalwithdraw`]="{ item }">
								{{ numberFormat(item.totalwithdraw) }}
							</template>
							<template v-slot:[`item.validbet`]="{ item }">
								{{ numberFormat(item.validbet) }}
							</template>
							<template v-slot:[`item.withdrawavg`]="{ item }">
								{{ numberFormat(item.withdrawavg) }}
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
		methods: {
			// On row click
			handleClick(row) {
				this.$router.push(
					this.localePath(`/system/company/b91/players/${row.playerid}`)
				);
			},
		},
		computed: {
			...mapGetters({
				regularPlayers: "getRegularPlayers",
			}),
			headers() {
				return [
					{ text: this.$t("userId"), value: "playerid" },
					{ text: this.$t("name"), value: "firstname" },
					{ text: this.$t("depositAvg"), value: "depositavg" },
					{
						text: this.$t("loginCount"),
						value: "logincount",
					},
					{ text: this.$t("loginPlatform"), value: "loginplatform" },
					{ text: this.$t("cashbackBonus"), value: "cashbackbonus" },
					{
						text: this.$t("topUpCount"),
						value: "topupCount",
					},
					{ text: this.$t("totalBetAmount"), value: "totalbetamount" },
					{
						text: this.$t("totalBonus"),
						value: "totalbonus",
					},
					{ text: this.$t("totalDeposit"), value: "totaldeposit" },
					{
						text: this.$t("totalDepositCount"),
						value: "totaldepositcount",
					},
					{ text: this.$t("totalResult"), value: "totalresult" },
					{ text: this.$t("totalWinLoss"), value: "totalwinloss" },
					{ text: this.$t("totalWithdraw"), value: "totalwithdraw" },
					{
						text: this.$t("totalWithdrawCount"),
						value: "totalwithdrawcount",
					},
					{ text: this.$t("validBet"), value: "validbet" },
					{ text: this.$t("withdrawAvg"), value: "withdrawavg" },
				];
			},
			headerSearch() {
				return [
					{ text: this.$t("userId"), value: "playerid" },
					{ text: this.$t("name"), value: "firstname" },
					{ text: this.$t("depositAvg"), value: "depositavg" },
					{
						text: this.$t("loginCount"),
						value: "logincount",
					},
					{ text: this.$t("loginPlatform"), value: "loginplatform" },
					{ text: this.$t("cashbackBonus"), value: "cashbackbonus" },
					{
						text: this.$t("topUpCount"),
						value: "topupCount",
					},
					{ text: this.$t("totalBetAmount"), value: "totalbetamount" },
					{
						text: this.$t("totalBonus"),
						value: "totalbonus",
					},
					{ text: this.$t("totalDeposit"), value: "totaldeposit" },
					{
						text: this.$t("totalDepositCount"),
						value: "totaldepositcount",
					},
					{ text: this.$t("totalResult"), value: "totalresult" },
					{ text: this.$t("totalWinLoss"), value: "totalwinloss" },
					{ text: this.$t("totalWithdraw"), value: "totalwithdraw" },
					{
						text: this.$t("totalWithdrawCount"),
						value: "totalwithdrawcount",
					},
					{ text: this.$t("validBet"), value: "validbet" },
					{ text: this.$t("withdrawAvg"), value: "withdrawavg" },
				];
			},
		},
		watch: {},
	};
</script>