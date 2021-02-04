<template>
	<div>
		<v-row>
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-alert text type="info">{{ $t("ip.alert") }}.</v-alert>
			</v-col>
		</v-row>

		<!-- Table area -->
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import { mapActions } from "vuex";

	import TableComponent from "~/components/ip/ipTable";

	export default {
		middleware: "authenticate",
		components: {
			TableComponent: TableComponent,
		},
		data: () => ({}),
		methods: {
			...mapActions({ getIpClients: "getIpClients" }),
			filterForDate(value) {
				this.$store.dispatch("getIpClients", {
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