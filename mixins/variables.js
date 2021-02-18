console.log(this);
export default {
	data: () => ({
		search: {
			column: '',
			value: ''
		},
		date: [],
		modal: false,
		defaultFilterDate: 1,
		options: {},
		loading: true,
		// filterDate: [
		// 	{
		// 		state: 7,
		// 		abbr: this.$t("all") + " (From - 26/01/2021)",
		// 	},
		// 	{
		// 		state: 1,
		// 		abbr: this.$t("today"),
		// 	},
		// 	{
		// 		state: 2,
		// 		abbr: this.$t("yesterday"),
		// 	},
		// 	{
		// 		state: 3,
		// 		abbr: this.$t("thisWeek"),
		// 	},
		// 	{
		// 		state: 4,
		// 		abbr: this.$t("lastWeek"),
		// 	},
		// 	{
		// 		state: 5,
		// 		abbr: this.$t("thisMonth"),
		// 	},
		// 	{
		// 		state: 6,
		// 		abbr: this.$t("lastMonth"),
		// 	},
		// ],
		sortBy: 'id|desc',
	}),
	computed: {
		footerProps() {
			return {
				showFirstLastPage: true,
				firstIcon: 'mdi-arrow-collapse-left',
				lastIcon: 'mdi-arrow-collapse-right',
				prevIcon: 'mdi-minus',
				nextIcon: 'mdi-plus',
				itemsPerPageText: this.$t('rowsPerPage'),
				itemsPerPageOptions: [
					5,
					10,
					15,
					100,
					200,
					500,
					1000,
				],
			}
		},
		dateRangeText() {
			return this.date.join(" ~ ");
		},
		searchByColumn() {
			if (this.search.column != '' && this.search.value != '') {
				return this.search.column + '|' + this.search.value;
			} else {
				return '';
			}
		},
		filterDate() {
			return [
				{
					state: 7,
					abbr: this.$t('all') + " (From - 26/01/2021)",
				},
				{
					state: 1,
					abbr: this.$t('today'),
				},
				{
					state: 2,
					abbr: this.$t('yesterday'),
				},
				{
					state: 3,
					abbr: this.$t('thisWeek'),
				},
				{
					state: 4,
					abbr: this.$t('lastWeek'),
				},
				{
					state: 5,
					abbr: this.$t('thisMonth'),
				},
				{
					state: 6,
					abbr: this.$t('lastMonth'),
				},
			]
		}
	},
	created() {

	},
	mounted() {
		// this.beforeSearchMiddleware();
	},
	methods: {
		readDataFromAPI() {
			this.loading = true;
			this.beforeSearchMiddleware(this.$route.query);
		},
		whenDialogClosed() {
			if (this.date.length == 2) {
				this.defaultFilterDate = null;
			}
		},
		arrayToText(value) {
			if (Array.isArray(value)) {
				return value[0];
			} else {
				return value;
			}
		},
		beforeSearchMiddleware(value) {
			this.loading = true;
			let defaultObjectParams = {
				duration: this.defaultFilterDate,
				startDate: this.date[0],
				endDate: this.date[1],
				sortBy: this.sortBy,
				limit: this.options.itemsPerPage,
				page: this.options.page,
			}

			// Route: system/clients parameters
			if (value) {
				if (value.unique) {
					defaultObjectParams.unique = value.unique;
				}
				if (value.filterType) {
					defaultObjectParams.duration = value.filterType;
				}
				if (value.topUp) {
					defaultObjectParams.topUp = value.topUp;
				}
				if (value.device) {
					this.search.column = "cDeviceType";
					this.search.value = value.device;
				}
				if (value.browser) {
					this.search.column = "cBrowser";
					this.search.value = value.browser;
				}
				if (value.os) {
					this.search.column = "cOs";
					this.search.value = value.os;
				}
				if (value.bannerId) {
					defaultObjectParams.bannerId = value.bannerId;
				}
			}

			// If players API got called.			
			if (this.playersType >= 0) {
				defaultObjectParams.registerWithUs = this.playersType;
			}

			// Dynamic Search Object
			defaultObjectParams.search = this.searchByColumn;

			this.$emit("childFilterForDate", defaultObjectParams);
		},
		clearSearchFilter() {
			this.date = [];
			this.search = {
				column: '',
				value: ''
			};
			this.defaultFilterDate = 1;
			this.loading = true;
			this.beforeSearchMiddleware();
		}
	},
	watch: {
		defaultFilterDate(value) {
			this.defaultFilterDate = value;
			this.date = [];
		},
		deep: true,
		options: {
			handler() {
				this.readDataFromAPI();
			},
		},
	}
}