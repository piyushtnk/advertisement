<template>
	<div>
		<v-row no-gutters>
			<v-col cols="12">
				<v-card class="mx-auto" max-width="500" outlined> </v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	export default {
		name: "logout",
		layout: "login",
		data: () => ({}),
		computed: {},
		mounted() {
			const success = this.$store.dispatch("logout");
			if (success) {
				this.$router.push(this.localePath("/"));
			}
		},
		methods: {},
	};
</script>
