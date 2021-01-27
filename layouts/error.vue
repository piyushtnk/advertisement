<template>
	<v-app dark>
		<v-card
			v-if="error.statusCode === 404"
			class="mx-auto my-12"
			max-width="374"
		>
			<template slot="progress">
				<v-progress-linear
					color="deep-purple"
					height="10"
					indeterminate
				></v-progress-linear>
			</template>

			<v-img height="250" src="/404.jpg"></v-img>

			<v-card-actions>
				<v-btn
					color="deep-black lighten-2"
					btn-
					text
					:to="localePath('/system')"
					block
				>
					Back Home
				</v-btn>
			</v-card-actions>
		</v-card>

		<h1 v-else>
			{{ otherError }}
		</h1>
	</v-app>
</template>

<script>
	export default {
		layout: "login",
		props: {
			error: {
				type: Object,
				default: null,
			},
		},
		data() {
			return {
				pageNotFound: "404 Not Found",
				otherError: "An error occurred",
			};
		},
		head() {
			const title =
				this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
			return {
				title,
			};
		},
	};
</script>

<style scoped>
	h1 {
		font-size: 20px;
	}
</style>
