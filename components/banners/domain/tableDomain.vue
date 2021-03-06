<template>
	<div>
		<v-card>
			<v-card-title>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					:label="$t('search')"
					single-line
					hide-details
				></v-text-field>
			</v-card-title>
			<v-data-table
				:headers="headers"
				:items="bannerDomains"
				:search="search"
				item-key="id"
				class="elevation-1"
			>
				<template v-slot:[`item.domainName`]="{ item }">
					<a :href="item.domainName" target="_blank">
						{{ item.domainName }}
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
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												v-model="editedItem.domainName"
												label="Destination URL"
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
					<!-- <v-icon @click="editItem(item)" large color="green">
						mdi-pencil-circle
					</v-icon> -->
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

	export default {
		name: "TableBannerDomainComponent",
		data() {
			return {
				search: "",
				dialog: false,
				dialogDelete: false,
				editedIndex: -1,
				editedItem: {
					domainName: "",
				},
				defaultItem: {
					domainName: "",
				},
				loading: false,
			};
		},
		computed: {
			...mapGetters({
				bannerDomains: "getBannerDomains",
			}),
			headers() {
				return [
					{ text: this.$t("destinationURL"), value: "domainName" },
					{ text: this.$t("createdAt"), value: "createdAt" },
					{ text: this.$t("actions"), value: "actions", sortable: false },
				];
			},
		},
		methods: {
			// Actions area
			editItem(item) {
				this.editedIndex = this.bannerDomains.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialog = true;
			},

			deleteItem(item) {
				this.editedIndex = this.bannerDomains.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialogDelete = true;
			},

			deleteItemConfirm() {
				this.loading = true;
				if (this.$store.dispatch("deleteBannerDomain", this.editedItem)) {
					this.bannerDomains.splice(this.editedIndex, 1);
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
						this.bannerDomains[this.editedIndex],
						this.editedItem
					);
					if (this.$store.dispatch("addDomainName", this.editedItem)) {
						this.loading = false;
					}
				} else {
					this.bannerDomains.push(this.editedItem);
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
		},
	};
</script>
