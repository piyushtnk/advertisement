<template>
	<v-container>
		<v-row class="mt-16">
			<v-col class="text-center">
				<div
					class="text-h4 text-uppercase white--text anton-font"
					v-text="$t('customerSupport')"
				></div>
			</v-col>
		</v-row>

		<v-row class="mt-10 justify-center">
			<v-col lg="2" md="4" sm="6" xs="12">
				<v-card flat tile>
					<v-list-item>
						<v-list-item-avatar tile height="60" width="60">
							<v-img
								src="/landing/online-customer.png"
								contain
							></v-img>
						</v-list-item-avatar>
						<v-list-item-content
							class="headline text-center anton-font footer-box-text"
						>
							{{ $t("online") }} {{ $t("customerService") }}
						</v-list-item-content>
					</v-list-item>
				</v-card>
			</v-col>
			<v-col lg="2" md="4" sm="6" xs="12">
				<v-card class="landing-border" flat tile>
					<v-list-item>
						<v-list-item-avatar tile height="60" width="60">
							<v-img
								src="/landing/zalo-hover.png"
								contain
							></v-img>
						</v-list-item-avatar>
						<v-list-item-content
							class="headline text-center anton-font footer-box-text-2"
						>
							{{ $t("zalo") }} {{ $t("customerService") }}
						</v-list-item-content>
					</v-list-item>
				</v-card>
			</v-col>
			<v-col lg="2" md="4" sm="6" xs="12">
				<v-card flat tile>
					<v-list-item>
						<v-list-item-avatar tile height="60" width="60">
							<v-img src="/landing/zalo.png" contain></v-img>
						</v-list-item-avatar>
						<v-list-item-content
							class="headline text-center anton-font footer-box-text"
						>
							{{ $t("agent") }} {{ $t("customerService") }}
						</v-list-item-content>
					</v-list-item>
				</v-card>
			</v-col>
			<v-col lg="2" md="4" sm="6" xs="12">
				<v-card flat tile>
					<v-list-item>
						<v-list-item-avatar tile height="60" width="60">
							<v-img src="/landing/zalo.png" contain></v-img>
						</v-list-item-avatar>
						<v-list-item-content
							class="headline text-center anton-font footer-box-text"
						>
							{{ $t("zaloB") }} {{ $t("customerService") }}
						</v-list-item-content>
					</v-list-item>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
	.landing-border {
		border: 1px solid white;
		background: #510d86;
	}
	.anton-font {
		font-family: "Anton", sans-serif !important;
	}
</style>

<script>
	export default {
		name: "FooterComponent",
		data() {
			return {};
		},
		computed: {},
		created() {},
		methods: {},
	};
</script>
