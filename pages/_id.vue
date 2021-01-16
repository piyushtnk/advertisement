<template>
  <div>
    <div v-if="this.$route.params.id">
      <v-card class="mx-auto" tile>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Client Information</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Device Type</v-list-item-title>
            <v-list-item-subtitle>{{ info.deviceType() }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>OS</v-list-item-title>
            <v-list-item-subtitle>{{ info.os() }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>OS Version</v-list-item-title>
            <v-list-item-subtitle>{{ info.osVersion() }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Browser</v-list-item-title>
            <v-list-item-subtitle>{{ info.browser() }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Browser Version</v-list-item-title>
            <v-list-item-subtitle>{{
              info.browserVersion()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Browser Version Detail</v-list-item-title>
            <v-list-item-subtitle>{{ browserVersion }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Browser Vendor</v-list-item-title>
            <v-list-item-subtitle>{{
              info.browserVendor()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Phone</v-list-item-title>
            <v-list-item-subtitle>{{
              info.isFromIphone()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>iPad</v-list-item-title>
            <v-list-item-subtitle>{{ info.isFromIpad() }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>iPod</v-list-item-title>
            <v-list-item-subtitle>{{ info.isFromIpod() }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>iOS</v-list-item-title>
            <v-list-item-subtitle>{{ info.isFromIos() }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Android Mobile</v-list-item-title>
            <v-list-item-subtitle>{{
              info.isFromAndroidMobile()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Android Tablet</v-list-item-title>
            <v-list-item-subtitle>{{
              info.isFromAndroidTablet()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Android OS</v-list-item-title>
            <v-list-item-subtitle>{{
              info.isFromAndroidOs()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Windows Phone</v-list-item-title>
            <v-list-item-subtitle>{{
              info.isFromWindowsPhone()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>PC</v-list-item-title>
            <v-list-item-subtitle>{{ info.isFromPc() }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Smart Phone</v-list-item-title>
            <v-list-item-subtitle>{{
              info.isFromSmartphone()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Mobile Phone</v-list-item-title>
            <v-list-item-subtitle>{{
              info.isFromMobilephone()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Tablet</v-list-item-title>
            <v-list-item-subtitle>{{
              info.isFromTablet()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <!-- Manual mode -->
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Screen Size</v-list-item-title>
            <v-list-item-subtitle>{{ screenSize }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Screen Size Max</v-list-item-title>
            <v-list-item-subtitle>{{ screenSizeMax }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Language</v-list-item-title>
            <v-list-item-subtitle>{{ language }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>IP Address</v-list-item-title>
            <v-list-item-subtitle>{{ ipAddress }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Location</v-list-item-title>
            <v-list-item-subtitle>{{ latLong }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>TimeZone</v-list-item-title>
            <v-list-item-subtitle>{{ timezone }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
    <div v-else>Page not found.</div>
  </div>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      info: "default-data",
      ipAddress: "Fetching...",
      latLong: null,
      timezone: null
    };
  },
  created() {
    // Main device detail
    const device = this.$ua;
    this.info = device;

    // Ip address
    fetch("https://api.ipify.org?format=json")
      .then(x => x.json())
      .then(({ ip }) => {
        this.ipAddress = ip;
      });

    // Location fetch
    navigator.geolocation.getCurrentPosition(
      position => {
        this.latLong =
          position.coords.latitude + "," + position.coords.longitude;
      },
      error => {
        this.latLong = "Error: " + error.message;
      }
    );

    // TimeZone
    this.timezone = new Date().toISOString();
  },
  computed: {
    screenSize() {
      return window.innerHeight + "X" + window.innerHeight;
    },
    screenSizeMax() {
      return window.screen.availWidth + "X" + window.screen.availHeight;
    },
    language() {
      return navigator.language;
    },
    browserVersion() {
      return navigator.appVersion;
    },
    location() {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
        },
        error => {
          console.log(error.message);
        }
      );
    }
  }
};
</script>
