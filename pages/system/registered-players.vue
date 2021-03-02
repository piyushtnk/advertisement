<template>
	<div>
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