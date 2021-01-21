<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" sm="12">
        <v-card class="mx-auto">
          <v-sparkline
            :value="dashboard.graph"
            :gradient="gradient"
            :smooth="radius || false"
            :padding="padding"
            :line-width="width"
            :stroke-linecap="lineCap"
            :gradient-direction="gradientDirection"
            :fill="fill"
            :type="type"
            :auto-line-width="autoLineWidth"
            auto-draw
          ></v-sparkline>

          <v-card-title>
            Recent interaction users graph
          </v-card-title>

          <v-card-subtitle>
            Recent visitors through banner
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];
export default {
  name: "ChartComponent",
  data: () => ({
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    // value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false
  }),
  computed: {
    ...mapGetters({
      dashboard: "getDashboard"
    })
  }
};
</script>
