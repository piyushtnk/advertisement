<template>
  <div>
    <div v-if="show">
      <v-card class="mx-auto" tile>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Client Information</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Device Type</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.deviceType()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>OS</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.os()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>OS Version</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.osVersion()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Browser</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.browser()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Browser Version</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.browserVersion()
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
              clientData.info.browserVendor()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Phone</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.isFromIphone()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>iPad</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.isFromIpad()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>iPod</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.isFromIpod()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>iOS</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.isFromIos()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Android Mobile</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.isFromAndroidMobile()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Android Tablet</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.isFromAndroidTablet()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Android OS</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.isFromAndroidOs()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Windows Phone</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.isFromWindowsPhone()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>PC</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.isFromPc()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Smart Phone</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.isFromSmartphone()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Mobile Phone</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.isFromMobilephone()
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Tablet</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.info.isFromTablet()
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
            <v-list-item-subtitle>{{
              clientData.ipAddress
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>City</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.locationDetail.city
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>TimeZone</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.timezone
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>TimeZone Name</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.locationDetail.timezone
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Country</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.locationDetail.country
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Country Code</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.locationDetail.countryCode
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>ISP</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.locationDetail.isp
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Location</v-list-item-title>
            <v-list-item-subtitle
              >{{ clientData.locationDetail.lat }},
              {{ clientData.locationDetail.lon }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Region Name</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.locationDetail.regionName
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>Region Code</v-list-item-title>
            <v-list-item-subtitle>{{
              clientData.locationDetail.region
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
    <div v-else>Content not available.</div>
  </div>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      show: true,
      clientData: {
        info: {},
        ipAddress: "Fetching...",
        timezone: null,
        locationDetail: {}
      }
    };
  },
  async created() {
    // Main device detail
    const device = this.$ua;
    this.clientData.info = device;

    // Ip address
    await fetch("https://api.ipify.org?format=json")
      .then(x => x.json())
      .then(({ ip }) => {
        this.clientData.ipAddress = ip;

        // Location fetch
        fetch("http://ip-api.com/json/")
          .then(x => x.json())
          .then(response => {
            this.clientData.locationDetail = response;
            this.finalize();
          });
      });

    // TimeZone
    this.clientData.timezone = new Date().toISOString();
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
    }
  },
  methods: {
    finalize() {
      // Check the banner existence
      const $this = this;
      this.$axios
        .get("/client/banner/" + $this.$route.params.id)
        .then(function(response) {
          if (response.data.data) {
            // Sending data to server
            let deviceName = null;
            if ($this.clientData.info.isFromIphone()) {
              deviceName = "iPhone";
            } else if ($this.clientData.info.isFromIpad()) {
              deviceName = "iPad";
            } else if ($this.clientData.info.isFromIpod()) {
              deviceName = "iPod";
            } else if ($this.clientData.info.isFromIos()) {
              deviceName = "iOS";
            } else if ($this.clientData.info.isFromAndroidMobile()) {
              deviceName = "Android Mobile";
            } else if ($this.clientData.info.isFromAndroidTablet()) {
              deviceName = "Android Tablet";
            } else if ($this.clientData.info.isFromAndroidOs()) {
              deviceName = "Android OS";
            } else if ($this.clientData.info.isFromWindowsPhone()) {
              deviceName = "Windows Phone";
            } else if ($this.clientData.info.isFromPc()) {
              deviceName = "PC";
            } else if ($this.clientData.info.isFromSmartphone()) {
              deviceName = "Smart Phone";
            } else if ($this.clientData.info.isFromMobilephone()) {
              deviceName = "Mobile Phone";
            } else if ($this.clientData.info.isFromTablet()) {
              deviceName = "Tablet";
            }
            this.$axios
              .post("/client/" + $this.$route.params.id, {
                cDeviceType: $this.clientData.info.deviceType(),
                cBrowser: $this.clientData.info.browser(),
                cBrowserDetail: $this.clientData.info.browserVersion(),
                cBrowserVendor: $this.clientData.info.browserVendor(),
                cDeviceName: deviceName,
                cScreen: $this.screenSize,
                cOriginalScreen: $this.screenSizeMax,
                cLanguage: $this.language,
                cIp: $this.clientData.ipAddress,
                cOs: $this.clientData.info.os(),
                cTimezone: $this.clientData.timezone,
                cTimezoneName: $this.clientData.locationDetail.timezone,
                cCountryCode: $this.clientData.locationDetail.countryCode,
                cCountry: $this.clientData.locationDetail.country,
                cRegionCode: $this.clientData.locationDetail.region,
                cRegion: $this.clientData.locationDetail.regionName,
                cCity: $this.clientData.locationDetail.city,
                cZip: $this.clientData.locationDetail.zip,
                cIsp: $this.clientData.locationDetail.isp,
                cLat: $this.clientData.locationDetail.lat,
                cLong: $this.clientData.locationDetail.lon
              })
              .then(function(response) {
                window.location.href = response.data.data.redirectUrl;
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        })
        .catch(function(error) {
          $this.show = false;
        });
    }
  }
  /* async updated() {
    const waiting = await this.$nextTick(function() {
      return true;
    });
  } */
};
</script>
