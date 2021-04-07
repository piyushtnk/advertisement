<template>
	<div>
		<!-- Filter Area -->
		<v-card class="my-5" outlined>
			<v-card-text>
				<v-row align="center">
					<v-col cols="12" lg="4" md="3" sm="12">
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
					<v-col cols="12" lg="2" md="3" sm="12">
						<v-select
							v-model="defaultFilterDate"
							:items="filterDate"
							item-value="state"
							item-text="abbr"
							:label="$t('filterType')"
						/>
					</v-col>
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-select
							v-model="search.column"
							:items="headerSearch"
							item-value="value"
							item-text="text"
							:label="$t('columnName')"
						/>
					</v-col>
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-text-field
							v-model="search.value"
							:label="$t('searchText')"
							required
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
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
							:excelData="withdrawals.data"
							:fileName="$t('withdrawals')"
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
							:server-items-length="withdrawals.total"
							:pageCount="withdrawals.totalPages"
							:items="withdrawals.data"
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

							<template v-slot:[`item.withdrawalamt`]="{ item }">
								{{ numberFormat(parseInt(item.withdrawalamt)) }}
							</template>

							<template
								v-slot:[`item.actualwithdrawalamt`]="{ item }"
							>
								{{
									numberFormat(
										parseInt(item.actualwithdrawalamt)
									)
								}}
							</template>

							<template
								v-slot:[`item.thirdpartypaymentstaticname`]="{
									item,
								}"
							>
								{{
									item.thirdpartypaymentstaticname
										? $t(
												removeSpace(
													item.thirdpartypaymentstaticname
												)
										  )
										: $t("bankTransfer")
								}}
							</template>

							<template slot="body.append">
								<tr>
									<th colspan="5">Total</th>
									<th>
										{{
											numberFormat(
												withdrawals.totalWithdrawalAmount
											)
										}}
									</th>
									<th>
										{{
											numberFormat(
												withdrawals.actualWithdrawalAmount
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
		name: "TableWithdrawalsComponent",
		mixins: [Variables, Global],
		data() {
			return {
				sortBy: "id|desc",
			};
		},
		computed: {
			...mapGetters({
				withdrawals: "getWithdrawals",
			}),
			headers() {
				return [
					{
						text: this.$t("withdrawalTime"),
						value: "withdrawaltime",
					},
					{ text: this.$t("auditTime"), value: "audittime" },
					{ text: this.$t("userId"), value: "playerid" },
					{ text: this.$t("name"), value: "firstname" },
					{ text: this.$t("group"), value: "groupname" },
					{ text: this.$t("withdrawalAmount"), value: "withdrawalamt" },
					{ text: this.$t("actualAmount"), value: "paidamt" },
					{
						text: this.$t("withdrawalChannel"),
						value: "thirdpartypaymentstaticname",
					},
					{
						text: this.$t("thirdPartyOrderNo"),
						value: "thirdpartyorderno",
					},
					{ text: this.$t("agentBy"), value: "ulagentaccount" },
					{ text: this.$t("createdAt"), value: "createdAt" },
				];
			},
			headerSearch() {
				return [
					{
						text: this.$t("withdrawalTime"),
						value: "withdrawaltime",
					},
					{ text: this.$t("auditTime"), value: "audittime" },
					{ text: this.$t("userId"), value: "playerid" },
					{ text: this.$t("name"), value: "firstname" },
					{ text: this.$t("group"), value: "groupname" },
					{ text: this.$t("withdrawalAmount"), value: "withdrawalamt" },
					{ text: this.$t("actualAmount"), value: "paidamt" },
					{
						text: this.$t("withdrawalChannel"),
						value: "thirdpartypaymentstaticname",
					},
					{
						text: this.$t("thirdPartyOrderNo"),
						value: "thirdpartyorderno",
					},
					{ text: this.$t("agentBy"), value: "ulagentaccount" },
					{ text: this.$t("createdAt"), value: "createdAt" },
				];
			},
		},
		methods: {
			sumField(key) {
				if (this.withdrawals.data) {
					return this.withdrawals.data.reduce(
						(a, b) => parseFloat(a) + (parseFloat(b[key]) || 0),
						0
					);
				} else {
					return "";
				}
			},
		},
		watch: {
			withdrawals() {
				this.loading = false;
			},
		},
	};
</script>
