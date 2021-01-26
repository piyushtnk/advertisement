<template>
	<div>
		<v-row class="mt-6">
			<v-col cols="12">
				<v-card class="mx-auto">
					<v-app-bar dark>
						<v-toolbar-title>Live Statistics</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-row>
							<v-col cols="auto" class="ml-auto">
								<v-select
									v-model="defaultFilterDate"
									:items="filterDate"
									item-value="state"
									item-text="abbr"
									label="Filter Type"
									full-width
								/>
							</v-col>
						</v-row>
						<nuxt-link :to="switchLocalePath('zh')">
							<v-list-item> chiense </v-list-item>
						</nuxt-link>
					</v-app-bar>

					<v-container>
						<v-row>
							<v-col cols="12" lg="12" md="12" sm="12">
								<v-dialog
									ref="dialog"
									v-model="modal"
									@input="(v) => v || whenDialogClosed()"
									:return-value.sync="date"
									persistent
									width="300px"
									overlay-opacity="0.8"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model="dateRangeText"
											label="Specific date's data"
											prepend-icon="mdi-calendar"
											readonly
											v-bind="attrs"
											v-on="on"
										></v-text-field>
									</template>
									<v-date-picker
										onCh
										v-model="date"
										scrollable
										range
										light
									>
										<v-spacer></v-spacer>
										<v-btn
											text
											color="primary"
											@click="modal = false"
										>
											Cancel
										</v-btn>
										<v-btn
											text
											color="primary"
											@click="$refs.dialog.save(date)"
										>
											OK
										</v-btn>
									</v-date-picker>
								</v-dialog>
							</v-col>

							<v-col cols="12" lg="6" md="6" sm="12">
								<v-card class="mx-auto" outlined>
									<v-card-title class="display-3">{{
										stats.visitors
									}}</v-card-title>
									<v-card-text> Visitors (PV) </v-card-text>
								</v-card>
							</v-col>

							<v-col cols="12" lg="6" md="6" sm="12">
								<v-card class="mx-auto" outlined>
									<v-card-title class="display-3">{{
										stats.uniqueVisitors
									}}</v-card-title>
									<v-card-text>
										Actual Visitors (UV)
									</v-card-text>
								</v-card>
							</v-col>

							<v-col cols="12" lg="6" md="6" sm="12">
								<v-card class="mx-auto" outlined>
									<v-card-title class="display-3">{{
										stats.registeredVisitors
									}}</v-card-title>
									<v-card-text>
										Registered Visitors (RV)
									</v-card-text>
								</v-card>
							</v-col>

							<v-col cols="12" lg="6" md="6" sm="12">
								<v-card class="mx-auto" outlined>
									<v-card-title class="display-3">{{
										stats.banners
									}}</v-card-title>
									<v-card-text>
										Registered Banners
									</v-card-text>
								</v-card>
							</v-col>
						</v-row>
					</v-container>
				</v-card>
			</v-col>
		</v-row>

		<!-- 2nd box -->
		<v-row class="mt-6">
			<v-col cols="12">
				<v-card class="mx-auto">
					<v-app-bar dark>
						<v-toolbar-title>System Stats</v-toolbar-title>
					</v-app-bar>

					<v-container>
						<v-row>
							<v-col cols="12" lg="4" md="6" sm="12">
								<v-card class="mx-auto" outlined>
									<v-card-title class="display-3">{{
										dashboard.banners
									}}</v-card-title>
									<v-card-text> Banners </v-card-text>
								</v-card>
							</v-col>

							<v-col cols="12" lg="4" md="6" sm="12">
								<v-card class="mx-auto" outlined>
									<v-card-title class="display-3">{{
										dashboard.admins
									}}</v-card-title>
									<v-card-text> Admins </v-card-text>
								</v-card>
							</v-col>

							<v-col cols="12" lg="4" md="6" sm="12">
								<v-card class="mx-auto" outlined>
									<v-card-title class="display-3">{{
										dashboard.liveAdmins
									}}</v-card-title>
									<v-card-text> LoggedIn Admins </v-card-text>
								</v-card>
							</v-col>
						</v-row>
					</v-container>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "CountersComponent",
		data: () => ({
			date: [],
			modal: false,
			defaultFilterDate: 1,
			filterDate: [
				{
					state: 1,
					abbr: "Today",
				},
				{
					state: 2,
					abbr: "Yesterday",
				},
				{
					state: 3,
					abbr: "This Week",
				},
				{
					state: 4,
					abbr: "Last Week",
				},
				{
					state: 5,
					abbr: "This Month",
				},
				{
					state: 6,
					abbr: "Last Month",
				},
				{
					state: 7,
					abbr: "All Time",
				},
			],
		}),
		computed: {
			...mapGetters({
				dashboard: "getDashboard",
				stats: "getStats",
			}),
			dateRangeText() {
				return this.date.join(" ~ ");
			},
		},
		mounted() {
			this.$emit("childFilterForCounter", {
				counter: this.defaultFilterDate,
				startDate: this.date[0],
				endDate: this.date[1],
			});
		},
		methods: {
			whenDialogClosed() {
				if (this.date.length == 2) {
					this.$emit("childFilterForCounter", {
						startDate: this.date[0],
						endDate: this.date[1],
					});
				}
			},
		},
		watch: {
			defaultFilterDate(value) {
				this.$emit("childFilterForCounter", { counter: value });
			},
		},
	};
</script>
