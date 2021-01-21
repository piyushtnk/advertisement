<template>
  <v-app dark>
    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" right top>
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-btn dark @click="snackbar = true">
      Open Snackbar
    </v-btn>
    <!-- Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon v-on:click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span
        >&copy; {{ new Date().getFullYear() }} | TNK Consultant & Co. Ltd.</span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-home",
          title: "Dashboard",
          to: "/system"
        },
        {
          icon: "mdi-image",
          title: "Banner",
          to: "/system/banner"
        },
        {
          icon: "mdi-account-group",
          title: "Clients",
          to: "/system/clients"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "System Panel"
    };
  },
  methods: {
    logout() {
      const success = this.$store.dispatch("logout");
      if (success) {
        this.$router.push("/login");
      }
    }
  },
  computed: {
    snackbarText() {
      return this.$store.state.Default.snackbarText;
    },
    snackbar: {
      get: function() {
        return this.$store.state.Default.snackbarVisible;
      },
      set: function(value) {
        this.$store.dispatch("setSnackbarVisible", value);
      }
    }
  }
};
</script>
