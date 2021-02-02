<template>
	<div>
		<v-row>
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-alert text type="info"
					>These players details of other than registered
					players(Example. SMS, etc.).</v-alert
				>
			</v-col>
		</v-row>

		<!-- Table area -->
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import { mapActions } from "vuex";

	import TableComponent from "~/components/otherPlayers/otherPlayersTable";

	export default {
		middleware: "authenticate",
		components: {
			TableComponent: TableComponent,
		},
		data: () => ({}),
		methods: {
			...mapActions({ getOtherPlayers: "getOtherPlayers" }),
			filterForDate(value) {
				this.$store.dispatch("getOtherPlayers", {
					duration: value.duration,
					startDate: value.startDate,
					endDate: value.endDate,
					sort: "id|desc",
					limit: value.limit,
					page: value.page,
				});
			},
		},
	};
</script>