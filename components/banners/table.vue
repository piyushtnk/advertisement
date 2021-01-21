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
        :items="banners"
        :search="search"
        single-select
        class="elevation-1"
      >
        <template v-slot:item.uniqueId="{ item }">
          <div class="py-5">
            <v-img
              :src="`/banner/${item.uniqueId + '.' + item.imageType}`"
              :alt="item.uniqueId"
              width="200px"
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
