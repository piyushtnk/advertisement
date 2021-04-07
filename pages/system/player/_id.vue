<template>
	<div>
		<v-row class="mt-6">
			<v-col cols="12">
				<v-card class="mx-auto">
					<v-app-bar dark>
						<v-toolbar-title>Default</v-toolbar-title>
						<v-spacer></v-spacer>
					</v-app-bar>

					<v-card-text> </v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	export default {
		middleware: "authenticate",
		components: {},
		data: () => ({}),
		methods: {},
		mounted() {
			console.log(this.$route);
		},
	};
</script>
