<template>
	<div>
		<v-row class="mb-5">
			<v-col cols="6">
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
					<v-date-picker v-model="date" scrollable range light>
						<v-spacer></v-spacer>
						<v-btn text color="primary" @click="modal = false">
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
			<v-col cols="6">
				<v-select
					v-model="defaultFilterDate"
					:items="filterDate"
					item-value="state"
					item-text="abbr"
					label="Filter Type"
				/>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-card>
					<v-card-title>
						<v-text-field
							v-model="search"
							append-icon="mdi-magnify"
							label="Search"
							single-line
							hide-details
						></v-text-field>
					</v-card-title>
					<v-data-table
						:items-per-page="10"
						:headers="headers"
						item-key="id"
						:items="players"
						:search="search"
						show-expand
						single-expand
						item-expanded
					>
						<template v-slot:expanded-item="{ headers, item }">
							<td :colspan="headers.length">
								<v-row no-gutters>
									<!-- Col 1 -->
									<v-col lg="4" md="6" sm="12">
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Create
													Date</v-list-item-title
												>
												<v-list-item-subtitle>{{
													fixParameters(
														item.createdate
													)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Tag Name</v-list-item-title
												>
												<v-list-item-subtitle>{{
													arrayToText(item.tagsname)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Total
													Deposit</v-list-item-title
												>
												<v-list-item-subtitle>{{
													fixParameters(
														item.totaldeposit
													)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Last Withdraw
													Time</v-list-item-title
												>
												<v-list-item-subtitle>{{
													fixParameters(
														item.lastwithdrawtime
													)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Created
													At</v-list-item-title
												>
												<v-list-item-subtitle>{{
													fixParameters(
														item.createdAt
													)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-col>

									<!-- Col 2 -->
									<v-col lg="4" md="6" sm="12">
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Login
													Time</v-list-item-title
												>
												<v-list-item-subtitle>{{
													fixParameters(
														item.logintime
													)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Total Deposit
													Count</v-list-item-title
												>
												<v-list-item-subtitle>{{
													fixParameters(
														item.totaldepositcount
													)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Last Deposit
													Time</v-list-item-title
												>
												<v-list-item-subtitle>{{
													fixParameters(
														item.lastdeposittime
													)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>UL Agent
													Account</v-list-item-title
												>
												<v-list-item-subtitle>{{
													fixParameters(
														item.ulagentaccount
													)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Updated
													At</v-list-item-title
												>
												<v-list-item-subtitle>{{
													fixParameters(
														item.updatedAt
													)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-col>

									<!-- Col 3 -->
									<v-col lg="4" md="6" sm="12">
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Registered
													IP</v-list-item-title
												>
												<v-list-item-subtitle>{{
													fixParameters(item.regip)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Total
													Withdraw</v-list-item-title
												>
												<v-list-item-subtitle>{{
													fixParameters(
														item.totalwithdraw
													)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Total Withdraw
													Count</v-list-item-title
												>
												<v-list-item-subtitle>{{
													fixParameters(
														item.totalwithdrawcount
													)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>UL Agent
													ID</v-list-item-title
												>
												<v-list-item-subtitle>{{
													fixParameters(
														item.ulagentid
													)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-col>
								</v-row>
							</td>
						</template>
					</v-data-table>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "TableComponent",
		data() {
			return {
				search: "",
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
				headers: [
					{ text: "First Name", value: "firstname" },
					{ text: "Last Name", value: "lastname" },
					{ text: "Player ID", value: "playerid" },
					{ text: "Agent ID", value: "agentid" },
					{ text: "Balance", value: "balance" },
					{ text: "Tiers", value: "tiers" },
				],
			};
		},
		computed: {
			...mapGetters({
				players: "getPlayers",
			}),
			dateRangeText() {
				return this.date.join(" ~ ");
			},
		},
		mounted() {
			// Hitting parents.
			this.$emit("childFilterForDate", {
				duration: this.defaultFilterDate,
				startDate: this.date[0],
				endDate: this.date[1],
			});
		},
		methods: {
			whenDialogClosed() {
				if (this.date.length == 2) {
					this.$emit("childFilterForDate", {
						startDate: this.date[0],
						endDate: this.date[1],
					});
				}
			},
			fixParameters(value) {
				return value ? value : "-";
			},
			arrayToText(value) {
				if (Array.isArray(value)) {
					return value[0];
				} else {
					return value;
				}
			},
		},
		watch: {
			defaultFilterDate(value) {
				this.$emit("childFilterForDate", { duration: value });
			},
		},
	};
</script>
