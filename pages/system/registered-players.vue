<template>
	<div>
		<v-row>
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-alert text type="info"
					>{{ $t("registeredPlayersAlert") }}.</v-alert
				>
			</v-col>
		</v-row>
		<!-- Table area -->
		<TableComponent />
	</div>
</template>

<script>
	import TableComponent from "~/components/players/registered";

	export default {
		middleware: "authenticate",
		components: {
			TableComponent: TableComponent,
		},
		data: () => ({}),
		methods: {},
	};
</script>