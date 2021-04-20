<template>
	<div>
		<v-row class="my-3">
			<v-col cols="12" lg="12" md="12" sm="12">
				<!-- Table Listing -->
				<v-row>
					<v-col cols="12">
						<v-card outlined>
							<v-card-title>{{ $t("loginIpPool") }}</v-card-title>
							<v-card-text>
								<v-data-table
									dense
									:headers="headers"
									:items="playerInfo.loginip.loginIpPool"
									:search="search"
									item-key="logintime"
								>
									<template
										v-slot:[`item.logintime`]="{ item }"
									>
										{{
											$moment(item.logintime).format(
												"YYYY-MM-DD HH:mm:ss"
											)
										}}
									</template>
								</v-data-table>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "ProfileComponent",
		data() {
			return {
				loading: false,
				search: "",
			};
		},
		computed: {
			...mapGetters({
				playerInfo: "getPlayerInfo",
			}),
			headers() {
				return [
					{ text: this.$t("ip"), value: "ip" },
					{ text: this.$t("city"), value: "city" },
					{ text: this.$t("country"), value: "country" },
					{ text: this.$t("createdAt"), value: "logintime" },
				];
			},
		},
		methods: {},
		watch: {
			playerInfo(v) {
				this.loading = false;
			},
		},
	};
</script>
