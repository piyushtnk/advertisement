<template>
	<div>
		<!-- Table area -->
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import TableComponent from "~/components/company/b91/reports/betsTable";

	export default {
		middleware: "authenticate",
		components: {
			TableComponent: TableComponent,
		},
		data: () => ({}),
		methods: {
			filterForDate(value) {
				this.$store.dispatch("getBets", {
					startDate: value.startDate ? value.startDate : null,
					endDate: value.endDate ? value.endDate : null,
					sort: value.sort,
					limit: value.limit,
					page: value.page,
					search: value.search,
				});
			},
		},
	};
</script>