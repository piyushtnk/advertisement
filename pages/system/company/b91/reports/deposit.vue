<template>
	<div>
		<!-- Table area -->
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import TableComponent from "~/components/company/b91/reports/depositTable";

	export default {
		name: "deposit",
		middleware: "authenticate",
		components: {
			TableComponent: TableComponent,
		},
		data: () => ({}),
		methods: {
			filterForDate(value) {
				this.$store.dispatch("getDeposit", {
					startDate: value.startDate ? value.startDate : null,
					endDate: value.endDate ? value.endDate : null,
					sort: value.sort,
					limit: value.limit,
					page: value.page,
					search: value.search,
					depositPaymentTypeEnum: value.depositPaymentTypeEnum,
					thirdpartypaymentcode: value.thirdpartypaymentcode,
					sequence: value.sequence,
					platform: value.platform,
				});
			},
		},
	};
</script>