<template>
	<div>
		<v-row class="mt-5">
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-card class="mx-auto mt-5" outlined>
					<v-card-title class="display-1">
						Last 10 Minutes Banners Performance List.
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
										<th class="text-left">Clicks</th>
										<th class="text-left">Created At</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="item in last10MinuteBanners.data"
										:key="item.id"
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
												:to="
													'/system/clients?bannerId=' +
													item.id +
													'&filterType=' +
													defaultFilterDate
												"
											>
												{{ item.totalClients }}
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
	import { mapGetters } from "vuex";

	export default {
		name: "TopViewedBannersComponent",
		data() {
			return {
				date: [],
				defaultFilterDate: 1,
			};
		},
		mounted() {
			// Hitting parents.
			this.$emit("childFilterForCounter");
		},
		computed: {
			...mapGetters({
				last10MinuteBanners: "getLast10MinuteBanners",
			}),
		},
		methods: {
			getImage(imageName, imageType) {
				return `https://storage.googleapis.com/advertisement_storage/banner/${imageName}.${imageType}`;
			},
		},
	};
</script>
