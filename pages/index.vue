<template>
	<div>
		<div v-if="token">
			<p>
				You are authenticated. You can login to system!
				<NuxtLink :to="localePath('/system')"> Click Here </NuxtLink>
			</p>
		</div>
		<p v-else>
			Please
			<NuxtLink :to="localePath('/login')"> login </NuxtLink>.
		</p>
	</div>
</template>

<script>
	export default {
		layout: "login",
		middleware: "authenticate",
		data() {
			return {
				token: localStorage.token,
			};
		},
		mounted() {
			if (localStorage.token) {
				this.$router.push(this.localePath("/system"));
			} else {
				this.$router.push(this.localePath("/login"));
			}
		},
	};
</script>
