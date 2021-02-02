<template>
	<div>
		<!-- Uploading banner -->
		<UploadComponent />

		<!-- Banner list -->
		<TableComponent class="my-12" @childFilterForDate="filterForDate" />
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
				getBanners: "getBanners",
				getBannerDomains: "getBannerDomains",
			}),
			filterForDate(value) {
				this.$store.dispatch("getBanners", {
					duration: value.duration,
					startDate: value.startDate,
					endDate: value.endDate,
					sort: "id|desc",
					limit: value.limit,
					page: value.page,
				});
			},
		},
		mounted() {
			this.getBannerDomains();
		},
	};
</script>
