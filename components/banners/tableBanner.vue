<template>
	<div>
		<!-- Filter Area -->
		<v-card class="my-5">
			<v-card-text>
				<v-row align="center">
					<v-col cols="12" lg="3" md="3" sm="12">
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
									:label="$t('chooseSpecificDate')"
									prepend-icon="mdi-calendar"
									readonly
									v-bind="attrs"
									v-on="on"
								></v-text-field>
							</template>
							<v-date-picker
								v-model="date"
								scrollable
								range
								light
								:locale="$t('localeType')"
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
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-select
							v-model="defaultFilterDate"
							:items="filterDate"
							item-value="state"
							item-text="abbr"
							:label="$t('filterType')"
						/>
					</v-col>
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-select
							v-model="search.column"
							:items="headerSearch"
							item-value="value"
							item-text="text"
							:label="$t('columnName')"
						/>
					</v-col>
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-text-field
							v-model="search.value"
							:label="$t('searchText')"
							required
						></v-text-field>
					</v-col>
				</v-row>
				<v-row align="center">
					<v-col cols="12" lg="2" md="3" sm="12">
						<v-btn
							color="blue"
							class="white--text mx-auto"
							@click="beforeSearchMiddleware"
							block
							:loading="loading"
						>
							{{ $t("search") }}
							<v-icon right dark> mdi-account-search </v-icon>
						</v-btn>
					</v-col>
					<v-col cols="12" lg="2" md="3" sm="12">
						<v-btn
							color="red"
							class="white--text"
							@click="clearSearchFilter"
							block
							:loading="loading"
						>
							{{ $t("clear") }}
							<v-icon right dark> mdi-trash-can </v-icon>
						</v-btn>
					</v-col>
					<v-col cols="12" lg="2" md="3" sm="12">
						<v-btn
							color="green"
							class="white--text"
							@click="generateReport"
							block
							:loading="loading"
							:disabled="reportDisable"
						>
							{{ $t("report") }}
							<v-icon right dark> mdi-file </v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

		<!-- Table Listing -->
		<v-card>
			<v-card-text>
				<v-data-table
					:headers="headers"
					item-key="id"
					:options.sync="options"
					:server-items-length="banners.total"
					:pageCount="banners.totalPages"
					:items="banners.data"
					:loading="loading"
					:footer-props="footerProps"
				>
					<template v-slot:[`item.uniqueId`]="{ item }">
						<div class="py-5">
							<a :href="findImage(item)" target="_blank">
								<v-img
									:src="findImage(item)"
									height="100"
									width="300"
									class="grey lighten-2"
								/>
							</a>
						</div>
					</template>

					<template v-slot:[`item.url`]="{ item }">
						<a :href="getUrl(item)" target="_blank">
							{{ getUrl(item) }}
						</a>
					</template>

					<template v-slot:[`item.apiLink`]="{ item }">
						<a :href="getApiUrl(item)" target="_blank">
							{{ getApiUrl(item) }}
						</a>
					</template>

					<!-- Official way to edit column - as per documentation only -->
					<template v-slot:item.api="{ item }">
						<a :href="findImage(item)" target="_blank">
							{{ findImage(item) }}
						</a>
					</template>

					<template v-slot:[`item.allClientsCount`]="{ item }">
						<v-chip
							color="green"
							class="ma-2"
							:to="
								'/system/clients?bannerId=' +
								item.id +
								'&filterType=' +
								defaultFilterDate
							"
						>
							{{ numberFormat(item.allClientsCount) }}
						</v-chip>
					</template>

					<template v-slot:item.views="{ item }">
						<v-chip color="purple" class="ma-2">
							{{ numberFormat(item.views) }}
						</v-chip>
					</template>

					<!-- Dialog Box -->
					<template v-slot:top class="m-0 p-0">
						<v-dialog
							v-model="dialog"
							max-width="500px"
							transition="dialog-bottom-transition"
						>
							<v-card>
								<v-card-title>
									<span class="headline">{{
										$t("edit")
									}}</span>
								</v-card-title>

								<v-card-text>
									<v-container>
										<v-row>
											<v-col cols="12" sm="12" md="12">
												<v-file-input
													accept="image/*"
													:label="$t('updateBanner')"
													v-model="
														editedItem.bannerImage
													"
												></v-file-input>
											</v-col>
											<v-col cols="12" sm="12" md="12">
												<v-text-field
													v-model="
														editedItem.redirectUrl
													"
													:label="
														$t('destinationURL')
													"
												></v-text-field>
											</v-col>
											<v-col cols="12" sm="12" md="12">
												<v-text-field
													v-model="editedItem.comment"
													:label="
														$t(
															'advertisementSource'
														)
													"
												></v-text-field>
											</v-col>
										</v-row>
									</v-container>
								</v-card-text>

								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn
										color="blue darken-1"
										text
										@click="close"
									>
										{{ $t("cancel") }}
									</v-btn>
									<v-btn
										color="blue darken-1"
										text
										@click="save"
										:loading="loading"
									>
										{{ $t("save") }}
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
						<v-bottom-sheet
							v-model="dialogDelete"
							overlay-color="yellow"
							:overlay-opacity="0.5"
						>
							<v-sheet class="text-center pt-5" height="300px">
								<div class="mb-5 text-h4 text-uppercase">
									{{ $t("areYouSure") }}
								</div>
								<v-btn
									text
									@click="closeDelete"
									color="default"
									>{{ $t("cancel") }}</v-btn
								>
								<v-btn
									text
									@click="deleteItemConfirm"
									depressed
									outlined
									color="red"
									class="ml-5"
									:loading="loading"
									>{{ $t("ok") }}</v-btn
								>
							</v-sheet>
						</v-bottom-sheet>
					</template>

					<!-- Actions -->
					<template v-slot:[`item.actions`]="{ item }">
						<v-tooltip left color="purple">
							<template v-slot:activator="{ on, attrs }">
								<v-icon
									@click="editItem(item)"
									large
									color="green"
									v-bind="attrs"
									v-on="on"
								>
									mdi-pencil-circle
								</v-icon>
							</template>
							<span>{{ $t("edit") }}</span>
						</v-tooltip>

						<v-tooltip left color="purple">
							<template v-slot:activator="{ on, attrs }">
								<v-icon
									@click="deleteItem(item)"
									large
									color="red"
									v-bind="attrs"
									v-on="on"
								>
									mdi-delete-circle
								</v-icon>
							</template>
							<span>{{ $t("delete") }}</span>
						</v-tooltip>
						<v-tooltip left color="purple">
							<template v-slot:activator="{ on, attrs }">
								<v-icon
									@click="downloadCode(item)"
									large
									color="blue"
									v-bind="attrs"
									v-on="on"
								>
									mdi-code-braces-box
								</v-icon>
							</template>
							<span>{{ $t("downloadCode") }}</span>
						</v-tooltip>
						<v-tooltip left color="purple">
							<template v-slot:activator="{ on, attrs }">
								<v-icon
									@click="checkRegisteredPlayers(item)"
									large
									color="yellow"
									v-bind="attrs"
									v-on="on"
								>
									mdi-account-group
								</v-icon>
							</template>
							<span>{{ $t("layout.players") }}</span>
						</v-tooltip>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import Variables from "~/mixins/variables";
	import Global from "~/mixins/global";

	export default {
		name: "TableBannerComponent",
		mixins: [Variables, Global],
		data() {
			return {
				defaultFilterDate: 7,
				dialog: false,
				dialogDelete: false,
				editedIndex: -1,
				editedItem: {
					uniqueId: "",
					imageType: "",
					redirectUrl: "",
					comment: "",
					bannerImage: [],
				},
				defaultItem: {
					uniqueId: "",
					imageType: "",
					redirectUrl: "",
					comment: "",
					bannerImage: [],
				},
				loading: false,
				sortBy: "id|desc",
				reportDisable: true,
			};
		},
		computed: {
			...mapGetters({
				banners: "getBanners",
				getViewsStore: "getViews",
			}),
			headerSearch() {
				return [
					{ text: this.$t("bannerLink"), value: "uniqueId" },
					{ text: this.$t("destinationURL"), value: "redirectUrl" },
					{ text: this.$t("advertisementSource"), value: "comment" },
				];
			},
			headers() {
				return [
					{
						text: this.$t("banner"),
						value: "uniqueId",
						sortable: false,
					},
					{
						text: this.$t("bannerLink"),
						value: "url",
						sortable: false,
					},
					{ text: this.$t("apiLink"), value: "apiLink", sortable: false },
					{
						text: this.$t("containerLink"),
						value: "api",
						sortable: false,
						width: "10",
					},
					{ text: this.$t("destinationURL"), value: "redirectUrl" },
					{ text: this.$t("advertisementSource"), value: "comment" },
					{ text: this.$t("clicks"), value: "allClientsCount" },
					{ text: this.$t("views"), value: "views" },
					{ text: this.$t("createdAt"), value: "createdAt" },
					{ text: this.$t("actions"), value: "actions", sortable: false },
				];
			},
		},
		methods: {
			findImage(item) {
				let path = null;
				try {
					path = `https://storage.cloud.google.com/advertisement_storage/banner/${item.uniqueId}.${item.imageType}`;
				} catch (e) {
					path = require("~/assets/banner/default.jpg");
				}
				return path;
			},

			getUrl(item) {
				return window.location.origin + "/" + item.uniqueId;
			},

			getApiUrl(item) {
				return `http://999.money/api/image/banner/${item.uniqueId}`;
			},

			// Actions area
			editItem(item) {
				this.editedIndex = this.banners.data.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialog = true;
			},

			deleteItem(item) {
				this.editedIndex = this.banners.data.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialogDelete = true;
			},

			deleteItemConfirm() {
				this.loading = true;
				if (this.$store.dispatch("deleteBanner", this.editedItem)) {
					this.banners.data.splice(this.editedIndex, 1);
					this.loading = false;
				}
				this.closeDelete();
			},

			downloadCode(item) {
				let fileContent = `<html><head><body><a href="http://999.money/${item.uniqueId}"><img src="http://999.money/api/image/banner/${item.uniqueId}" onload="document.cookie='prebpcb91=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'" /></a></body></head></html>`;
				let element = document.createElement("a");
				element.setAttribute(
					"href",
					"data:text/html;charset=utf-8," +
						encodeURIComponent(fileContent)
				);
				element.setAttribute("download", item.uniqueId + ".html");
				element.style.display = "none";
				document.body.appendChild(element);
				element.click();
				document.body.removeChild(element);
			},

			checkRegisteredPlayers(row) {
				this.$router.push(
					this.localePath(`/system/registered-players?bannerId=${row.id}`)
				);
			},

			close() {
				this.dialog = false;
				// this.$nextTick(() => {
				// 	this.editedItem = Object.assign({}, this.defaultItem);
				// 	this.editedIndex = -1;
				// });
			},

			closeDelete() {
				this.dialogDelete = false;
				this.$nextTick(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
				});
			},

			save() {
				this.loading = true;
				if (this.editedIndex > -1) {
					// Object.assign(
					// 	this.banners.data[this.editedIndex],
					// 	this.editedItem
					// );
					if (this.$store.dispatch("updateBanner", this.editedItem)) {
						this.loading = false;
					}
				} else {
					this.banners.data.push(this.editedItem);
				}
				this.close();
			},

			generateReport() {
				this.loading = true;
				this.$axios
					.get("/report/today", {
						params: {
							startDate: this.date[0],
							endDate: this.date[1],
						},
					})
					.then((response) => {
						const csvString = [
							...response.data.data.map((item) => [
								item.agentId,
								item.comment,
								item.allClientsCount,
								item.playerCount,
								item.convertRate,
								item.firstDeposit,
								item.depositAmount,
								item.withdrawalAmount,
								item.profit,
							]),
						];
						var csv =
							"URL, Website, Clicks, Register, Covert Rate, First Deposit, Deposit, Withdraw, Profit\n";
						csvString.forEach(function (row) {
							csv += row.join(",");
							csv += "\n";
						});
						var hiddenElement = document.createElement("a");
						hiddenElement.href =
							"data:text/csv;charset=utf-8," +
							encodeURIComponent("\uFEFF" + csv);
						hiddenElement.target = "_blank";
						hiddenElement.download = "banner-reports.csv";
						hiddenElement.click();
						this.loading = false;
					});
			},
		},
		watch: {
			dialog(val) {
				val || this.close();
			},
			dialogDelete(val) {
				val || this.closeDelete();
			},
			banners(value) {
				this.loading = false;
			},
			dateRangeText(value) {
				if (this.date.length == 2) {
					this.reportDisable = false;
				}
			},
		},
	};
</script>

