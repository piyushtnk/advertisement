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

	import TableComponent from "~/components/players/associated";

	export default {
		name: "directPlayersList",
		middleware: "authenticate",
		components: {
			TableComponent: TableComponent,
		},
		data: () => ({}),
		methods: {
			...mapActions({ getIpClients: "getAssociatedRegisteredPlayers" }),
			filterForDate(value) {
				this.$store.dispatch("getAssociatedRegisteredPlayers", {
					id: this.$route.query.bannerId,
					param: {
						startDate: value.startDate ? value.startDate : null,
						endDate: value.endDate ? value.endDate : null,
						sort: value.sort,
						limit: value.limit,
						page: value.page,
						search: value.search,
					},
				});
			},
		},
	};
</script>