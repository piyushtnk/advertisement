<template>
  <div>
    <!-- Chart -->
    <ChartComponent />

    <!-- Counters area -->
    <CountersComponent />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import CountersComponent from "~/components/index/counters";
import ChartComponent from "~/components/index/chart";

export default {
  middleware: "authenticate",
  components: {
    CountersComponent: CountersComponent,
    ChartComponent: ChartComponent
  },
  data: () => ({}),
  methods: {
    ...mapActions({ getDashboard: "getDashboard" })
  },
  mounted() {
    this.getDashboard();
  }
};
</script>
