import colors from "vuetify/es5/util/colors";

const env = {
	API_URL: "http://34.87.169.84/api/"
};

export default {
	// Environment variable
	env: {
		API_URL: env.API_URL,
		CONTACT_DEV: "Something went wrong, contact your developer."
	},
	// Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
	ssr: false,

	components: true,
	//   router: {
	//     middleware: ["authenticate", "notAuthenticate"]
	//   },
	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		titleTemplate: "%s - advertisement",
		title: "advertisement",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "" }
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: [],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [
		{ src: "~/plugins/axios.js" },
		{ src: "~/plugins/fingerprint.js", ssr: false }
	],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// https://go.nuxtjs.dev/vuetify
		"@nuxtjs/vuetify"
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: [
		// https://go.nuxtjs.dev/axios
		"@nuxtjs/axios",
		// https://go.nuxtjs.dev/pwa
		"@nuxtjs/pwa",
		// https://go.nuxtjs.dev/content
		"@nuxt/content",
		// https://i18n.nuxtjs.org/setup
		"nuxt-i18n",
		// https://www.npmjs.com/package/nuxt-user-agent
		"nuxt-user-agent",
	],

	//   Multi language support
	i18n: {
		seo: true,
		detectBrowserLanguage: {
			useCookie: true,
			alwaysRedirect: true,
		},
		loadLanguagesAsync: true,
		langDir: "locales/",
		defaultLocale: "en",
		lazy: true,
		vueI18n: {
			locale: 'en',
			fallbackLocale: 'en',
		},
		locales: [
			{
				name: 'English',
				code: "en",
				iso: "en-US",
				file: "en-US.js"
			},
			{
				name: '中文',
				code: "zh",
				iso: "zh-CN",
				file: "zh-CN.js"
			}
		],
	},

	// Axios module configuration (https://go.nuxtjs.dev/config-axios)
	axios: {
		baseURL: env.API_URL,
		debug: process.env.NODE_ENV == "development" ? true : false,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	},

	// Content module configuration (https://go.nuxtjs.dev/config-content)
	content: {},

	// Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
	vuetify: {
		customVariables: ["~/assets/variables.scss"],
		theme: {
			dark: true,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				}
			}
		}
	},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {}
};
