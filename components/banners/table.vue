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
        :headers="headers"
        item-key="id"
        :items="banners"
        :search="search"
        single-select
      >
        <template v-slot:item="{ item }">
          <div class="p-2">
            <v-img
              :src="'/banner/' + item.uniqueId + '.' + item.imageType"
              :alt="item.uniqueId"
              height="10px"
            ></v-img>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TableComponent",
  data() {
    return {
      search: "",
      headers: [
        { text: "Image", value: "uniqueId" },
        { text: "URL", value: "redirectUrl" },
        { text: "Created At", value: "createdAt" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      banners: "getBanners"
    })
  }
};
</script>
