<template>
	<v-app dark>
		<v-main>
			<!-- Toast -->
			<Toast />

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
			return {};
		},
		computed: {},
	};
</script>
