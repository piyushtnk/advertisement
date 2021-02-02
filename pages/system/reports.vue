<template>
	<div>
		<!-- Table area -->
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import { mapActions } from "vuex";

	import TableComponent from "~/components/reports/tableReports";

	export default {
		middleware: "authenticate",
		components: {
			TableComponent: TableComponent,
		},
		data: () => ({}),
		methods: {
			...mapActions({ getPlayers: "getPlayers" }),
			filterForDate(value) {
				this.$store.dispatch("getPlayers", {
					duration: value.duration,
					startDate: value.startDate,
					endDate: value.endDate,
					sort: "id|desc",
					limit: value.limit,
					page: value.page,
				});
			},
		},
		mounted() {
			// this.getDashboard();
			// this.getStats({ filterForCounter: 1, startDate: null, endDate: null });
		},
	};
</script>