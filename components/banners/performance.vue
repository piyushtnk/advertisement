<template>
	<div>
		<!-- Filter Area -->
		<v-card class="my-5" outlined>
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
									{{ $t("cancel") }}
								</v-btn>
								<v-btn
									text
									color="primary"
									@click="$refs.dialog.save(date)"
								>
									{{ $t("ok") }}
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

					<template v-slot:[`item.allClientsCount`]="{ item }">
						<v-chip
							outlined
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
						<v-chip outlined color="purple" class="ma-2">
							{{ numberFormat(item.views) }}
						</v-chip>
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
				loading: false,
				sortBy: "id|desc",
			};
		},
		computed: {
			...mapGetters({
				banners: "getBannersPerf",
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
						text: this.$t("id"),
						value: "id",
						sortable: false,
					},
					{
						text: this.$t("banner"),
						value: "uniqueId",
						sortable: false,
					},
					{ text: this.$t("destinationURL"), value: "redirectUrl" },
					{ text: this.$t("advertisementSource"), value: "comment" },
					{ text: this.$t("clicks"), value: "allClientsCount" },
					{ text: this.$t("views"), value: "views", sortable: false },
					{ text: this.$t("createdAt"), value: "createdAt" },
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
		},
		watch: {
			banners(value) {
				this.loading = false;
			},
			date(value) {
				if (value.length == 2) {
					this.reportDisable = false;
				} else {
					this.reportDisable = true;
				}
			},
		},
	};
</script>

