<template>
  <div>
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-app-bar dark>
            <v-toolbar-title>Statistics</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-row>
              <v-col cols="auto" class="ml-auto">
                <v-select
                  full-width
                  v-model="defaultFilterDate"
                  :items="filterDate"
                  item-text="value"
                  item-value="index"
                  label="Filter"
                ></v-select>
              </v-col>
            </v-row>
          </v-app-bar>

          <v-container>
            <v-row>
              <v-col cols="12" lg="4" md="6" sm="12">
                <v-card class="mx-auto" outlined>
                  <v-card-title class="display-3">{{
                    dashboard.all.visitors
                  }}</v-card-title>
                  <v-card-text>
                    Visitors (PV)
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" lg="4" md="6" sm="12">
                <v-card class="mx-auto" outlined>
                  <v-card-title class="display-3">{{
                    dashboard.all.uniqueVisitors
                  }}</v-card-title>
                  <v-card-text>
                    Actual Visitors (UV)
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" lg="4" md="6" sm="12">
                <v-card class="mx-auto" outlined>
                  <v-card-title class="display-3">{{
                    dashboard.all.registeredVisitors
                  }}</v-card-title>
                  <v-card-text>
                    Registered Visitors (RV)
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" lg="4" md="6" sm="12">
                <v-card class="mx-auto" outlined>
                  <v-card-title class="display-3">{{
                    dashboard.all.banners
                  }}</v-card-title>
                  <v-card-text>
                    Banners
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" lg="4" md="6" sm="12">
                <v-card class="mx-auto" outlined>
                  <v-card-title class="display-3">{{
                    dashboard.all.admins
                  }}</v-card-title>
                  <v-card-text>
                    Admins
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" lg="4" md="6" sm="12">
                <v-card class="mx-auto" outlined>
                  <v-card-title class="display-3">{{
                    dashboard.all.liveAdmins
                  }}</v-card-title>
                  <v-card-text>
                    LoggedIn Admins
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
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
    return {
      defaultFilterDate: [
        {
          index: 1,
          value: "Today"
        }
      ],
      filterDate: [
        {
          index: 1,
          value: "Today"
        },
        {
          index: 2,
          value: "Yesterday"
        },
        {
          index: 3,
          value: "This Week"
        },
        {
          index: 4,
          value: "Last Week"
        }
        /* {
          index: 5,
          value: "This Month"
        },
        {
          index: 6,
          value: "Last Month"
        },
        {
          index: 7,
          value: "All Time"
        } */
      ]
    };
  },
  computed: {
    ...mapGetters({
      dashboard: "getDashboard"
    })
  },
  watch: {
    defaultFilterDate(v) {
      this.$emit("update:filterForCounter", v);
    }
  }
};
</script>
