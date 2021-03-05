<template>
	<div>
		<!-- Table area -->
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import TableComponent from "~/components/bets/betsTable";

	export default {
		middleware: "authenticate",
		components: {
			TableComponent: TableComponent,
		},
		data: () => ({}),
		methods: {
			filterForDate(value) {
				this.$store.dispatch("getBets", {
					duration: value.duration,
					startDate: value.startDate,
					endDate: value.endDate,
					sort: value.sortBy,
					limit: value.limit,
					page: value.page,
					search: value.search,
				});
			},
		},
	};
</script>