<template>
	<div>
		<!-- Table for Browser and OS -->
		<v-row class="mt-5">
			<v-col cols="12" lg="6" md="6" sm="12">
				<v-card :loading="pcInfoLoading" outlined>
					<v-card-title class="subheading font-weight-bold">
						{{ $t("fromBrowser") }}
					</v-card-title>
					<v-card-text>
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Browser</th>
										<th class="text-left">
											{{ $t("clicks") }}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="item in clicksByBrowser"
										:key="item.key"
										@click="
											goToClientTablePageWithBrowserParam(
												item.browserType
											)
										"
									>
										<td>
											{{
												$t(
													item.browserType.replace(
														/\s+/g,
														""
													)
												)
											}}
										</td>
										<td>{{ item.count }}</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" lg="6" md="6" sm="12">
				<v-card :loading="pcInfoLoading">
					<v-card-title class="subheading font-weight-bold">
						{{ $t("fromOS") }}
					</v-card-title>
					<v-card-text>
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">OS</th>
										<th class="text-left">
											{{ $t("clicks") }}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="item in clicksByOS"
										:key="item.key"
										@click="
											goToClientTablePageWithOsParam(
												item.osType
											)
										"
									>
										<td>
											{{
												$t(
													item.osType
														.replace(/\s+/g, "")
														.split(".")
														.join("")
												)
											}}
										</td>
										<td>{{ item.count }}</td>
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
		name: "osAndBrowserCounterComponent",
		data() {
			return {};
		},
		props: {
			defaultFilterDateProps: {
				type: Number,
			},
			pcInfoLoading: {
				type: Boolean,
				default: false,
			},
		},
		mounted() {},
		computed: {
			...mapGetters({
				clicksByBrowser: "getClicksByBrowser",
				clicksByOS: "getClicksByOS",
			}),
		},
		watch: {
			clicksByBrowser() {
				this.$emit("update:pcInfoLoading", false);
			},
		},
		methods: {
			goToClientTablePageWithBrowserParam(value) {
				this.$router.replace(
					"/system/clients?browser=" +
						value +
						"&filterType=" +
						this.defaultFilterDateProps
				);
			},
			goToClientTablePageWithOsParam(value) {
				this.$router.replace(
					"/system/clients?os=" +
						value +
						"&filterType=" +
						this.defaultFilterDateProps
				);
			},
		},
	};
</script>

<style scoped>
	tr {
		cursor: pointer;
	}
</style>
