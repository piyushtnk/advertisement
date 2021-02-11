<template>
	<div>
		<!-- Table area -->
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import { mapActions } from "vuex";

	import TableComponent from "~/components/players/table";

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
					sortBy: value.sortBy,
					limit: value.limit,
					page: value.page,
					search: value.search,
					registerWithUs: value.registerWithUs,
					topUp: value.topUp,
				});
			},
		},
	};
</script>