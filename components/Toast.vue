<template>
	<v-snackbar
		v-model="toastStatus"
		:color="toastContent.color"
		text
		top
		right
	>
		{{ toastContent.message }}

		<template v-slot:action="{ attrs }">
			<v-btn text v-bind="attrs" @click="toastStatus = false">
				Close
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script>
	export default {
		name: "Toast",
		computed: {
			toastContent() {
				return this.$store.state.Default.toastContent;
			},
			toastStatus: {
				get: function () {
					return this.$store.state.Default.toastStatus;
				},
				set: function (value) {
					this.$store.commit("SET_TOAST_STATUS", value);
				},
			},
		},
	};
</script>

<style>
</style>