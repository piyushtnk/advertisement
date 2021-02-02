<template>
	<div>
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import TableComponent from "~/components/clients/tableClients";
	import { mapActions } from "vuex";

	export default {
		middleware: "authenticate",
		data() {
			return {};
		},
		components: {
			TableComponent: TableComponent,
		},
		methods: {
			...mapActions({ getClients: "getClients" }),
			filterForDate(value) {
				this.$store.dispatch("getClients", {
					duration: value.duration,
					startDate: value.startDate,
					endDate: value.endDate,
					sort: "id|desc",
					limit: value.limit,
					page: value.page,
				});
			},
		},
		mounted() {},
	};
</script>
