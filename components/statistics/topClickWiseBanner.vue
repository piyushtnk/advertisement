<template>
	<div>
		<!-- Top 5 Banner listing -->
		<v-row class="mt-5">
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-card
					class="mx-auto mt-5"
					outlined
					:loading="topClickWiseViewBannerLoading"
				>
					<v-card-title class="display-1">
						{{ $t("topClickWiseBannersList") }}
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
											{{ $t("clicks") }}
										</th>
										<th class="text-left">
											{{ $t("createdAt") }}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="item in topClickWiseBanners"
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
													width="200"
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
													defaultFilterDateProps
												"
											>
												{{
													staticNumberFormat(
														item.count
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
	import Global from "~/mixins/global";

	export default {
		name: "topClickWiseBannerComponent",
		mixins: [Global],
		data() {
			return {};
		},
		props: {
			defaultFilterDateProps: {
				type: Number,
			},
			topClickWiseViewBannerLoading: {
				type: Boolean,
				default: false,
			},
		},
		mounted() {},
		computed: {
			...mapGetters({
				topClickWiseBanners: "getTopClickWiseBanners",
			}),
		},
		watch: {
			topClickWiseBanners() {
				this.$emit("update:topClickWiseViewBannerLoading", false);
			},
		},
		methods: {
			getImage(imageName, imageType) {
				return `${process.env.CLOUD_URL}/banner/${imageName}.${imageType}`;
			},
		},
	};
</script>

<style scoped>
	tr {
		cursor: pointer;
	}
</style>
