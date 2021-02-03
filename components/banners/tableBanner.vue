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
				:headers="headers"
				item-key="id"
				class="elevation-1"
				:options.sync="options"
				:server-items-length="banners.total"
				:pageCount="banners.totalPages"
				:items="banners.data"
				:search="search"
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

				<template v-slot:[`item.api`]="{ item }">
					<a :href="findImage(item)" target="_blank">
						{{ findImage(item) }}
					</a>
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
								<span class="headline">Edit Item</span>
							</v-card-title>

							<v-card-text>
								<v-container>
									<v-row>
										<v-col cols="12" sm="6" md="6">
											<v-text-field
												v-model="editedItem.redirectUrl"
												label="Destination URL"
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="6" md="6">
											<v-text-field
												v-model="editedItem.comment"
												label="Advertisement Source"
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
									Cancel
								</v-btn>
								<v-btn
									color="blue darken-1"
									text
									@click="save"
									:loading="loading"
								>
									Save
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<v-dialog
						v-model="dialogDelete"
						max-width="500px"
						transition="dialog-top-transition"
					>
						<v-card color="red">
							<v-card-title class="headline"
								>Are you sure you want to delete this
								item?</v-card-title
							>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn text @click="closeDelete">Cancel</v-btn>
								<v-btn
									text
									@click="deleteItemConfirm"
									depressed
									:loading="loading"
									>OK</v-btn
								>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</template>

				<!-- Actions -->
				<template v-slot:[`item.actions`]="{ item }">
					<v-icon @click="editItem(item)" large color="green">
						mdi-pencil-circle
					</v-icon>
					<v-icon @click="deleteItem(item)" large color="red">
						mdi-delete-circle
					</v-icon>
				</template>
			</v-data-table>
		</v-card>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import Variables from "~/mixins/variables";

	export default {
		name: "TableBannerComponent",
		mixins: [Variables],
		data() {
			return {
				defaultFilterDate: 7,
				headers: [
					{ text: "Banner", value: "uniqueId" },
					{ text: "Banner Link", value: "url" },
					{ text: "Container URL", value: "api" },
					{ text: "Destination URL", value: "redirectUrl" },
					{ text: "Advertisement Source", value: "comment" },
					{ text: "Created At", value: "createdAt" },
					{ text: "Actions", value: "actions", sortable: false },
				],
				dialog: false,
				dialogDelete: false,
				editedIndex: -1,
				editedItem: {
					allClientsCount: 0,
					comment: "",
					createdAt: "",
					id: 0,
					imageType: "",
					redirectUrl: "",
					uniqueId: "",
					updatedAt: "",
				},
				defaultItem: {
					redirectUrl: "",
					comment: "",
				},
				loading: false,
			};
		},
		computed: {
			...mapGetters({
				banners: "getBanners",
			}),
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

			close() {
				this.dialog = false;
				this.$nextTick(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
				});
			},

			closeDelete() {
				this.dialogDelete = false;
				this.$nextTick(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
				});
			},

			save() {
				if (this.editedIndex > -1) {
					this.loading = true;
					Object.assign(
						this.banners.data[this.editedIndex],
						this.editedItem
					);
					if (this.$store.dispatch("updateBanner", this.editedItem)) {
						this.loading = false;
					}
				} else {
					this.banners.data.push(this.editedItem);
				}
				this.close();
			},
		},
		watch: {
			dialog(val) {
				val || this.close();
			},
			dialogDelete(val) {
				val || this.closeDelete();
			},
			banners() {
				this.loading = false;
			},
		},
	};
</script>
