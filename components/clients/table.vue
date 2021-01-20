<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :items-per-page="10"
        :headers="headers"
        item-key="cToken"
        :items="clients"
        :search="search"
        show-expand
        single-expand
        item-expanded
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-row no-gutters>
              <v-col lg="4" md="6" sm="12">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Timezone</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.cTimezone
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Country</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.cCountry
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Region Code</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.cRegionCode
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Longitude</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.cLong
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col lg="4" md="6" sm="12">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Timezone Name</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.cTimezoneName
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Country</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.cCountry
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Region</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.cRegion
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Created At</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.createdAt
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col lg="4" md="6" sm="12">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Country Code</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.cCountryCode
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>City</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.cCity
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>ZIP</v-list-item-title>
                    <v-list-item-subtitle>{{ item.cZip }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>ISP</v-list-item-title>
                    <v-list-item-subtitle>{{ item.cIsp }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Latitude</v-list-item-title>
                    <v-list-item-subtitle>{{ item.cLat }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TableComponent",
  middleware: "authenticate",
  data() {
    return {
      search: "",
      headers: [
        { text: "Device Type", value: "cDeviceType" },
        { text: "Browser", value: "cBrowser" },
        { text: "Browser Detail", value: "cBrowserDetail" },
        { text: "Browser Vendor", value: "cBrowserVendor" },
        { text: "Device Name", value: "cDeviceName" },
        { text: "Screen", value: "cScreen" },
        { text: "Original Screen", value: "cOriginalScreen" },
        { text: "Language", value: "cLanguage" },
        { text: "IP", value: "cIp" },
        { text: "OS", value: "cOs" }
        /* { text: "Timezone", value: "cTimezone" },
        { text: "Timezone Name", value: "cTimezoneName" },
        { text: "Country Code", value: "cCountryCode" },
        { text: "Country", value: "cCountry" },
        { text: "Region Code", value: "cRegionCode" },
        { text: "Region", value: "cRegion" },
        { text: "City", value: "cCity" },
        { text: "ZIP", value: "cZip" },
        { text: "ISP", value: "cIsp" },
        { text: "Latitude", value: "cLat" },
        { text: "Longitude", value: "cLong" },
        { text: "Created At", value: "createdAt" } */
      ]
    };
  },
  computed: {
    ...mapGetters({
      clients: "getClients"
    })
  },
  methods: {
    ...mapActions({ getClients: "getClients" })
  },
  mounted() {
    // this["clients/getClients"](); // Another Way of calling.
    this.getClients();
  }
};
</script>
