<template>
	<div>
		<v-row>
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-alert text type="info"
					>These are all clients which came through the advertisement
					banner (999.money)</v-alert
				>
			</v-col>
		</v-row>

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
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-card>
					<v-card-text>
						<v-data-table
							:items-per-page="10"
							:headers="headers"
							item-key="cToken"
							:options.sync="options"
							:server-items-length="clients.total"
							:pageCount="clients.totalPages"
							:items="clients.data"
							:loading="loading"
							:footer-props="footerProps"
						>
							<template v-slot:expanded-item="{ headers, item }">
								<td :colspan="headers.length">
									<v-row no-gutters>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Timezone</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.cTimezone
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Location</v-list-item-title
													>
													<v-list-item-subtitle
														>{{ item.cLat }},
														{{
															item.cLong
														}}</v-list-item-subtitle
													>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Region
														Code</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.cRegionCode
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>OS</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.cOs
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Original
														Screen</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.cOriginalScreen
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Browser
														Detail</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.cBrowserDetail
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Timezone
														Name</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.cTimezoneName
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Country</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.cCountry
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Region</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.cRegion
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Created
														At</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.createdAt
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Screen</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.cScreen
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Browser</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.cBrowser
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
										<v-col lg="4" md="6" sm="12">
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Country
														Code</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.cCountryCode
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>City</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.cCity
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>ZIP</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.cZip
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>ISP</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.cIsp
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Browser
														Vendor</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.cBrowserVendor
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
											<v-list-item two-line>
												<v-list-item-content>
													<v-list-item-title
														>Device
														Type</v-list-item-title
													>
													<v-list-item-subtitle>{{
														item.cDeviceType
													}}</v-list-item-subtitle>
												</v-list-item-content>
											</v-list-item>
										</v-col>
									</v-row>
								</td>
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

	export default {
		name: "TableClientsComponent",
		mixins: [Variables],
		data() {
			return {
				headers: [
					{ text: "IP", value: "cIp" },
					{ text: "Device Name", value: "cDeviceName" },
					{ text: "Language", value: "cLanguage" },
					{ text: "Country", value: "cCountry" },
					{ text: "Region", value: "cRegion" },
					{ text: "City", value: "cCity" },
					{ text: "Created At", value: "createdAt" },
					// { text: "Device Type", value: "cDeviceType" },
					// { text: "Browser", value: "cBrowser" },
					// { text: "Browser Detail", value: "cBrowserDetail" },
					// { text: "Browser Vendor", value: "cBrowserVendor" },
					// { text: "Screen", value: "cScreen" },
					// { text: "Original Screen", value: "cOriginalScreen" },
					// { text: "OS", value: "cOs" },
					// { text: "Timezone", value: "cTimezone" },
					// { text: "Timezone Name", value: "cTimezoneName" },
					// { text: "Country Code", value: "cCountryCode" },
					// { text: "Region Code", value: "cRegionCode" },
					// { text: "ZIP", value: "cZip" },
					// { text: "ISP", value: "cIsp" },
					// { text: "Latitude", value: "cLat" },
					// { text: "Longitude", value: "cLong" },
				],
				headerSearch: [
					{ text: "IP", value: "cIp" },
					{ text: "Device Name", value: "cDeviceName" },
					{ text: "Language", value: "cLanguage" },
					{ text: "Country", value: "cCountry" },
					{ text: "Region", value: "cRegion" },
					{ text: "City", value: "cCity" },
				],
				sortBy: "cid|desc",
				clientUnique: this.$route.query.unique
					? this.$route.query.unique
					: false,
			};
		},
		computed: {
			...mapGetters({
				clients: "getClients",
			}),
		},
		mounted() {
			if (this.$route.query.filterType) {
				this.defaultFilterDate = this.$route.query.filterType;
			}
			if (this.$route.query.device) {
				this.search.column = "cDeviceName";
				this.search.value = this.$route.query.device;
				this.beforeSearchMiddleware();
			}
		},
		watch: {
			clients() {
				this.loading = false;
			},
		},
	};
</script>
