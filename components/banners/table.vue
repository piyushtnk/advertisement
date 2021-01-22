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
        item-key="uniqueId"
      >
        <template v-slot:[`item.uniqueId`]="{ item }">
          <div class="py-5">
            <!-- <v-img              
              :src="`/banner/${item.uniqueId + '.' + item.imageType}`"
              :alt="item.uniqueId"
              width="200px"
            ></v-img>             -->
            <v-img
              :src="`~/assets/banner/${item.uniqueId}.${item.imageType}`"
              :lazy-src="`https://picsum.photos/10/6?image=${5 * 5 + 10}`"
              aspect-ratio="auto"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </div>
        </template>

        <template v-slot:[`item.imageType`]="{ item }">
          {{ getUrl(item) }}
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
        { text: "Banner", value: "uniqueId" },
        { text: "Banner Link", value: "imageType" },
        { text: "Redirect URL", value: "redirectUrl" },
        { text: "Created At", value: "createdAt" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      banners: "getBanners"
    })
  },
  methods: {
    findImage(image) {
      let path = null;
      try {
        path = require("~/assets/banner/" +
          image.uniqueId +
          "." +
          image.imageType);
      } catch (e) {
        path = require("~/assets/no-image.jpg");
      }
      return path;
    },
    getUrl(item) {
      return window.location.origin + "/" + item.uniqueId;
    }
  }
};
</script>
