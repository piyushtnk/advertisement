export default {
	data: () => ({
	}),
	computed: {},
	created() { },
	mounted() { },
	methods: {
		numberFormat(value) {
			if (typeof value == 'number') {
				return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
	},
	watch: {}
}