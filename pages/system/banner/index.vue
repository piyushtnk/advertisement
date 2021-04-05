<template>
	<div>
		<!-- Uploading banner -->
		<UploadComponent />

		<!-- Banner list -->
		<TableComponent @childFilterForDate="filterForDate" />
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import UploadComponent from "~/components/banners/upload";
	import TableComponent from "~/components/banners/tableBanner";

	export default {
		middleware: "authenticate",
		data() {
			return {};
		},
		components: {
			UploadComponent: UploadComponent,
			TableComponent: TableComponent,
		},
		computed: {},
		methods: {
			...mapActions({
				getBannerDomains: "getBannerDomains",
			}),
			filterForDate(value) {
				this.$store.dispatch("getBanners", {
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
