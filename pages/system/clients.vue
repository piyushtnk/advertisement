<template>
	<div>
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import TableComponent from "~/components/clients/tableClients";

	export default {
		middleware: "authenticate",
		data() {
			return {};
		},
		components: {
			TableComponent: TableComponent,
		},
		methods: {
			// ...mapActions({ getClients: "getClients" }),
			filterForDate(value) {
				this.$store.dispatch("getClients", {
					startDate: value.startDate ? value.startDate : null,
					endDate: value.endDate ? value.endDate : null,
					sort: value.sortBy,
					limit: value.limit,
					page: value.page,
					search: value.search,
					unique: value.unique,
					topup: value.topUp,
					bannerId: value.bannerId,
				});
			},
		},
		mounted() {},
	};
</script>
