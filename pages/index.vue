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
			ctx.$gtm.init(process.env.GTM);
			ctx.$gtm.pushEvent({ event: "ssr" });
		},
		computed: {},
		created() {
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
