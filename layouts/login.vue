<template>
  <v-app dark>
    <v-main>
      <!-- Snackbar -->
      <v-snackbar v-model="snackbar" left>
        {{ snackbarText }}

        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <!-- Container -->
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Home"
    };
  },
  computed: {
    snackbarText() {
      return this.$store.state.Login.layout.snackbarText;
    },
    snackbar: {
      get: function() {
        return this.$store.state.Login.layout.snackbarVisible;
      },
      set: function(value) {
        this.$store.commit("SET_LAYOUT_SNACKBAR_VISIBLE", value);
      }
    }
  }
};
</script>
