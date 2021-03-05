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
			:mini-variant="miniVariant"
			:clipped="clipped"
			fixed
			app
		>
			<v-list>
				<v-list-item
					v-for="(item, i) in items"
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
		</v-navigation-drawer>
		<v-app-bar :clipped-left="clipped" fixed app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-toolbar-title v-text="title" />
			<v-spacer />

			<!-- LoggedIn user -->
			<v-menu offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on">
						<v-icon>mdi-account</v-icon>
					</v-btn>
				</template>
				<v-list>
					<v-list-item>
						<v-list-item
							>Welcome,
							{{
								$cookie.get("user").firstName +
								" " +
								$cookie.get("user").lastName
							}}
						</v-list-item>
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
									{{ item.text.toUpperCase() }}
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
		data() {
			return {
				clipped: false,
				drawer: false,
				fixed: false,
				items: [
					{
						icon: "mdi-home",
						title: "layout.dashboard",
						to: "/system",
						color: "white",
					},
					{
						icon: "mdi-chart-bar",
						title: "layout.statistics",
						to: "/system/statistics",
						color: "white",
					},
					{
						icon: "mdi-image",
						title: "layout.banner",
						to: "/system/banner",
						color: "white",
					},
					{
						icon: "mdi-account-group",
						title: "layout.clients",
						to: "/system/clients",
						color: "white",
					},
					{
						icon: "mdi-account-arrow-left",
						title: "layout.players",
						to: "/system/players",
						color: "white",
					},
					{
						icon: "mdi-clipboard-file",
						title: "layout.reports",
						to: "/system/reports",
						color: "white",
					},
					// {
					// 	icon: "mdi-account-switch",
					// 	title: "layout.otherPlayers",
					// 	to: "/system/other-players",
					// },
					{
						icon: "mdi-ip",
						title: "layout.ipClients",
						to: "/system/ip",
						color: "white",
					},
					{
						icon: "mdi-account-cash",
						title: "layout.deposit",
						to: "/system/deposit",
						color: "white",
					},
					{
						icon: "mdi-cash-refund",
						title: "layout.withdrawals",
						to: "/system/withdrawals",
						color: "white",
					},
					{
						icon: "mdi-poker-chip",
						title: "layout.bets",
						to: "/system/bets",
						color: "white",
					},
					{
						icon: "mdi-information",
						title: "layout.information",
						to: "/system/information",
						color: "white",
					},
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
				return this.$t("layout.systemPanel");
			},
		},
	};
</script>
