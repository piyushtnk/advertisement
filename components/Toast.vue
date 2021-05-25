<template>
	<v-snackbar
		v-model="toastStatus"
		:color="toastContent.color"
		text
		bottom
		left
	>
		{{ toastContent.text }}

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
				return this.$store.state.system.default.toastContent;
			},
			toastStatus: {
				get: function () {
					return this.$store.state.system.default.toastStatus;
				},
				set: function (value) {
					this.$store.commit("system/default/SET_TOAST_STATUS", value);
				},
			},
		},
	};
</script>

<style>
</style>