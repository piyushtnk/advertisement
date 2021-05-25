<template>
	<div>
		<!-- Uploading banner -->
		<UploadComponent />

		<!-- Banner list -->
		<TableComponent class="my-12" />
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import UploadComponent from "~/components/banners/domain/uploadDomain";
	import TableComponent from "~/components/banners/domain/tableDomain";

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
			...mapActions({ getBannerDomains: "system/banner/getBannerDomains" }),
		},
		mounted() {
			this.getBannerDomains();
		},
	};
</script>
