<template>
	<div>
		<v-container fill-height fluid>
			<!-- HEADER -->
			<v-row align="center" class="d-flex">
				<v-col cols="12" lg="6" md="6" sm="6">
					<v-img
						lazy-src="landing/logo.png"
						height="auto"
						width="25%"
						src="landing/logo.png"
					></v-img>
				</v-col>

				<v-col cols="12" lg="6" md="6" sm="6" class="text-right">
					<v-btn fab x-small class="mr-5" @click="langSwitcher">
						<v-img
							class="header-logo-image"
							:src="langSwitcherImage"
						></v-img>
					</v-btn>
					<div class="d-inline-flex">
						<v-btn color="#ffd832" class="landing-btn" x-large tile>
							{{ $t("register") }}
						</v-btn>
						<v-btn color="#ffffff" class="landing-btn" x-large tile>
							{{ $t("login") }}
						</v-btn>
					</div>
				</v-col>
			</v-row>

			<!-- BODY -->
			<v-row class="mt-5">
				<v-col cols="12">
					<v-divider color="#7e3faf"></v-divider>
				</v-col>
			</v-row>

			<!-- Links buttons -->
			<v-row class="mt-10">
				<v-col>
					<v-btn class="landing-btn-link" tile block x-large>
						{{ $t("vipLink") }} 1
					</v-btn>
				</v-col>
				<v-col>
					<v-btn class="landing-btn-link" tile block x-large>
						{{ $t("vipLink") }} 2
					</v-btn>
				</v-col>
				<v-col>
					<v-btn class="landing-btn-link" tile block x-large>
						{{ $t("vipLink") }} 3
					</v-btn>
				</v-col>
				<v-col>
					<v-btn class="landing-btn-link" tile block x-large>
						{{ $t("vipLink") }} 4
					</v-btn>
				</v-col>
				<v-col>
					<v-btn class="landing-btn-link" tile block x-large>
						{{ $t("vipLink") }} 5
					</v-btn>
				</v-col>
				<v-col>
					<v-btn class="landing-btn-link" tile block x-large>
						{{ $t("vipLink") }} 6
					</v-btn>
				</v-col>
				<v-col>
					<v-btn class="landing-btn-link" tile block x-large>
						{{ $t("vipLink") }} 7
					</v-btn>
				</v-col>
				<v-col>
					<v-btn class="landing-btn-link" tile block x-large>
						{{ $t("vipLink") }} 8
					</v-btn>
				</v-col>
				<v-col>
					<v-btn class="landing-btn-link" tile block x-large>
						{{ $t("vipLink") }} 9
					</v-btn>
				</v-col>
				<v-col>
					<v-btn class="landing-btn-link" tile block x-large>
						{{ $t("vipLink") }} 10
					</v-btn>
				</v-col>
			</v-row>

			<!-- Banners promotion section -->
			<v-row class="mt-16">
				<v-col cols="12" lg="12" md="12" sm="12">
					<v-card class="d-flex" flat tile color="transparent">
						<div
							class="white--text text-uppercase promotion-title"
							v-text="$t('currentPromotions')"
						></div>
						<v-btn
							tile
							color="#ffd832"
							large
							class="promotion-title-view-all ml-auto"
						>
							{{ $t("viewAll") }}
						</v-btn>
					</v-card>
				</v-col>
			</v-row>

			<!-- Divider again -->
			<v-row class="mt-5">
				<v-col cols="12">
					<v-divider color="#7e3faf"></v-divider>
				</v-col>
			</v-row>

			<!-- Promotions images listing -->
			<v-row class="mt-5">
				<v-col>
					<v-card class="mx-auto">
						<v-img
							src="/landing/img-1.jpg"
							contain
							height="auto"
						></v-img>

						<v-card-title>
							<div
								class="text-uppercase promotion-box-title"
								v-text="$t('bonusOnEachDeposit')"
							></div>
						</v-card-title>
					</v-card>
				</v-col>
				<v-col>
					<v-card class="mx-auto">
						<v-img
							src="/landing/img-2.jpg"
							contain
							height="auto"
						></v-img>

						<v-card-title>
							<div
								class="text-uppercase promotion-box-title"
								v-text="$t('extraWeeklyBonus')"
							></div>
						</v-card-title>
					</v-card>
				</v-col>
				<v-col>
					<v-card class="mx-auto">
						<v-img
							src="/landing/img-3.jpg"
							contain
							height="auto"
						></v-img>

						<v-card-title>
							<div
								class="text-uppercase promotion-box-title"
								v-text="$t('b91AnswerQuestion')"
							></div>
						</v-card-title>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<!-- FOOTER -->
		<Footer />
	</div>
</template>

<style>
	.v-application {
		background: #510d86 !important;
	}
	.landing-btn {
		color: #510d86 !important;
		font-family: "Bebas Neue", cursive !important;
		font-size: 24px !important;
	}
	.landing-btn-link {
		color: #510d86 !important;
		font-family: "Bebas Neue", cursive !important;
		font-size: 24px !important;
		background: url("/landing/link-button.png");
		background-repeat: no-repeat;
		background-size: cover;
	}
	.header-logo-image {
		height: auto;
		width: 1px;
	}
	.bg-white {
		background-color: #ffffff;
	}
	.promotion-title {
		font-family: "Anton", sans-serif !important;
		font-size: 36px !important;
	}
	.promotion-title-view-all {
		font-family: "Bebas Neue", cursive !important;
		font-size: 24px !important;
	}
	.promotion-box-title {
		font-family: "Anton", sans-serif !important;
		font-size: 32px !important;
		color: #510d86 !important;
	}
	.footer-box-text {
		color: #622b93;
	}
	.footer-box-text-2 {
		color: #ffd832;
	}
</style>

<script>
	import Footer from "~/components/landing/Footer";
	export default {
		layout: "landing",
		data() {
			return {
				langSwitcherImage: "/landing/english.png",
			};
		},
		components: { Footer },
		middleware(ctx) {
			ctx.$gtm.pushEvent({ event: "ssr" });
		},
		computed: {
			theme() {
				return this.$vuetify.theme.dark ? "dark" : "light";
			},
		},
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
		methods: {
			langSwitcher() {
				this.langSwitcherImage =
					this.langSwitcherImage == "/landing/english.png"
						? "/landing/china.png"
						: "/landing/english.png";
			},
		},
	};
</script>
