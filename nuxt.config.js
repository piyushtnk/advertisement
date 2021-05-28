import colors from "vuetify/es5/util/colors";

export default {
	// Environment variable
	env: {
		CONTACT_DEV: "Something went wrong, contact your developer.",
	},
	ssr: false, // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
	loading: {
		color: 'red',
	},
	components: true,
	telemetry: false, // Are you interested in participating.

	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		titleTemplate: "%s - System Panel",
		title: "999.money",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "999.money - Analytics custom advertisement system panel" }
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },

		]
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: [],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [
		{ src: "~/plugins/axios.js" },
		{ src: "~/plugins/global-mixin.js" },
	],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// https://go.nuxtjs.dev/vuetify
		["@nuxtjs/vuetify", {
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
						success: colors.green.accent3,
					},
					light: {
						primary: colors.blue.darken2,
						accent: colors.grey.darken3,
						secondary: colors.amber.darken3,
						info: colors.teal.lighten1,
						warning: colors.amber.base,
						error: colors.deepOrange.accent4,
						success: colors.green.accent3,
					},
				},
				options: {
					themeCache: {
						get: key => localStorage.getItem(key),
						set: (key, value) => localStorage.setItem(key, value),
					},
				},
			}
		}],
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: [
		// https://go.nuxtjs.dev/axios
		["@nuxtjs/axios", {
			baseURL: process.env.API_URL,
			debug: process.env.NODE_ENV == "development" ? true : false,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		}],
		// https://go.nuxtjs.dev/pwa
		"@nuxtjs/pwa",
		// https://go.nuxtjs.dev/content
		"@nuxt/content",
		// https://i18n.nuxtjs.org/setup
		["nuxt-i18n", {
			locales: [
				{
					name: 'English',
					code: "en",
					iso: 'en-US',
					file: 'en-US.js'
				},
				{
					name: '中文',
					code: "zh",
					iso: 'zh-CN',
					file: 'zh-CN.js'
				},
			],
			lazy: true,
			langDir: 'locales/',
			defaultLocale: 'en',
			// strategy: 'prefix',
			strategy: 'prefix_except_default',
			seo: true,
			loadLanguagesAsync: true,
			detectBrowserLanguage: {
				useCookie: true,
				alwaysRedirect: true,
			},
			vueI18n: {
				locale: 'en',
				fallbackLocale: 'en',
			},
		}],

		// High chart - https://github.com/richardeschloss/nuxt-highcharts
		['nuxt-highcharts', { /* module options */ }],

		// https://www.npmjs.com/package/nuxt-user-agent
		"nuxt-user-agent",

		// Cookie manager
		['cookie-universal-nuxt', { alias: 'cookie' }],

		// dotenv
		'@nuxtjs/dotenv',

		// Moment js
		['@nuxtjs/moment', {
			defaultTimezone: 'Asia/Singapore'
		}],

		// Google Tag Manager
		['@nuxtjs/google-tag-manager', {
			debug: process.env.NODE_ENV == "development" ? true : false,
			enabled: true,
			id: process.env.GTM,
			pageTracking: true,
		}],
	],

	// Content module configuration (https://go.nuxtjs.dev/config-content)
	content: {},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {
		extend(config, ctx) {
			// Client configuration 
			if (ctx.isClient) {
				config.externals = function (context, request, callback) {
					if (/xlsx|canvg|pdfmake/.test(request)) {
						return callback(null, "commonjs " + request);
					}
					callback();
				}
			}
			// Development configuration
			if (ctx.isDev) {
				config.mode = 'development'
			}
		},
	}
};
