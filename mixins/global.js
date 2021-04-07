export default {
	data: () => ({
	}),
	computed: {},
	created() { },
	mounted() { },
	methods: {
		numberFormat(value) {
			if (typeof value == 'number' || typeof value == 'float') {
				return value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			} else {
				return value;
			}
		},

		staticNumberFormat(value) {
			if (typeof value == 'number' || typeof value == 'float') {
				return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			} else {
				return value;
			}
		},

		// Convert to VND currency
		convertToVND(amount) {
			return amount * 1000;
		},

		fixParameters(value) {
			if (value == null || value == 'null') {
				return '-';
			} else {
				return value;
			}
		},

		isNull(value) {
			if (value == null || value == 'null') {
				return ' ';
			} else {
				return value;
			}
		},

		isNullNumber(value) {
			if (value == null) {
				return 0;
			} else {
				return this.staticNumberFormat(parseInt(value));
			}
		},

		isNullValue(value) {
			if (value == null) {
				return 0;
			} else {
				return this.numberFormat(this.convertToVND(parseFloat(value)));
			}
		},

		copyToClipboard(text) {
			var dummy = document.createElement("textarea");
			document.body.appendChild(dummy);
			dummy.value = text;
			dummy.select();
			document.execCommand("copy");
			document.body.removeChild(dummy);
		},

		removeSpace(text) {
			if (text) {
				return text.replace(/\s+/g, "");
			} else {
				return text;
			}
		},

	},
	watch: {}
}