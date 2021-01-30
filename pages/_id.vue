<template>
	<div></div>
</template>

<script>
	export default {
		layout: "client",
		data() {
			return {
				show: true,
				clientData: {
					info: {},
					ipAddress: "Fetching...",
					timezone: null,
					locationDetail: {},
					deviceId: null,
					origin: null,
				},
			};
		},
		async created() {
			const $this = this;

			// Ip address
			await fetch("https://api.ipify.org?format=json")
				.then((x) => x.json())
				.then(({ ip }) => {
					$this.clientData.ipAddress = ip;

					// Location fetch
					fetch("http://ip-api.com/json/")
						.then((x) => x.json())
						.then((response) => {
							$this.clientData.locationDetail = response;
							$this.deviceId();
							$this.finalize();
						});
				});
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
		},
		methods: {
			fingerPrint2() {
				let $this = this;
				$this.$fingerPrint2.get(
					{
						canvas: true,
						ie_activex: true,
						screen_resolution: true,
					},
					function (components) {
						var values = components.map(function (component) {
							return component.value;
						});
						var murmur = $this.$fingerPrint2.x64hash128(
							values.join(""),
							31
						);
						$this.clientData.deviceId = murmur;
						return true;
					}
				);
			},
			deviceId() {
				// Device Id
				var navigator_info = window.navigator;
				var screen_info = window.screen;
				var uid = navigator_info.mimeTypes.length;
				uid += navigator_info.userAgent.replace(/\D+/g, "");
				uid += navigator_info.plugins.length;
				uid += screen_info.height || "";
				uid += screen_info.width || "";
				uid += screen_info.pixelDepth || "";
				this.clientData.deviceId = uid;

				// Origin
				this.clientData.origin = document.referrer;
			},
			finalize() {
				// Check the banner existence
				const $this = this;
				$this.$axios
					.get("/client/banner/" + $this.$route.params.id)
					.then(function (response) {
						if (response.data.data) {
							// Main device detail
							$this.clientData.info = $this.$ua;

							// TimeZone
							$this.clientData.timezone = new Date().toISOString();

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
							} else if (
								$this.clientData.info.isFromAndroidMobile()
							) {
								deviceName = "Android Mobile";
							} else if (
								$this.clientData.info.isFromAndroidTablet()
							) {
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
							$this.$axios
								.post("/client/" + $this.$route.params.id, {
									cDeviceType: $this.isNull(
										$this.clientData.info.deviceType()
									),
									cBrowser: $this.isNull(
										$this.clientData.info.browser()
									),
									cBrowserDetail: $this.isNull(
										$this.clientData.info.browserVersion()
									),
									cBrowserVendor: $this.isNull(
										$this.clientData.info.browserVendor()
									),
									cDeviceName: deviceName,
									cScreen: $this.isNull($this.screenSize),
									cOriginalScreen: $this.isNull(
										$this.screenSizeMax
									),
									cLanguage: $this.isNull($this.language),
									cIp: $this.isNull($this.clientData.ipAddress),
									cDeviceId: $this.isNull(
										$this.clientData.deviceId
									),
									cOs: $this.isNull($this.clientData.info.os()),
									cTimezone: $this.isNull(
										$this.clientData.timezone
									),
									cTimezoneName: $this.isNull(
										$this.clientData.locationDetail.timezone
									),
									cCountryCode: $this.isNull(
										$this.clientData.locationDetail.countryCode
									),
									cCountry: $this.isNull(
										$this.clientData.locationDetail.country
									),
									cRegionCode: $this.isNull(
										$this.clientData.locationDetail.region
									),
									cRegion: $this.isNull(
										$this.clientData.locationDetail.regionName
									),
									cCity: $this.isNull(
										$this.clientData.locationDetail.city
									),
									cZip: $this.isNull(
										$this.clientData.locationDetail.zip
									),
									cIsp: $this.isNull(
										$this.clientData.locationDetail.isp
									),
									cLat: $this.isNull(
										$this.clientData.locationDetail.lat
									),
									cLong: $this.isNull(
										$this.clientData.locationDetail.lon
									),
									cOrigin: $this.clientData.origin,
								})
								.then(function (response) {
									window.location.href =
										response.data.data.redirectUrl;
								})
								.catch(function (error) {
									throw error.response
										? error.response.data.error
										: error;
								});
						}
					})
					.catch(function (error) {
						throw error.response ? error.response.data.error : error;
					});
			},
			isNull(value) {
				if (value == "") {
					return "-";
				} else {
					return value;
				}
			},
		},
	};
</script>
