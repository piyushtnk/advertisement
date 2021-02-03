export default {
	data: () => ({
		search: "",
		date: [],
		modal: false,
		defaultFilterDate: 1,
		options: {},
		loading: true,
		filterDate: [
			{
				state: 7,
				abbr: "All Time",
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
		}
	}),
	computed: {
		dateRangeText() {
			return this.date.join(" ~ ");
		},
	},
	mounted() {
		// Hitting parents.
		this.$emit("childFilterForDate", {
			duration: this.defaultFilterDate,
			startDate: this.date[0],
			endDate: this.date[1],
			sort: "id|desc",
			limit: this.options.itemsPerPage,
			page: this.options.page,
		});
	},
	methods: {
		readDataFromAPI() {
			this.loading = true;
			const { page, itemsPerPage } = this.options;
			// Hitting parents.
			this.$emit("childFilterForDate", {
				duration: this.defaultFilterDate,
				startDate: this.date[0],
				endDate: this.date[1],
				sort: "id|desc",
				limit: itemsPerPage,
				page: page,
			});
		},
		whenDialogClosed() {
			if (this.date.length == 2) {
				this.$emit("childFilterForDate", {
					startDate: this.date[0],
					endDate: this.date[1],
					sort: "id|desc",
					limit: this.options.itemsPerPage,
					page: this.options.page,
				});
			}
		},
		arrayToText(value) {
			if (Array.isArray(value)) {
				return value[0];
			} else {
				return value;
			}
		},
	},
	watch: {
		defaultFilterDate(value) {
			this.$emit("childFilterForDate", {
				duration: value,
				sort: "id|desc",
				limit: this.options.itemsPerPage,
				page: this.options.page,
			});
		},
		deep: true,
		options: {
			handler() {
				this.readDataFromAPI();
			},
		},
	}
}