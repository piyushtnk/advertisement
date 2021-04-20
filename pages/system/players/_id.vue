<template>
	<div>
		<v-row>
			<v-col cols="12">
				<ProfileComponent />
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import ProfileComponent from "~/components/players/profile";

	export default {
		middleware: "authenticate",
		components: {
			ProfileComponent: ProfileComponent,
		},
		data: () => ({}),
		methods: {},
		mounted() {
			// LoginIps
			this.$store.dispatch("playerInfo", {
				type: "loginip",
				params: {
					playerId: this.$route.params.id,
				},
			});
			// // Clicks
			// this.$store.dispatch("playerInfo", {
			// 	type: "clicks",
			// 	params: {
			// 		playerId: this.$route.params.id,
			// 	},
			// });
			// // Views
			// this.$store.dispatch("playerInfo", {
			// 	type: "views",
			// 	params: {
			// 		playerId: this.$route.params.id,
			// 	},
			// });
			// Profile
			this.$store.dispatch("playerInfo", {
				type: "info",
				params: {
					playerId: this.$route.params.id,
				},
			});
		},
	};
</script>
