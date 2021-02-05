<template>
	<div>
		<!-- PC AND Mobile -->
		<v-row>
			<v-col cols="12" lg="4" md="4" sm="12">
				<v-card class="mx-auto mt-5" outlined>
					<v-card-title class="display-1">
						{{ statistics.allClients }}
					</v-card-title>
					<v-card-text> Overall Clicks On Banners </v-card-text>
				</v-card>
			</v-col>

			<v-col cols="12" lg="4" md="4" sm="12">
				<v-card class="mx-auto mt-5" outlined>
					<v-card-title class="display-1">
						{{ statistics.uniqueClients }}
					</v-card-title>
					<v-card-text> Unique Clicks On Banners </v-card-text>
				</v-card>
			</v-col>

			<v-col cols="12" lg="4" md="4" sm="12">
				<v-card class="mx-auto mt-5" outlined>
					<v-card-title class="display-1">
						{{ statistics.registeredPlayersThroughBanners }}
					</v-card-title>
					<v-card-text> Registered Players From Banners </v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<!-- Registered players, Top-up players and Unique clients  -->
		<v-row>
			<v-col cols="12" lg="4" md="4" sm="12">
				<v-card class="mx-auto mt-5" outlined>
					<v-card-title class="display-1">
						{{ statistics.topupPlayersCountFromAllSources }}
					</v-card-title>
					<v-card-text> Top-up Players From All Sources </v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" lg="4" md="4" sm="12">
				<v-card class="mx-auto mt-5" outlined>
					<v-card-title class="display-1">
						{{ statistics.clientsFromPcCount }}
					</v-card-title>
					<v-card-text> Unique Banner Clicks From PC </v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" lg="4" md="4" sm="12">
				<v-card class="mx-auto mt-5" outlined>
					<v-card-title class="display-1">
						{{ statistics.clientsFromMobileCount }}
					</v-card-title>
					<v-card-text class="h">
						Unique Banner Clicks From Mobile
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<!-- IP 2 -->
		<v-row>
			<v-col cols="12" lg="4" md="4" sm="12">
				<v-card class="mx-auto mt-5" outlined>
					<v-card-title class="display-1">
						{{ ipClients.total }}
					</v-card-title>
					<v-card-text class="h">
						Banner Viewers (API/IP)
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" lg="4" md="4" sm="12">
				<v-card class="mx-auto mt-5" outlined>
					<v-card-title class="display-1">
						{{ statistics2.overallTopupCount }}
					</v-card-title>
					<v-card-text class="h">
						Overall Top-up Count (All Sources)
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" lg="4" md="4" sm="12">
				<v-card class="mx-auto mt-5" outlined>
					<v-card-title class="display-1">
						{{ statistics2.overallTopupCountFromBanners }}
					</v-card-title>
					<v-card-text class="h">
						Overall Top-up Count From Banners
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<!-- IP - 2  -->
		<v-row>
			<v-col cols="12" lg="4" md="4" sm="12">
				<v-card class="mx-auto mt-5" outlined>
					<v-card-title class="display-1">
						{{ statistics2.overallTotalTopupValue }}
					</v-card-title>
					<v-card-text class="h">
						Overall Total Top-up Value (All Sources)
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" lg="4" md="4" sm="12">
				<v-card class="mx-auto mt-5" outlined>
					<v-card-title class="display-1">
						{{ statistics2.overallTotalTopupValueFromBanners }}
					</v-card-title>
					<v-card-text class="h">
						Overall Total Top-up Value From Banners
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<!-- Table for Browser and OS -->
		<v-row class="mt-5">
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-data-iterator
					:items="statisticsOsAndBrowser"
					items-per-page.sync="2"
					hide-default-footer
				>
					<template v-slot:default="props">
						<v-row>
							<v-col
								v-for="item in props.items"
								:key="item.browserType"
								cols="12"
								sm="6"
								md="6"
								lg="6"
							>
								<v-card>
									<v-card-title
										class="subheading font-weight-bold"
									>
										{{ item.name }}
									</v-card-title>

									<v-divider></v-divider>

									<v-list
										dense
										v-for="singleItem in item.data"
										:key="singleItem.name"
									>
										<v-list-item>
											<v-list-item-content
												>{{
													singleItem.browserType
														? singleItem.browserType
														: singleItem.osType
												}}:</v-list-item-content
											>
											<v-list-item-content
												class="align-end"
											>
												{{ singleItem.count }}
											</v-list-item-content>
										</v-list-item>
									</v-list>
								</v-card>
							</v-col>
						</v-row>
					</template>
				</v-data-iterator>
			</v-col>
		</v-row>

		<!-- Top 5 Banner listing -->
		<v-row class="mt-5">
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-card class="mx-auto mt-5" outlined>
					<v-card-title class="display-1">
						Top Recent Banners Performance
					</v-card-title>
					<v-card-text>
						<v-simple-table fixed-header dense>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Image</th>
										<th class="text-left">Origin</th>
										<th class="text-left">
											Redirection URL
										</th>
										<th class="text-left">Total Hits</th>
										<th class="text-left">Created At</th>
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
													width="500"
													height="200"
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
												class="ma-2"
												color="green"
												text-color="white"
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

	export default {
		name: "CounterComponent",
		data() {
			return {};
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
		methods: {
			...mapActions(["getIpClients"]),
			getRealPercentage(value) {
				let number = value * 100;
				return Number.parseFloat(number).toPrecision(2) + "%";
			},
			getImage(imageName, imageType) {
				return `https://storage.googleapis.com/advertisement_storage/banner/${imageName}.${imageType}`;
			},
		},
	};
</script>