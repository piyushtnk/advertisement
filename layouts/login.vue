<template>
	<v-app>
		<v-main>
			<!-- Toast -->
			<Toast />
			<!-- Toast over -->

			<!-- Loading codding -->
			<nuxt />
			<!-- Loading codding over -->
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
				title: "Home",
			};
		},
	};
</script>
