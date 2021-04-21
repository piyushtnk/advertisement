<template>
	<div>
		<!-- Table area -->
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import TableComponent from "~/components/company/b91/players/bannerPlayerList";

	export default {
		name: "directPlayersList",
		middleware: "authenticate",
		components: {
			TableComponent: TableComponent,
		},
		data: () => ({}),
		methods: {
			filterForDate(value) {
				this.$store.dispatch("getBannerRegisteredPlayers", {
					id: this.$route.query.bannerId,
					param: {
						startDate: value.startDate ? value.startDate : null,
						endDate: value.endDate ? value.endDate : null,
						sort: value.sort,
						limit: value.limit,
						page: value.page,
						search: value.search,
						type:
							this.$route.query.type == "directPlayers"
								? "direct"
								: "associated",
					},
				});
			},
		},
	};
</script>