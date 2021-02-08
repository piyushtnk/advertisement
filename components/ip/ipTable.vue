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
									label="Specific date's data"
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
							>
								<v-spacer></v-spacer>
								<v-btn
									text
									color="primary"
									@click="modal = false"
								>
									Cancel
								</v-btn>
								<v-btn
									text
									color="primary"
									@click="$refs.dialog.save(date)"
								>
									OK
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
							label="Filter Type"
						/>
					</v-col>
					<v-col cols="12" lg="2" md="3" sm="12">
						<v-select
							v-model="search.column"
							:items="headerSearch"
							item-value="value"
							item-text="text"
							label="Column Name"
						/>
					</v-col>
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-text-field
							v-model="search.value"
							label="Search Text"
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
							Search
							<v-icon right dark> mdi-account-search </v-icon>
						</v-btn>
					</v-col>
					<v-col cols="12" lg="1" md="3" sm="12">
						<v-btn
							color="red"
							class="white--text"
							@click="clearSearchFilter"
							block
							:loading="loading"
						>
							Clear
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
				headers: [
					// { text: "ASN", value: "asn" },
					{ text: "City", value: "city" },
					{ text: "Continent Code", value: "continent_code" },
					{ text: "Country", value: "country" },
					{ text: "Country Code", value: "country_code" },
					{ text: "Currency", value: "currency" },
					{ text: "Currency Name", value: "currency_name" },
					{ text: "European Union", value: "eu" },
					{ text: "IP", value: "ip" },
					{ text: "Languages", value: "languages" },
					{ text: "Latitude", value: "latitude" },
					{ text: "Longitude", value: "latitude" },
					{ text: "Organization", value: "org" },
					{ text: "Postal", value: "postal" },
					{ text: "Region", value: "region" },
					{ text: "Region Code", value: "region_code" },
					{ text: "Timezone", value: "timezone" },
					{ text: "Registered Date", value: "createdAt" },
				],
				headerSearch: [
					// { text: "ASN", value: "asn" },
					{ text: "City", value: "city" },
					{ text: "Continent Code", value: "continent_code" },
					{ text: "Country", value: "country" },
					{ text: "Country Code", value: "country_code" },
					{ text: "Currency", value: "currency" },
					{ text: "Currency Name", value: "currency_name" },
					{ text: "European Union", value: "eu" },
					{ text: "IP", value: "ip" },
					{ text: "Languages", value: "languages" },
					{ text: "Latitude", value: "latitude" },
					{ text: "Longitude", value: "latitude" },
					{ text: "Organization", value: "org" },
					{ text: "Postal", value: "postal" },
					{ text: "Region", value: "region" },
					{ text: "Region Code", value: "region_code" },
					{ text: "Timezone", value: "timezone" },
				],
				sortBy: "id|desc",
			};
		},
		computed: {
			...mapGetters({
				ipClients: "getIpClients",
			}),
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
