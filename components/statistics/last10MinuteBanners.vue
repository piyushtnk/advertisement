<template>
	<div>
		<v-row class="mt-5">
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-card
					class="mx-auto mt-5"
					outlined
					:loading="last10MinuteLoading"
				>
					<v-card-title class="display-1">
						{{ $t("last10MinuteBannerList") }}
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
											{{ $t("views") }}
										</th>
										<th class="text-left">
											{{ $t("createdAt") }}
										</th>
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
													width="300"
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
													defaultFilterDate
												"
											>
												{{
													staticNumberFormat(
														item.totalViews
													)
												}}
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
		props: {
			last10MinuteLoading: {
				type: Boolean,
				default: true,
			},
		},
		mounted() {},
		computed: {
			...mapGetters({
				last10MinuteBanners: "getLast10MinuteBanners",
			}),
		},
		watch: {
			last10MinuteBanners() {
				this.$emit("update:last10MinuteLoading", false);
			},
		},
		methods: {
			getImage(imageName, imageType) {
				return `${process.env.BUCKET_URL}/banner/${imageName}.${imageType}`;
			},
		},
	};
</script>
