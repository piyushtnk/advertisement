<template>
	<div>
		<v-menu
			ref="menu"
			v-model="menu"
			:close-on-content-click="false"
			:return-value.sync="date"
			transition="scale-transition"
			offset-y
			min-width="auto"
		>
			<template v-slot:activator="{ on, attrs }">
				<v-text-field
					v-model="date"
					:label="$t('chooseSpecificDate')"
					prepend-icon="mdi-calendar"
					readonly
					v-bind="attrs"
					v-on="on"
				></v-text-field>
			</template>
			<v-date-picker
				v-model="date"
				:locale="$t('localeType')"
				no-title
				scrollable
			>
				<v-spacer></v-spacer>
				<v-btn text color="primary" @click="menu = false">
					{{ $t("cancel") }}
				</v-btn>
				<v-btn text color="primary" @click="$refs.menu.save(date)">
					{{ $t("ok") }}
				</v-btn>
			</v-date-picker>
		</v-menu>
	</div>
</template>

<script>
	export default {
		name: "SingleDatePickerComponent",
		data() {
			return {
				menu: false,
			};
		},
		props: ["date"],
		computed: {},
		methods: {},
		watch: {},
	};
</script>
