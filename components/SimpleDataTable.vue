<template>
	<div>
		<v-card outlined>
			<v-card-title>
				<v-row>
					<v-col cols="4">
						{{ label }}
					</v-col>
					<v-col cols="4" offset-lg="4">
						<v-text-field
							v-model="search"
							append-icon="mdi-magnify"
							label="Search"
							single-line
							hide-details
						></v-text-field>
					</v-col>
				</v-row>
			</v-card-title>
			<v-card-text>
				<v-data-table
					dense
					v-bind="{ headers, items, itemKey }"
					:search="search"
				>
				</v-data-table>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
	export default {
		name: "SimpleDataTableComponent",
		data() {
			return {
				menu: false,
				search: "",
			};
		},
		props: {
			headers: {
				type: Array,
				required: true,
				default: () => {
					return [];
				},
			},
			items: {
				type: Array,
				required: true,
				default: () => {
					return [];
				},
			},
			itemKey: {
				type: String,
				default: () => {
					return "";
				},
			},
			label: {
				type: String,
				default: () => {
					return "";
				},
			},
		},
		computed: {},
		methods: {},
		watch: {
			// currentDate(value) {
			// 	this.$emit("update:date", value);
			// },
		},
	};
</script>
