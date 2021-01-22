<template>
  <div>
    <!-- Chart -->
    <ChartComponent />

    <!-- Counters area -->
    <CountersComponent :filterForCounter="1" />
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
  data: () => ({
    filterForCounter: 1
  }),
  methods: {
    ...mapActions({ getDashboard: "getDashboard" })
  },
  mounted() {
    this.getDashboard({ filterForCounter: this.filterForCounter });
  }
};
</script>
