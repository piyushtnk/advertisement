<template>
	<div>
		<v-row class="">
			<v-col cols="12">
				<v-card class="mx-auto" outlined>
					<v-app-bar flat>
						<v-toolbar-title>{{
							$t("information.heading")
						}}</v-toolbar-title>
						<v-spacer></v-spacer>
					</v-app-bar>

					<v-card-text>
						<v-timeline
							align-top
							:dense="$vuetify.breakpoint.smAndDown"
						>
							<v-timeline-item
								v-for="(item, i) in items"
								:key="i"
								:color="item.color"
								:icon="item.icon"
								fill-dot
							>
								<v-card :color="item.color" outlined>
									<v-card-title class="title">
										{{ item.heading }}
									</v-card-title>
									<v-card-text class="text--primary">
										<p>
											{{ item.content }}
										</p>
									</v-card-text>
								</v-card>
							</v-timeline-item>
						</v-timeline>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	export default {
		middleware: "authenticate",
		components: {},
		data: () => ({}),
		computed: {
			items() {
				return [
					{
						color: "",
						icon: "mdi-account-group",
						heading: this.$t("clients"),
						content: this.$t("informationText.clients"),
					},
					{
						color: "",
						icon: "mdi-account-arrow-left",
						heading: this.$t("players"),
						content: this.$t("informationText.players"),
					},
					{
						color: "",
						icon: "mdi-clipboard-file",
						heading: this.$t("reports"),
						content: this.$t("informationText.reports"),
					},
					{
						color: "",
						icon: "mdi-ip",
						heading: this.$t("ipClients"),
						content: this.$t("informationText.ipClients"),
					},
				];
			},
		},
		methods: {},
		mounted() {},
	};
</script>
