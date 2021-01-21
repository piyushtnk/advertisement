<template>
  <div>
    <v-row class="my-6">
      <v-col cols="12" lg="4" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">13</v-card-title>
          <v-card-text>
            Total Customers
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">5</v-card-title>
          <v-card-text>
            Total Registered Customers
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">2</v-card-title>
          <v-card-text>
            Total Registered Banners
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="my-6">
      <v-col cols="12" lg="4" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">3</v-card-title>
          <v-card-text>
            Total Admins
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4" md="6" sm="12">
        <v-card class="mx-auto">
          <v-card-title class="display-3">2</v-card-title>
          <v-card-text>
            Total LoggedIn Admins
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CountersComponent",
  data() {
    return {};
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
    this.getClients();
  }
};
</script>
