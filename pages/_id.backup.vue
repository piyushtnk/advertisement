<template>
	<div></div>
</template>

<script>
	import FingerprintJS from "@fingerprintjs/fingerprintjs";

	export default {
		layout: "client",
		data() {
			return {
				show: true,
				clientData: {
					info: {},
					timezone: null,
					locationDetail: {},
					deviceId: null,
					origin: null,
				},
			};
		},
		async created() {
			const $this = this;

			// Fingerprint js version 3.0
			const fp = await FingerprintJS.load();
			const result = await fp.get();
			const visitorId = result.visitorId;
			$this.clientData.deviceId = visitorId;

			// Final call
			$this.finalize();
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
			finalize() {
				// Check the banner existence
				const $this = this;
				$this.$axios
					.get("/banner/" + $this.$route.params.id)
					.then(function (response) {
						if (response.data.data) {
							// Main device detail
							$this.clientData.info = $this.$ua;

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

							// Sending data to backend.
							$this.$axios.post("/client/" + $this.$route.params.id, {
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
								cOriginalScreen: $this.isNull($this.screenSizeMax),
								cLanguage: $this.isNull($this.language),
								cDeviceId: $this.isNull($this.clientData.deviceId),
								cOs: $this.isNull($this.clientData.info.os()),
								cOrigin: "", // Decrypted with fingerprintJs@v2.0
							});

							// Forwarding request.
							window.location.href = response.data.data.redirectUrl;
						}
					})
					.catch(function (error) {
						throw error.response ? error.response.data.error : error;
					});
			},
			isNull(value) {
				if (value == "" || value == null) {
					return "-";
				} else {
					return value;
				}
			},
		},
	};
</script>
