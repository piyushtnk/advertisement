<template>
	<div>
		<ProfileComponent />
	</div>
</template>

<script>
	import ProfileComponent from "~/components/company/b91/players/profile";

	export default {
		middleware: "authenticate",
		components: {
			ProfileComponent: ProfileComponent,
		},
		data: () => ({}),
		methods: {},
		mounted() {
			// TODO: LoginIps
			this.$store.dispatch("playerInfo", {
				type: "loginip",
				params: {
					playerId: this.$route.params.id,
				},
			});

			// TODO: Clicks
			this.$store.dispatch("playerInfo", {
				type: "clicks",
				params: {
					playerId: this.$route.params.id,
				},
			});

			// TODO: Views
			this.$store.dispatch("playerInfo", {
				type: "views",
				params: {
					playerId: this.$route.params.id,
				},
			});

			// TODO: Profile
			this.$store.dispatch("playerInfo", {
				type: "info",
				params: {
					playerId: this.$route.params.id,
				},
			});
		},
	};
</script>
