import colors from "vuetify/es5/util/colors";
// require('dotenv').config();

const env = {
	API_URL: process.env.API_URL,
	CLOUD_URL: process.env.CLOUD_URL
};

export default {
	// Environment variable
	env: {
		API_URL: env.API_URL,
		CONTACT_DEV: "Something went wrong, contact your developer.",
		// IP_API: '48770181ed644728bb63657058b35289'
	},
	// Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
	ssr: false,
	loading: { color: '#3B8070' },
	components: true,
	telemetry: false, // Are you interested in participating.

	/* router: {
		// middleware: ["authenticate", "notAuthenticate"]		
	}, */
	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		titleTemplate: "%s - System Panel",
		title: "Advertisement",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "Analytics - Advertisement system panel" }
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: [],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [
		{ src: "~/plugins/axios.js" },
		{ src: '~/plugins/amCharts.js', ssr: false },
		{ src: '~/plugins/gtm' }
	],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// https://go.nuxtjs.dev/vuetify
		"@nuxtjs/vuetify",
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: [
		// https://go.nuxtjs.dev/axios
		// Axios module configuration (https://go.nuxtjs.dev/config-axios)
		["@nuxtjs/axios", {
			baseURL: env.API_URL,
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

		// google tag manager
		['@nuxtjs/gtm', {
			id: process.env.GTM_ID || 'GTM-MLBJTTQ',
			enabled: true, // debug-only version of $gtm during development
			debug: false,

			layer: 'dataLayer',
			variables: {},

			pageTracking: true,
			pageViewEventName: 'nuxtRoute',

			autoInit: true,
			respectDoNotTrack: true,

			scriptId: 'gtm-script',
			scriptDefer: true,
			scriptURL: 'https://www.googletagmanager.com/gtm.js',
			crossOrigin: false,

			noscript: true,
			noscriptId: 'gtm-noscript',
			noscriptURL: 'https://www.googletagmanager.com/ns.html'
		}]
	],


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
				},
				light: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				},
			}
		}
	},



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

			// Normal config
			config.module.rules.push({
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader: 'file-loader'
			})

			if (ctx && ctx.isClient) {
				config.optimization.splitChunks.maxSize = 51200
			}
		},
	}
};
