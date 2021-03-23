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
					startDate: value.startDate ? value.startDate : null,
					endDate: value.endDate ? value.endDate : null,
					sort: value.sortBy,
					limit: value.limit,
					page: value.page,
					search: value.search,
					registerus: value.registerWithUs,
					topup: value.topUp,
				});
			},
		},
	};
</script>