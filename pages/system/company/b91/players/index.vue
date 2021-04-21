<template>
	<div>
		<!-- Table area -->
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import { mapActions } from "vuex";

	import TableComponent from "~/components/company/b91/players/table";

	export default {
		name: "players",
		middleware: "authenticate",
		components: {
			TableComponent: TableComponent,
		},
		data: () => ({}),
		methods: {
			...mapActions({ groupLevels: "groupLevels" }),
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
					vipid: value.vipId,
				});
			},
		},
		mounted() {
			this.groupLevels();
		},
	};
</script>