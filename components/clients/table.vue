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
        :items="clients"
        :search="search"
      ></v-data-table>
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
        {
          text: "Device Type",
          align: "start",
          //   filterable: false,
          value: "cDeviceType"
        },
        { text: "Browser", value: "cBrowser" },
        { text: "Browser Detail", value: "cBrowserDetail" },
        { text: "Browser Vendor", value: "cBrowserVendor" },
        { text: "Device Name", value: "cDeviceName" },
        { text: "Screen", value: "cScreen" },
        { text: "Original Screen", value: "cOriginalScreen" },
        { text: "Language", value: "cLanguage" },
        { text: "IP", value: "cIp" },
        { text: "OS", value: "cOs" },
        { text: "Timezone", value: "cTimezone" },
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
        { text: "Created At", value: "createdAt" }
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
