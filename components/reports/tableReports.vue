<template>
	<div>
		<v-row>
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
						<template v-slot:[`item.firstname`]="{ item }">
							{{ isNull(item.firstname) }}
							{{ isNull(item.lastname) }}
						</template>

						<template v-slot:expanded-item="{ headers, item }">
							<td :colspan="headers.length">
								<v-row no-gutters>
									<v-col lg="4" md="6" sm="12">
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Create
													Date</v-list-item-title
												>
												<v-list-item-subtitle
													>{{
														isNull(item.createdate)
													}}
												</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-col>
									<v-col lg="4" md="6" sm="12">
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
									</v-col>
									<v-col lg="4" md="6" sm="12">
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Total
													Deposit</v-list-item-title
												>
												<v-list-item-subtitle>{{
													isNull(item.totaldeposit)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-col>
									<v-col lg="4" md="6" sm="12">
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Last Withdraw
													Time</v-list-item-title
												>
												<v-list-item-subtitle>{{
													isNull(
														item.lastwithdrawtime
													)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-col>
									<v-col lg="4" md="6" sm="12">
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Created
													At</v-list-item-title
												>
												<v-list-item-subtitle>{{
													isNull(item.createdAt)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-col>

									<v-col lg="4" md="6" sm="12">
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Login
													Time</v-list-item-title
												>
												<v-list-item-subtitle>{{
													isNull(item.logintime)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-col>
									<v-col lg="4" md="6" sm="12">
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Total Deposit
													Count</v-list-item-title
												>
												<v-list-item-subtitle>{{
													isNull(
														item.totaldepositcount
													)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-col>
									<v-col lg="4" md="6" sm="12">
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Last Deposit
													Time</v-list-item-title
												>
												<v-list-item-subtitle>{{
													isNull(item.lastdeposittime)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-col>
									<v-col lg="4" md="6" sm="12">
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>UL Agent
													Account</v-list-item-title
												>
												<v-list-item-subtitle>{{
													isNull(item.ulagentaccount)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-col>
									<v-col lg="4" md="6" sm="12">
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Updated
													At</v-list-item-title
												>
												<v-list-item-subtitle>{{
													isNull(item.updatedAt)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-col>

									<v-col lg="4" md="6" sm="12">
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Registered
													IP</v-list-item-title
												>
												<v-list-item-subtitle>{{
													isNull(item.regip)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-col>
									<v-col lg="4" md="6" sm="12">
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Total
													Withdraw</v-list-item-title
												>
												<v-list-item-subtitle>{{
													isNull(item.totalwithdraw)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-col>
									<v-col lg="4" md="6" sm="12">
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>Total Withdraw
													Count</v-list-item-title
												>
												<v-list-item-subtitle>{{
													isNull(
														item.totalwithdrawcount
													)
												}}</v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-col>
									<v-col lg="4" md="6" sm="12">
										<v-list-item two-line>
											<v-list-item-content>
												<v-list-item-title
													>UL Agent
													ID</v-list-item-title
												>
												<v-list-item-subtitle>{{
													isNull(item.ulagentid)
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
	import Variables from "~/mixins/variables";

	export default {
		name: "TableReportsComponent",
		mixins: [Variables],
		data() {
			return {
				search: "",
				date: [],
				modal: false,
				defaultFilterDate: 1,
				headers: [
					{ text: "User ID", value: "playerid" },
					{ text: "Name", value: "firstname" },
					{ text: "Mobile", value: "mobile" },
					{ text: "Registration Time", value: "createdate" },
					{ text: "IP", value: "regip" },
					{ text: "Device", value: "logindevice" },
					{ text: "Source URL", value: "ulagentaccount" },
					{ text: "Total Top-up", value: "totaldeposit" },
					{ text: "Total Top-up Count", value: "totaldepositcount" },
					{ text: "Total Withdrawal", value: "totalwithdraw" },
					{ text: "Total Withdrawal Count", value: "totalwithdrawcount" },
					{ text: "Total Claimed", value: "totalbonus" },
					{ text: "Total Win/Lose", value: "totalwinloss" },
					{ text: "Total Valid Bet", value: "validbet" },
					{ text: "Country", value: "country" },
					// { text: "Language", value: "language" },
					{ text: "No. of IP", value: "logincount" },
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
			isNull(value) {
				if (value == "" || value == null || value == "null") {
					return "-";
				} else {
					return value;
				}
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
