<template>
	<div>
		<!-- Table area -->
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import TableComponent from "~/components/company/b91/bonusHunter/bonusHunterTable";

	export default {
		name: "bonusHunter",
		middleware: "authenticate",
		components: {
			TableComponent: TableComponent,
		},
		data: () => ({}),
		methods: {
			// ...mapActions({ getIpClients: "getIpClients" }),
			filterForDate(value) {
				this.$store.dispatch("bonusHunters", {
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