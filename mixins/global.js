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