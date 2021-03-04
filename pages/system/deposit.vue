<template>
	<div>
		<!-- Table area -->
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import TableComponent from "~/components/deposit/depositTable";

	export default {
		middleware: "authenticate",
		components: {
			TableComponent: TableComponent,
		},
		data: () => ({}),
		methods: {
			filterForDate(value) {
				this.$store.dispatch("getDeposit", {
					duration: value.duration,
					startDate: value.startDate,
					endDate: value.endDate,
					sort: value.sortBy,
					limit: value.limit,
					page: value.page,
					search: value.search,
					bannerId: value.bannerId,
				});
			},
		},
	};
</script>