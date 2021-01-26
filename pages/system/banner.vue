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
            ...mapActions({ getBanners: "getBanners" }),
        },
        mounted() {
            this.getBanners();
        },
    };
</script>
