<template>
	<div>
		<!-- Filter Area -->
		<v-card class="my-5">
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
					<v-col cols="12" lg="2" md="3" sm="12">
						<v-select
							v-model="defaultFilterDate"
							:items="filterDate"
							item-value="state"
							item-text="abbr"
							:label="$t('filterType')"
						/>
					</v-col>
					<v-col cols="12" lg="2" md="3" sm="12">
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
					<v-col cols="12" lg="1" md="3" sm="12">
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
					<v-col cols="12" lg="1" md="3" sm="12">
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
				</v-row>
			</v-card-text>
		</v-card>

		<!-- Table Listing -->
		<v-row>
			<v-col cols="12">
				<v-card>
					<v-card-text>
						<v-data-table
							:headers="headers"
							item-key="id"
							:options.sync="options"
							:server-items-length="ipClients.total"
							:pageCount="ipClients.totalPages"
							:items="ipClients.data"
							:loading="loading"
							:footer-props="footerProps"
						>
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
		name: "TableReportsComponent",
		mixins: [Variables],
		data() {
			return {
				sortBy: "id|desc",
			};
		},
		computed: {
			...mapGetters({
				ipClients: "getIpClients",
			}),
			headers() {
				return [
					// { text: "ASN", value: "asn" },
					{ text: this.$t("city"), value: "city" },
					{ text: this.$t("continentCode"), value: "continent_code" },
					{ text: this.$t("country"), value: "country" },
					{ text: this.$t("countryCode"), value: "country_code" },
					{ text: this.$t("currency"), value: "currency" },
					{ text: this.$t("currencyName"), value: "currency_name" },
					{ text: this.$t("europeanUnion"), value: "eu" },
					{ text: this.$t("ip"), value: "ip" },
					{ text: this.$t("languages"), value: "languages" },
					{ text: this.$t("latitude"), value: "latitude" },
					{ text: this.$t("longitude"), value: "latitude" },
					{ text: this.$t("organization"), value: "org" },
					{ text: this.$t("postal"), value: "postal" },
					{ text: this.$t("region"), value: "region" },
					{ text: this.$t("regionCode"), value: "region_code" },
					{ text: this.$t("timezone"), value: "timezone" },
					{ text: this.$t("registrationDate"), value: "createdAt" },
				];
			},
			headerSearch() {
				return [
					// { text: "ASN", value: "asn" },
					{ text: this.$t("city"), value: "city" },
					{ text: this.$t("continentCode"), value: "continent_code" },
					{ text: this.$t("country"), value: "country" },
					{ text: this.$t("countryCode"), value: "country_code" },
					{ text: this.$t("currency"), value: "currency" },
					{ text: this.$t("currencyName"), value: "currency_name" },
					{ text: this.$t("europeanUnion"), value: "eu" },
					{ text: this.$t("ip"), value: "ip" },
					{ text: this.$t("languages"), value: "languages" },
					{ text: this.$t("latitude"), value: "latitude" },
					{ text: this.$t("longitude"), value: "latitude" },
					{ text: this.$t("organization"), value: "org" },
					{ text: this.$t("postal"), value: "postal" },
					{ text: this.$t("region"), value: "region" },
					{ text: this.$t("regionCode"), value: "region_code" },
					{ text: this.$t("timezone"), value: "timezone" },
				];
			},
		},
		methods: {
			isNull(value) {
				if (value == "" || value == null || value == "null") {
					return "-";
				} else {
					return value;
				}
			},
		},
		watch: {
			ipClients() {
				this.loading = false;
			},
		},
	};
</script>
