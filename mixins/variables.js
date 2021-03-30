export default {
	data: () => ({
		search: {
			column: "",
			value: ""
		},
		date: [
			new Date().toJSON().slice(0, 10).replace(/-/g, "-"),
			new Date().toJSON().slice(0, 10).replace(/-/g, "-")
		],
		defaultFilterDate: 1,
		modal: false,
		options: {},
		loading: true,
		dateRangeText: new Date().toJSON().slice(0, 10).replace(/-/g, "-") + " ~ " + new Date().toJSON().slice(0, 10).replace(/-/g, "-"),
		sortBy: "id|desc"
	}),
	computed: {
		footerProps() {
			return {
				showFirstLastPage: true,
				firstIcon: "mdi-arrow-collapse-left",
				lastIcon: "mdi-arrow-collapse-right",
				prevIcon: "mdi-minus",
				nextIcon: "mdi-plus",
				itemsPerPageText: this.$t("rowsPerPage"),
				itemsPerPageOptions: [10, 50, 100, 500]
			};
		},
		searchByColumn() {
			if (this.search.column != "" && this.search.value != "") {
				let column, value = '';
				column = this.search.column;
				if (this.search.column == 'groupname') { // Deposit table
					if (this.search.value == 'Ordinary' || this.search.value == '普通会员') {
						value = '普通会员';
					} else if (this.search.value == 'New' || this.search.value == '新会员') {
						value = '新会员';
					} else {
						value = this.search.value;
					}


				} else if (this.search.column == 'thirdpartypaymentstaticname') { // Withdrawal table
					if (this.search.value.match(/dt/g)) {
						value = 'DT支付';
					} else if (this.search.value.match(/bank/g)) {
						value = ' ';
					} else {
						value = this.search.value;
					}
				} else { // Other tabs					
					value = this.search.value;
				}
				return column + "|" + value;
			} else {
				return "";
			}
		},
		filterDate() {
			return [
				{
					state: 7,
					abbr: this.$t("all")
				},
				{
					state: 1,
					abbr: this.$t("today")
				},
				{
					state: 2,
					abbr: this.$t("yesterday")
				},
				{
					state: 3,
					abbr: this.$t("thisWeek")
				},
				{
					state: 4,
					abbr: this.$t("lastWeek")
				},
				{
					state: 5,
					abbr: this.$t("thisMonth")
				},
				{
					state: 6,
					abbr: this.$t("lastMonth")
				}
			];
		}
	},
	created() { },
	mounted() { },
	methods: {
		readDataFromAPI() {
			this.loading = true;
			this.beforeSearchMiddleware(this.$route.query);
		},
		whenDialogClosed() {
			if (this.date.length == 2) {
				this.showDateText();
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
			let defaultObjectParams = {};
			defaultObjectParams = {
				duration: this.defaultFilterDate,
				startDate: this.date[0],
				endDate: this.date[1],
				sortBy: this.sortBy,
				limit: this.options.itemsPerPage,
				page: this.options.page
			};

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

			// Deposit Table
			if (this.paymentTypeValue) {
				defaultObjectParams.depositPaymentTypeEnum = this.paymentTypeValue;
			}
			if (this.sequenceValue) {
				defaultObjectParams.sequence = this.sequenceValue;
			}
			if (this.thirdPartyPaymentValue) {
				defaultObjectParams.thirdpartypaymentstaticname = this.thirdPartyPaymentValue;
			}

			// Dynamic Search Object
			defaultObjectParams.search = this.searchByColumn;
			this.$emit("childFilterForDate", defaultObjectParams);
		},
		clearSearchFilter(param) {
			this.search = {
				column: "",
				value: ""
			};
			this.defaultFilterDate = param;
			this.loading = true;

			// Deposit table filter clear
			if (this.thirdPartyPaymentValue) {
				this.thirdPartyPaymentValue = '';
			}
			if (this.sequenceValue) {
				this.sequenceValue = '';
			}
			if (this.paymentTypeValue) {
				this.paymentTypeValue = '';
			}
			// Final search
			this.beforeSearchMiddleware();
		},
		showDateText() {
			this.dateRangeText = this.date.join(" ~ ");
		}
	},
	watch: {
		deep: true,
		defaultFilterDate(value) {
			this.date[1] = this.$moment().format('YYYY-MM-DD');
			switch (value) {
				case 1:
					this.date[0] = this.$moment().format('YYYY-MM-DD');
					break;
				case 2:
					this.date[0] = this.$moment().subtract(1, 'days').format('YYYY-MM-DD');
					this.date[1] = this.$moment().subtract(1, 'days').format('YYYY-MM-DD');
					break;
				case 3:
					this.date[0] = this.$moment().startOf('week').format('YYYY-MM-DD');
					break;
				case 4:
					this.date[0] = this.$moment().subtract(7, 'days').startOf('week').format('YYYY-MM-DD');
					this.date[0] = this.$moment().subtract(7, 'days').endOf('week').format('YYYY-MM-DD');
					break;
				case 5:
					this.date[0] = this.$moment().startOf('month').format('YYYY-MM-DD');
					break;
				case 6:
					this.date[0] = this.$moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
					this.date[1] = this.$moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
					break;
				case 7:
					this.date[0] = this.$moment('2021-01-26').format('YYYY-MM-DD');
					break;

				default:
					this.date[0] = this.$moment().format('YYYY-MM-DD');
					this.date[1] = this.$moment().format('YYYY-MM-DD');
					break;
			};
			this.showDateText();
		},
		options: {
			handler(filter) {
				if (filter.sortBy.length > 0) {
					const sortType = filter.sortDesc[0] == true ? "desc" : "asc";
					this.sortBy = filter.sortBy[0] + "|" + sortType;
				}
				this.readDataFromAPI();
			},
		},

	}
};
