<template>
  <div>
    <v-row class="my-6">
      <v-col cols="12" lg="12" md="12" sm="12">
        <h2>Today's Peak</h2>
      </v-col>

      <v-col cols="12" lg="4" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">{{
            dashboard.today.visitors
          }}</v-card-title>
          <v-card-text>
            Visitors (PV)
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">{{
            dashboard.today.uniqueVisitors
          }}</v-card-title>
          <v-card-text>
            Actual Visitors (UV)
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">{{
            dashboard.today.registeredVisitors
          }}</v-card-title>
          <v-card-text>
            Registered Visitors
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12" lg="12" md="12" sm="12">
        <h2>All Time Peak</h2>
      </v-col>

      <v-col cols="12" lg="4" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">{{
            dashboard.all.visitors
          }}</v-card-title>
          <v-card-text>
            Visitors
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">{{
            dashboard.all.uniqueVisitors
          }}</v-card-title>
          <v-card-text>
            Actual Visitors
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">{{
            dashboard.all.registeredVisitors
          }}</v-card-title>
          <v-card-text>
            Registered Visitors
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="4" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">{{
            dashboard.all.banners
          }}</v-card-title>
          <v-card-text>
            Banners
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">{{
            dashboard.all.admins
          }}</v-card-title>
          <v-card-text>
            Admins
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">{{
            dashboard.all.liveAdmins
          }}</v-card-title>
          <v-card-text>
            LoggedIn Admins
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
