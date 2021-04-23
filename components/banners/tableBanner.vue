<template>
	<div>
		<!-- Filter Area -->
		<v-card class="my-5" outlined>
			<v-card-text>
				<div class="text-uppercase">
					{{ $t("filter") }}
				</div>
				<v-row align="center">
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
					<v-col cols="12" lg="3" md="3" sm="12">
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
					<v-col cols="12" lg="3" md="3" sm="12">
						<v-btn
							color="red"
							class="white--text"
							@click="clearSearchFilter(7)"
							block
							:loading="loading"
						>
							{{ $t("clear") }}
							<v-icon right dark> mdi-trash-can </v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

		<!-- Table Listing -->
		<v-card outlined>
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
						<v-tooltip top color="primary">
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									v-bind="attrs"
									v-on="on"
									color="blue"
									class="ma-2 white--text"
									@click="copyGetUrl(item)"
									small
								>
									{{ $t("copy") }}
									<v-icon right dark>
										mdi-content-copy
									</v-icon>
								</v-btn>
							</template>
							<span>{{ getUrl(item) }}</span>
						</v-tooltip>
					</template>

					<template v-slot:[`item.apiLink`]="{ item }">
						<v-tooltip top color="primary">
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									v-bind="attrs"
									v-on="on"
									color="blue"
									class="ma-2 white--text"
									@click="copyApiUrl(item)"
									small
								>
									{{ $t("copy") }}
									<v-icon right dark>
										mdi-content-copy
									</v-icon>
								</v-btn>
							</template>
							<span>{{ getApiUrl(item) }}</span>
						</v-tooltip>

						<v-tooltip top color="orange">
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									v-bind="attrs"
									v-on="on"
									color="orange"
									class="ma-2 white--text"
									@click="copyApiUrlOfCurrentClient(item)"
									small
								>
									{{ $t("copyYourDomain") }}
									<v-icon right dark>
										mdi-content-copy
									</v-icon>
								</v-btn>
							</template>
							<span>{{ getApiUrlOfCurrentClient(item) }}</span>
						</v-tooltip>
					</template>

					<!-- Official way to edit column - as per documentation only -->
					<template v-slot:item.api="{ item }">
						<v-tooltip top color="primary">
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									v-bind="attrs"
									v-on="on"
									color="blue"
									class="ma-2 white--text"
									@click="copyFindImage(item)"
									small
								>
									{{ $t("copy") }}
									<v-icon right dark>
										mdi-content-copy
									</v-icon>
								</v-btn>
							</template>
							<span>{{ findImage(item) }}</span>
						</v-tooltip>
					</template>

					<template v-slot:item.cost="{ item }">
						<div
							v-for="(costItem, index) in item.cost"
							:key="index"
						>
							<div class="my-2">
								<v-chip class="ma-2" color="green" outlined>
									{{ costItem.startDate }} -
									{{ costItem.endDate }}
								</v-chip>
								<v-chip class="ma-2" color="secondary" outlined>
									({{ costItem.currencyCode }}
									{{
										staticNumberFormat(
											costItem.cost ? costItem.cost : 0
										)
									}})
								</v-chip>
							</div>
							<v-divider></v-divider>
						</div>
					</template>

					<!-- Dialog Box -->
					<template v-slot:top class="m-0 p-0">
						<v-dialog
							v-model="dialog"
							max-width="50%"
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
													disabled
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
											<v-col cols="12" sm="12" md="12">
												<v-btn
													outlined
													color="green"
													@click="costRow('add')"
												>
													<v-icon>mdi-plus</v-icon>
													{{ $t("addNew") }}
												</v-btn>
											</v-col>
											<v-col cols="12" sm="12" md="12">
												<v-row
													v-for="(
														item, index
													) in editedItem.cost"
													v-bind:key="index"
												>
													<v-col cols="3">
														<SingleDatePickerComponent
															:label="
																$t('startDate')
															"
															:date.sync="
																editedItem.cost[
																	index
																].startDate
															"
														/>
													</v-col>
													<v-col cols="3">
														<SingleDatePickerComponent
															:label="
																$t('endDate')
															"
															:date.sync="
																editedItem.cost[
																	index
																].endDate
															"
														/>
													</v-col>
													<v-col cols="3">
														<v-select
															:items="currency"
															v-model="
																editedItem.cost[
																	index
																].currencyCode
															"
															:label="
																$t('currency')
															"
															item-text="currencyCode"
															item-value="currencyCode"
														></v-select>
													</v-col>
													<v-col cols="2">
														<v-text-field
															v-model="
																editedItem.cost[
																	index
																].cost
															"
															:label="$t('cost')"
														>
														</v-text-field>
													</v-col>
													<v-col cols="1">
														<v-btn
															class="ma-2"
															outlined
															x-small
															fab
															color="red"
															@click="
																costRow(
																	'remove',
																	index
																)
															"
														>
															<v-icon
																>mdi-minus</v-icon
															>
														</v-btn>
													</v-col>
												</v-row>
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
							overlay-color="secondary"
							:overlay-opacity="0.5"
						>
							<v-sheet class="text-center pt-5" height="300px">
								<div class="mb-5 text-h4 text-uppercase">
									{{ $t("areYouSure") }}
								</div>
								<v-btn
									text
									@click="closeDelete"
									color="success"
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
	import SingleDatePickerComponent from "~/components/SingleDatePicker";

	export default {
		name: "TableBannerComponent",
		mixins: [Variables, Global],
		components: { SingleDatePickerComponent: SingleDatePickerComponent },
		data() {
			return {
				defaultFilterDate: 1,
				dialog: false,
				dialogDelete: false,
				editedIndex: -1,
				editedItem: {
					uniqueId: "",
					imageType: "",
					redirectUrl: "",
					comment: "",
					bannerImage: [],
					cost: [],
				},
				defaultItem: {
					uniqueId: "",
					imageType: "",
					redirectUrl: "",
					comment: "",
					bannerImage: [],
					cost: [],
				},
				bannerCost: "",
				loading: false,
				sortBy: "id|desc",
			};
		},
		computed: {
			...mapGetters({
				banners: "getBanners",
				getViewsStore: "getViews",
				currency: "getCurrency",
			}),
			headerSearch() {
				return [
					{ text: this.$t("exactBannerId"), value: "id" },
					{ text: this.$t("bannerLink"), value: "uniqueId" },
					{ text: this.$t("destinationURL"), value: "redirectUrl" },
					{ text: this.$t("advertisementSource"), value: "comment" },
				];
			},
			headers() {
				return [
					{
						text: this.$t("id"),
						value: "id",
						sortable: false,
					},
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
					{
						text: this.$t("apiLink"),
						value: "apiLink",
						sortable: false,
					},
					{
						text: this.$t("containerLink"),
						value: "api",
						sortable: false,
						width: "10px",
						fixed: true,
					},
					{ text: this.$t("destinationURL"), value: "redirectUrl" },
					{ text: this.$t("advertisementSource"), value: "comment" },
					{ text: this.$t("cost"), value: "cost" },
					{ text: this.$t("createdAt"), value: "createdAt" },
					{ text: this.$t("actions"), value: "actions", sortable: false },
				];
			},
		},
		methods: {
			findImage(item) {
				let path = null;
				try {
					path = `${process.env.CLOUD_URL}/banner/${item.uniqueId}.${item.imageType}`;
				} catch (e) {
					path = require("~/assets/banner/default.jpg");
				}
				return path;
			},

			copyFindImage(item) {
				let path = "";
				try {
					path = `${process.env.CLOUD_URL}/banner/${item.uniqueId}.${item.imageType}`;
				} catch (e) {
					path = require("~/assets/banner/default.jpg");
				}
				this.copyToClipboard(path);
			},

			getUrl(item) {
				return window.location.origin + "/" + item.uniqueId;
			},

			copyGetUrl(item) {
				const text = window.location.origin + "/" + item.uniqueId;
				this.copyToClipboard(text);
			},

			getApiUrl(item) {
				return `${process.env.API_URL}image/banner/${item.uniqueId}`;
			},

			getApiUrlOfCurrentClient(item) {
				return `${window.location.origin}/api/image/banner/${item.uniqueId}`;
			},

			copyApiUrlOfCurrentClient(item) {
				const text = `${window.location.origin}/api/image/banner/${item.uniqueId}`;
				this.copyToClipboard(text);
			},

			copyApiUrl(item) {
				const text = `${process.env.API_URL}image/banner/${item.uniqueId}`;
				this.copyToClipboard(text);
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
				let fileContent = `<html><head><body><a href="${process.env.DOMAIN}/${item.uniqueId}"><img src="${process.env.API_URL}api/image/banner/${item.uniqueId}" onload="document.cookie='prebpcb91=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'" /></a></body></head></html>`;
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

			// checkRegisteredPlayers(row) {
			// 	this.$router.push(
			// 		this.localePath(`/system/registered-players?bannerId=${row.id}`)
			// 	);
			// },

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
				this.editedItem.index = this.editedIndex;
				if (this.editedIndex > -1) {
					if (this.$store.dispatch("updateBanner", this.editedItem)) {
						this.loading = false;
					}
				} else {
					this.banners.data.push(this.editedItem);
				}
				this.close();
			},
			costRow(type, index) {
				if (type == "add") {
					this.editedItem.cost.push({
						startDate: this.$moment()
							.startOf("month")
							.format("YYYY-MM-DD"),
						endDate: this.$moment().format("YYYY-MM-DD"),
						currencyCode: "",
						cost: "",
					});
				} else {
					if (confirm(this.$t("areYouSure"))) {
						if (
							this.$store.dispatch(
								"deleteBannerCost",
								this.editedItem.cost[index].id
							)
						) {
							this.editedItem.cost.splice(index, 1);
						}
					}
				}
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
		},
	};
</script>

