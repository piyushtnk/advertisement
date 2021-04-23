<template>
	<div>
		<!-- <div v-if="token">
			<p>
				You are authenticated. You can login to system!
				<NuxtLink :to="localePath('/system')"> Click Here </NuxtLink>
			</p>
		</div>
		<p v-else>
			Please
			<NuxtLink :to="localePath('/auth')"> login </NuxtLink>.
		</p> -->
	</div>
</template>

<script>
	export default {
		layout: "login",
		// middleware: "authenticate",
		data() {
			return {};
		},
		computed: {
			token() {
				return this.$cookie.get("token");
			},
		},
		created() {
			// if (this.$cookie.get("token")) {
			// 	this.$router.push(this.localePath("/system"));
			// } else {
			// 	this.$router.push(this.localePath("/auth"));
			// }
			if (
				window.location.host === "b91vip.com" ||
				window.location.host === "www.b91vip.com"
			) {
				return window.location.replace("http://www.b91.com");
			}
		},
	};
</script>
