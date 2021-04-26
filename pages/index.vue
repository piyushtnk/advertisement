<template>
	<div></div>
</template>
<!-- Google Tag Manager -->
		<script>
	(function (w, d, s, l, i) {
		w[l] = w[l] || [];
		w[l].push({
			"gtm.start": new Date().getTime(),
			event: "gtm.js",
		});
		var f = d.getElementsByTagName(s)[0],
			j = d.createElement(s),
			dl = l != "dataLayer" ? "&l=" + l : "";
		j.async = true;
		j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
		f.parentNode.insertBefore(j, f);
	})(window, document, "script", "dataLayer", "GTM-MLBJTTQ");
</script>
		<!-- End Google Tag Manager -->
<script>
	export default {
		layout: "login",
		data() {
			return {};
		},
		middleware(ctx) {
			ctx.$gtm.push({ event: "ssr" });
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
