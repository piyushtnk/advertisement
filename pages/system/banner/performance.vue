<template>
	<div>
		<!-- Banner list -->
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import TableComponent from "~/components/banners/performance";

	export default {
		middleware: "authenticate",
		data() {
			return {};
		},
		components: {
			TableComponent: TableComponent,
		},
		computed: {},
		methods: {
			...mapActions({
				getBanners: "getBannersPerf",
				getBannerDomains: "getBannerDomains",
			}),
			filterForDate(value) {
				this.$store.dispatch("getBannersPerf", {
					startDate: value.startDate,
					endDate: value.endDate,
					sort: value.sort,
					limit: value.limit,
					page: value.page,
					search: value.search,
				});
			},
		},
		mounted() {
			this.getBannerDomains();
		},
	};
</script>
