<template>
  <div>
    <TableComponent />
  </div>
</template>

<script>
import TableComponent from "~/components/clients/table";

export default {
  middleware: "authenticate",
  data() {
    return {};
  },
  components: {
    TableComponent: TableComponent
  }
};
</script>
