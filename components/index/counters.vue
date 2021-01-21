<template>
  <div>
    <v-row class="my-6">
      <v-col cols="12" lg="6" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">{{
            dashboard.visitors
          }}</v-card-title>
          <v-card-text>
            Total Visitors (PV)
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">{{
            dashboard.uniqueVisitors
          }}</v-card-title>
          <v-card-text>
            Actual Visitors (UV)
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">5</v-card-title>
          <v-card-text>
            Total Registered Visitors
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">{{ dashboard.banners }}</v-card-title>
          <v-card-text>
            Total Registered Banners
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">{{ dashboard.admins }}</v-card-title>
          <v-card-text>
            Total Admins
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">{{
            dashboard.liveAdmins
          }}</v-card-title>
          <v-card-text>
            Total LoggedIn Admins
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CountersComponent",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      dashboard: "getDashboard"
    })
  }
};
</script>
