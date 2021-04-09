<template>
	<div>
		<v-menu
			ref="menu"
			v-model="menu"
			:close-on-content-click="false"
			:return-value.sync="currentDate"
			transition="scale-transition"
			offset-y
			min-width="auto"
		>
			<template v-slot:activator="{ on, attrs }">
				<v-text-field
					v-model="currentDate"
					:label="$t(label)"
					prepend-icon="mdi-calendar"
					readonly
					v-bind="attrs"
					v-on="on"
				></v-text-field>
			</template>
			<v-date-picker
				v-model="currentDate"
				:min="minimumDate"
				:locale="$t('localeType')"
				no-title
				scrollable
			>
				<v-spacer></v-spacer>
				<v-btn text color="primary" @click="menu = false">
					{{ $t("cancel") }}
				</v-btn>
				<v-btn
					text
					color="primary"
					@click="$refs.menu.save(currentDate)"
				>
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
				currentDate: this.date,
				minimumDate: this.minDate,
			};
		},
		props: ["date", "label", "minDate"],
		computed: {},
		methods: {},
		watch: {},
	};
</script>
