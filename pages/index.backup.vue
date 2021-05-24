<template>
	<div>
		<v-container fill-height fluid>
			<v-row align="center">
				<v-col cols="12">
					<v-card elevation="0">
						<v-card-text>
							<v-alert
								text
								prominent
								color="deep-orange"
								icon="mdi-fire"
							>
								<h3 class="headline">Welcome back,</h3>
								<div class="mt-1">
									We're coming soon, stay tuned for more
									updates.
								</div>
							</v-alert>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
	export default {
		layout: "landing",
		data() {
			return {};
		},
		components: {},
		middleware() {},
		computed: {},
		created() {
			// If b91.com comes in.
			if (
				window.location.host === "b91vip.com" ||
				window.location.host === "www.b91vip.com"
			) {
				return window.location.replace("http://www.b91.com");
			}

			// Other configuration
			this.$vuetify.theme.dark = false;
		},
		methods: {},
	};
</script>
