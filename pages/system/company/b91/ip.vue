<template>
	<div>
		<v-row>
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-alert text type="info">{{ $t("ipAlert") }}.</v-alert>
			</v-col>
		</v-row>

		<!-- Table area -->
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import { mapActions } from "vuex";

	import TableComponent from "~/components/company/b91/ip/ipTable";

	export default {
		name: "ip",
		middleware: "authenticate",
		components: {
			TableComponent: TableComponent,
		},
		data: () => ({}),
		methods: {
			// ...mapActions({ getIpClients: "getIpClients" }),
			filterForDate(value) {
				this.$store.dispatch("system/banner/getIpClients", {
					startDate: value.startDate ? value.startDate : null,
					endDate: value.endDate ? value.endDate : null,
					sort: value.sort,
					limit: value.limit,
					page: value.page,
					search: value.search,
					bannerId: value.bannerId,
				});
			},
		},
	};
</script>