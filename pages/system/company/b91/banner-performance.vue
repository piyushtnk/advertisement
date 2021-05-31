<template>
	<div>
		<!-- Banner list -->
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import TableComponent from "~/components/company/b91/banners/performance";

	export default {
		middleware: "authenticate",
		data() {
			return {};
		},
		components: {
			TableComponent: TableComponent,
		},
		methods: {
			filterForDate(value) {
				this.$store.dispatch("getBannersPerf", {
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
