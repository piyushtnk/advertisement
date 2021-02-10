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
		filterDate: [
			{
				state: 7,
				abbr: "All (From - 26/01/2021)",
			},
			{
				state: 1,
				abbr: "Today",
			},
			{
				state: 2,
				abbr: "Yesterday",
			},
			{
				state: 3,
				abbr: "This Week",
			},
			{
				state: 4,
				abbr: "Last Week",
			},
			{
				state: 5,
				abbr: "This Month",
			},
			{
				state: 6,
				abbr: "Last Month",
			},
		],
		footerProps: {
			showFirstLastPage: true,
			firstIcon: 'mdi-arrow-collapse-left',
			lastIcon: 'mdi-arrow-collapse-right',
			prevIcon: 'mdi-minus',
			nextIcon: 'mdi-plus',
			itemsPerPageOptions: [
				5,
				10,
				15,
				100,
				200,
				500,
				1000,
			],
		},
		sortBy: 'id|desc',
	}),
	computed: {
		dateRangeText() {
			return this.date.join(" ~ ");
		},
		searchByColumn() {
			if (this.search.column != '' && this.search.value != '') {
				return this.search.column + '|' + this.search.value;
			} else {
				return '';
			}
		}
	},
	mounted() {
		this.beforeSearchMiddleware();
	},
	methods: {
		readDataFromAPI() {
			this.loading = true;
			this.beforeSearchMiddleware();
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
				search: this.searchByColumn
			}

			// If players API got called.			
			if (this.playersType >= 0) {
				defaultObjectParams.registerWithUs = this.playersType;
			}

			// Route: system/clients			
			if (this.clientUnique) {
				defaultObjectParams.unique = this.clientUnique;
			}
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