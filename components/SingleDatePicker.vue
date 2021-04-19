<template>
	<div>
		<v-menu
			v-model="menu"
			:close-on-content-click="false"
			:nudge-right="40"
			transition="scale-transition"
			offset-y
			min-width="auto"
		>
			<template v-slot:activator="{ on, attrs }">
				<v-text-field
					v-model="currentDate"
					:min="minimumDate"
					:label="dateLabel"
					prepend-icon="mdi-calendar"
					readonly
					v-bind="attrs"
					v-on="on"
				></v-text-field>
			</template>
			<v-date-picker
				v-model="currentDate"
				@input="menu = false"
			></v-date-picker>
		</v-menu>
	</div>
</template>

<script>
	export default {
		name: "SingleDatePickerComponent",
		data() {
			return {
				menu: false,
				dateLabel: this.label,
				currentDate: this.date,
				minimumDate: this.minDate,
			};
		},
		props: {
			date: {
				type: String,
				required: true,
			},
			min: {
				type: String,
			},
			label: {
				type: String,
				default: () => {
					return this.$t("date");
				},
			},
		},
		computed: {},
		methods: {},
		watch: {
			currentDate(value) {
				this.$emit("update:date", value);
			},
		},
	};
</script>
