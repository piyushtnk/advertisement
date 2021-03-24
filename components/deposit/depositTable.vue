<template>
	<div>
		<!-- Filter Area -->
		<v-card class="my-5" outlined>
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
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-select
							v-model="paymentTypeValue"
							:items="paymentType"
							item-value="value"
							item-text="text"
							:label="$t('paymentType')"
						/>
					</v-col>
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-select
							v-model="sequenceValue"
							:items="sequence"
							item-value="value"
							item-text="text"
							:label="$t('sequence')"
						/>
					</v-col>
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-select
							v-model="thirdPartyPaymentValue"
							:items="thirdPartyPayment"
							item-value="value"
							item-text="text"
							:label="$t('thirdPartyPayment')"
						/>
					</v-col>
				</v-row>

				<v-row align="center">
					<v-col cols="12" lg="2" md="2" sm="12">
						<v-select
							v-model="defaultFilterDate"
							:items="filterDate"
							item-value="state"
							item-text="abbr"
							:label="$t('filterType')"
						/>
					</v-col>
					<v-col cols="12" lg="2" md="2" sm="12">
						<v-select
							v-model="search.column"
							:items="headerSearch"
							item-value="value"
							item-text="text"
							:label="$t('columnName')"
						/>
					</v-col>
					<v-col cols="12" lg="2" md="3" sm="12">
						<v-text-field
							v-model="search.value"
							:label="$t('searchText')"
							required
						></v-text-field>
					</v-col>

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
							:excelData="deposit.data"
							:fileName="$t('layout.deposit')"
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
							:headers="headers"
							item-key="id"
							:options.sync="options"
							:server-items-length="deposit.total"
							:pageCount="deposit.totalPages"
							:items="deposit.data"
							:loading="loading"
							:footer-props="footerProps"
						>
							<template v-slot:[`item.firstname`]="{ item }">
								{{
									isNull(item.firstname) +
									" " +
									isNull(item.lastname)
								}}
							</template>

							<template v-slot:[`item.groupname`]="{ item }">
								{{ $t(item.groupname) }}
							</template>

							<template v-slot:[`item.depositamt`]="{ item }">
								{{ numberFormat(parseInt(item.depositamt)) }}
							</template>

							<template
								v-slot:[`item.receiveddepositamt`]="{ item }"
							>
								{{
									numberFormat(
										parseInt(item.receiveddepositamt)
									)
								}}
							</template>

							<template
								v-slot:[`item.thirdpartypaymentstaticname`]="{
									item,
								}"
							>
								{{
									item.thirdpartypaymentstaticname != null
										? isNull(item.depositPaymentTypeEnum) +
										  " " +
										  $t(
												removeSpace(
													item.thirdpartypaymentstaticname
												)
										  )
										: item.caccountbankname +
										  " " +
										  item.caccountbankaccountname
								}}
							</template>

							<template v-slot:[`item.remarks`]="{ item }">
								{{
									item.thirdpartypaymentstaticname != null
										? item.remarks
										: item.postscript
								}}
							</template>

							<template slot="body.append">
								<tr>
									<th colspan="5">Total</th>
									<th>
										{{
											numberFormat(sumField("depositamt"))
										}}
									</th>
									<th>
										{{
											numberFormat(
												sumField("receiveddepositamt")
											)
										}}
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
		name: "TableDepositComponent",
		mixins: [Variables, Global],
		data() {
			return {
				sortBy: "id|desc",
				paymentTypeValue: "",
				sequenceValue: "",
				thirdPartyPaymentValue: "",
				paymentType: [
					{ text: this.$t("all"), value: "" },
					{ text: this.$t("companyDeposit"), value: 8 },
					{ text: this.$t("debitCard"), value: 4 },
					{ text: this.$t("viettelPay"), value: 8192 },
					{ text: this.$t("qrCode"), value: 32768 },
				],
			};
		},
		computed: {
			...mapGetters({
				deposit: "getDeposit",
			}),
			headers() {
				return [
					{ text: this.$t("depositTime"), value: "deposittime" },
					{ text: this.$t("auditTime"), value: "audittime" },
					{ text: this.$t("userId"), value: "playerid" },
					{ text: this.$t("name"), value: "firstname" },
					{ text: this.$t("group"), value: "groupname" }, // member level
					{ text: this.$t("depositAmount"), value: "depositamt" },
					{
						text: this.$t("receivedDeposit"),
						value: "receiveddepositamt",
					},
					{
						text: this.$t("thirdPartyPaymentName"),
						value: "thirdpartypaymentstaticname",
					},
					{ text: this.$t("remarks"), value: "remarks" },
					{ text: this.$t("agentBy"), value: "ulagentaccount" }, // source url
					{ text: this.$t("createdAt"), value: "createdAt" },
				];
			},
			headerSearch() {
				return [
					{ text: this.$t("depositTime"), value: "deposittime" },
					{ text: this.$t("auditTime"), value: "audittime" },
					{ text: this.$t("userId"), value: "playerid" },
					{ text: this.$t("name"), value: "firstname" },
					{ text: this.$t("group"), value: "groupname" }, // member level
					{ text: this.$t("depositAmount"), value: "depositamt" },
					{
						text: this.$t("receivedDeposit"),
						value: "receiveddepositamt",
					},
					{
						text: this.$t("thirdPartyPaymentName"),
						value: "thirdpartypaymentstaticname",
					},
					{ text: this.$t("remarks"), value: "remarks" },
					{ text: this.$t("agentBy"), value: "ulagentaccount" }, // source url
					{ text: this.$t("createdAt"), value: "createdAt" },
				];
			},
			sequence() {
				return [
					{ text: this.$t("all"), value: "" },
					{ text: this.$t("firstDeposit"), value: 1 },
					{ text: this.$t("secondDeposit"), value: 2 },
				];
			},
			thirdPartyPayment() {
				return [
					{ text: this.$t("all"), value: "" },
					{ text: this.$t("dtPay"), value: "DTPAY" },
					{ text: this.$t("momo"), value: "MOMOPAY" },
					{ text: this.$t("viettelPay"), value: "VIETTELPAY" },
				];
			},
		},
		methods: {
			sumField(key) {
				if (this.deposit.data) {
					return this.deposit.data.reduce(
						(a, b) => parseInt(a) + (parseInt(b[key]) || 0),
						0
					);
				} else {
					return "";
				}
			},
		},
		watch: {
			deposit() {
				this.loading = false;
			},
		},
	};
</script>
