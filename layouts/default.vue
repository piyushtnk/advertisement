<template>
	<v-app dark>
		<!-- Snackbar -->
		<v-snackbar v-model="snackbar" right top>
			{{ snackbarText }}

			<template v-slot:action="{ attrs }">
				<v-btn
					color="pink"
					text
					v-bind="attrs"
					@click="snackbar = false"
				>
					Close
				</v-btn>
			</template>
		</v-snackbar>
		<v-btn dark @click="snackbar = true"> Open Snackbar </v-btn>
		<!-- Navigation -->
		<v-navigation-drawer
			v-model="drawer"
			:mini-variant.sync="miniVariant"
			:clipped="clipped"
			floating
			app
			class="border"
		>
			<!-- Ads Menu -->
			<v-list rounded>
				<!-- B91 menu -->
				<v-list-group
					no-action
					sub-group
					v-for="(item, i) in adsMenu"
					:key="i"
					:to="localePath(item.to)"
					router
					exact
					v-if="item.children"
				>
					<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title>{{
								$t(item.title)
							}}</v-list-item-title>
						</v-list-item-content>
					</template>

					<v-list-item
						v-for="(itemChild, iChild) in item.children"
						:key="iChild"
						:to="localePath(itemChild.to)"
						router
						exact
					>
						<v-list-item-title
							v-text="$t(itemChild.title)"
						></v-list-item-title>

						<v-list-item-icon>
							<v-icon v-text="itemChild.icon"></v-icon>
						</v-list-item-icon>
					</v-list-item>
				</v-list-group>

				<v-list-item
					v-else
					:key="i"
					:to="localePath(item.to)"
					router
					exact
				>
					<v-list-item-action>
						<v-icon :color="item.color">{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="$t(item.title)" />
					</v-list-item-content>
				</v-list-item>
			</v-list>

			<!-- Divider -->
			<v-divider></v-divider>

			<!-- Clients menu -->
			<v-list rounded>
				<!-- B91 menu -->
				<v-list-group
					no-action
					sub-group
					v-for="(item, i) in clientMenu"
					:key="i"
					:to="localePath(item.to)"
					router
					exact
					v-if="item.children"
				>
					<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title>{{
								$t(item.title)
							}}</v-list-item-title>
						</v-list-item-content>
					</template>

					<v-list-item
						v-for="(itemChild, iChild) in item.children"
						:key="iChild"
						:to="localePath(itemChild.to)"
						router
						exact
					>
						<v-list-item-title
							v-text="$t(itemChild.title)"
						></v-list-item-title>

						<v-list-item-icon>
							<v-icon v-text="itemChild.icon"></v-icon>
						</v-list-item-icon>
					</v-list-item>
				</v-list-group>

				<v-list-item
					v-else
					:key="i"
					:to="localePath(item.to)"
					router
					exact
				>
					<v-list-item-action>
						<v-icon :color="item.color">{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="$t(item.title)" />
					</v-list-item-content>
				</v-list-item>
			</v-list>

			<template v-slot:append>
				<div class="pa-2">
					<v-btn block v-on:click="logout">
						<v-icon>mdi-logout</v-icon> {{ $t("logout") }}
					</v-btn>
				</div>
			</template>
		</v-navigation-drawer>
		<v-app-bar :clipped-left="clipped" fixed app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-toolbar-title v-text="title" />

			<v-spacer />

			<!-- Dark mode -->
			<div class="mt-5">
				<v-tooltip left>
					<template v-slot:activator="{ on, attrs }">
						<div v-bind="attrs" v-on="on">
							<v-switch v-model="isThemeDark" inset></v-switch>
						</div>
					</template>
					<span>{{ $t("theme") }}</span>
				</v-tooltip>
			</div>

			<!-- LoggedIn user -->
			<v-menu offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on">
						<v-icon>mdi-account</v-icon>
					</v-btn>
				</template>
				<v-list>
					<v-list-item>
						<v-list-item>Welcome, {{ name }} </v-list-item>
					</v-list-item>
				</v-list>
			</v-menu>
			<!-- Language change -->
			<v-menu offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on">
						<v-icon>mdi-translate</v-icon>
					</v-btn>
				</template>
				<v-list>
					<v-list-item>
						<nuxt-link
							v-for="locale in availableLocales"
							:key="locale.code"
							:to="switchLocalePath(locale.code)"
						>
							<v-list-item>
								{{ locale.name }}
							</v-list-item>
						</nuxt-link>
					</v-list-item>
				</v-list>
			</v-menu>

			<!-- Logout button -->
			<v-btn icon v-on:click="logout">
				<v-icon>mdi-logout</v-icon>
			</v-btn>
		</v-app-bar>
		<v-main>
			<v-container fluid>
				<v-row no-gutters>
					<v-col>
						<v-breadcrumbs
							:items="breadcrumbsItems"
							large
							class="pl-0 pt-0"
						>
							<template v-slot:item="{ item }">
								<v-breadcrumbs-item
									:href="item.href"
									:disabled="item.disabled"
								>
									{{ $t(item.text).toUpperCase() }}
								</v-breadcrumbs-item>
							</template>
						</v-breadcrumbs>
					</v-col>
				</v-row>
				<nuxt />
			</v-container>
		</v-main>
		<v-footer :absolute="!fixed" app>
			<span
				>&copy; {{ new Date().getFullYear() }} | TNK Consultant & Co.
				Ltd.</span
			>
		</v-footer>
	</v-app>
</template>

<script>
	export default {
		name: "defaultLayout",
		data() {
			return {
				clipped: false,
				drawer: false,
				fixed: false,
				adsMenu: [
					{
						icon: "mdi-home",
						title: "dashboard",
						to: "/system",
						color: "",
					},
					{
						icon: "mdi-image",
						title: "bannerManagement",
						to: "/system/banner",
						color: "",
					},
					{
						icon: "mdi-account-group",
						title: "adsClick",
						to: "/system/clients",
						color: "",
					},
					{
						icon: "mdi-chart-line",
						title: "adsCharts",
						to: "/system/ads-charts",
						color: "",
					},
					{
						icon: "mdi-graph",
						title: "adsStatistics",
						to: "/system/ads-statistics",
						color: "",
					},
				],
				clientMenu: [
					// {
					// 	icon: "mdi-chart-areaspline",
					// 	title: "charts",
					// 	to: "/system/charts",
					// 	color: "",
					// },
					// {
					// 	icon: "mdi-chart-bar",
					// 	title: "statistics",
					// 	to: "/system/statistics",
					// 	color: "",
					// },
					// {
					// 	icon: "mdi-flash-alert",
					// 	title: "bannerPerf",
					// 	to: "/system/banner/performance",
					// 	color: "",
					// },
					// {
					// 	icon: "mdi-account-arrow-left",
					// 	title: "member",
					// 	to: "/system/players",
					// 	color: "",
					// },
					// {
					// 	icon: "mdi-clipboard-file",
					// 	title: "reports",
					// 	to: "/system/reports",
					// 	color: "",
					// 	children: [
					// 		{
					// 			icon: "mdi-account-cash",
					// 			title: "deposit",
					// 			to: "/system/deposit",
					// 			color: "",
					// 		},
					// 		{
					// 			icon: "mdi-cash-refund",
					// 			title: "withdrawals",
					// 			to: "/system/withdrawals",
					// 			color: "",
					// 		},
					// 		{
					// 			icon: "mdi-poker-chip",
					// 			title: "bets",
					// 			to: "/system/bets",
					// 			color: "",
					// 		},
					// 	],
					// },
					// {
					// 	icon: "mdi-ip",
					// 	title: "ipClients",
					// 	to: "/system/ip",
					// 	color: "",
					// },
					// {
					// 	icon: "mdi-cash-lock",
					// 	title: "bonusHunter",
					// 	to: "/system/bonus-hunter",
					// 	color: "",
					// },
					// {
					// 	icon: "mdi-information",
					// 	title: "information",
					// 	to: "/system/information",
					// 	color: "",
					// },
				],
				miniVariant: false,
				right: true,
				rightDrawer: false,
			};
		},
		methods: {
			logout() {
				const success = this.$store.dispatch("logout");
				if (success) {
					this.$router.push(this.localePath("/login"));
				}
			},
		},
		computed: {
			isThemeDark: {
				get() {
					return this.$cookie.get("dark");
				},
				set(value) {
					this.$cookie.set("dark", value);
					this.$vuetify.theme.dark = value;
				},
			},
			snackbarText() {
				return this.$store.state.Default.snackbarText;
			},
			snackbar: {
				get: function () {
					return this.$store.state.Default.snackbarVisible;
				},
				set: function (value) {
					this.$store.dispatch("setSnackbarVisible", value);
				},
			},
			breadcrumbsItems() {
				const fullPath = this.$route.fullPath;
				const params = fullPath.startsWith("/")
					? fullPath.substring(1).split("/")
					: fullPath.split("/");
				const crumbs = [];
				let path = "";
				params.forEach((param, index) => {
					path = `${path}/${param}`;
					const match = this.$router.match(path);
					if (match.name !== null) {
						crumbs.push({
							text: param.replace(/-/g, " "),
							disabled:
								match.fullPath == this.$route.path ? true : false,
							href: match.fullPath,
						});
					}
				});
				return crumbs;
			},
			availableLocales() {
				return this.$i18n.locales.filter(
					(i) => i.code !== this.$i18n.locale
				);
			},
			title() {
				return this.$t("systemPanel");
			},
			name() {
				if (this.$cookie.get("user")) {
					return (
						this.$cookie.get("user").firstName +
						" " +
						this.$cookie.get("user").lastName
					);
				} else {
					return "";
				}
			},
		},
	};
</script>
