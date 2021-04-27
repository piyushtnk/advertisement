<template>
	<div>Coming soon...</div>
</template>
<script>
	export default {
		layout: "landing",
		data() {
			return {};
		},
		middleware(ctx) {
			ctx.$gtm.push({ event: "ssr" });
		},
		computed: {},
		created() {
			// Google Tag Manager push event
			// this.$gtm.init(process.env.GTM);
			// this.$gtm.push({ event: "ssr" });

			// If b91.com comes in.
			if (
				window.location.host === "b91vip.com" ||
				window.location.host === "www.b91vip.com"
			) {
				return window.location.replace("http://www.b91.com");
			}

			// Other config
		},
	};
</script>
