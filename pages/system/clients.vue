<template>
    <div>
        <TableComponent />
    </div>
</template>

<script>
    import TableComponent from "~/components/clients/tableClients";
    import { mapActions } from "vuex";

    export default {
        middleware: "authenticate",
        data() {
            return {};
        },
        components: {
            TableComponent: TableComponent,
        },
        methods: {
            ...mapActions({ getClients: "getClients" }),
        },
        mounted() {
            // this["clients/getClients"](); // Another Way of calling.
            this.getClients();
        },
    };
</script>
