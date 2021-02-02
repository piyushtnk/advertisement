<template>
	<div>
		<v-row>
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-alert text type="info"
					>These players details of registered players list.</v-alert
				>
			</v-col>
		</v-row>

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
				});
			},
		},
		mounted() {
			// this.getDashboard();
			// this.getStats({ filterForCounter: 1, startDate: null, endDate: null });
		},
	};
</script>