<template>
	<div>
		<v-row>
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-card elevation="2" outlined tile class="mx-auto">
					<v-card-text>
						<div class="text-uppercase">
							{{ $t("registerYourBanner") }}
						</div>
						<div class="text--primary">
							<form v-on:submit.prevent="submit">
								<v-row>
									<v-col cols="12" lg="3" md="3" sm="12">
										<v-file-input
											accept="image/*"
											:label="$t('chooseBanner')"
											v-model="bannerImage"
											:error-messages="bannerImageErrors"
											required
											@input="$v.bannerImage.$touch()"
											@blur="$v.bannerImage.$touch()"
										></v-file-input>
										<span
											>{{ $t("supportedFormat") }}: JPEG,
											JPG, PNG, GIF, WEBP.</span
										>
									</v-col>

									<v-col cols="12" lg="3" md="3" sm="12">
										<v-select
											:items="bannerDomains"
											v-model="bannerUrl"
											:error-messages="urlErrors"
											:label="$t('destinationURL')"
											required
											@input="$v.bannerUrl.$touch()"
											@blur="$v.bannerUrl.$touch()"
											item-text="domainName"
											item-value="domainName"
										></v-select>
										<span>
											<nuxt-link
												to="/system/banner/domain"
											>
												{{ $t("addNewDomain") }}
											</nuxt-link>
										</span>
									</v-col>

									<v-col cols="12" lg="3" md="3" sm="12">
										<v-text-field
											v-model="comment"
											:error-messages="commentErrors"
											:label="$t('adsSource')"
											required
											@input="$v.comment.$touch()"
											@blur="$v.comment.$touch()"
										></v-text-field>
									</v-col>

									<v-col cols="12" lg="3" md="3" sm="12">
										<v-text-field
											v-model="cost"
											:error-messages="costErrors"
											:label="$t('cost')"
											required
											@input="$v.cost.$touch()"
											@blur="$v.cost.$touch()"
										></v-text-field>
									</v-col>
								</v-row>
							</form>
						</div>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn
							outlined
							color="teal accent-4"
							@click="submit"
							:loading="loading"
						>
							{{ $t("submit") }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import { validationMixin } from "vuelidate";
	import { required, numeric } from "vuelidate/lib/validators";

	export default {
		name: "UploadComponent",
		data: () => ({
			bannerImage: null,
			bannerUrl: null,
			comment: null,
			cost: 0,
			loading: false,
		}),
		mixins: [validationMixin],
		validations: {
			bannerImage: { required },
			bannerUrl: { required },
			comment: { required },
			cost: { numeric },
		},
		computed: {
			...mapGetters({
				dashboard: "getDashboard",
				bannerDomains: "getBannerDomains",
			}),
			bannerImageErrors() {
				const errors = [];
				if (!this.$v.bannerImage.$dirty) return errors;
				!this.$v.bannerImage.required && errors.push("Banner is required.");
				return errors;
			},
			urlErrors() {
				const errors = [];
				if (!this.$v.bannerUrl.$dirty) return errors;
				!this.$v.bannerUrl.required && errors.push("URL is required.");
				return errors;
			},
			commentErrors() {
				const errors = [];
				if (!this.$v.comment.$dirty) return errors;
				!this.$v.comment.required && errors.push("Comment is required.");
				return errors;
			},
			costErrors() {
				const errors = [];
				if (!this.$v.cost.$dirty) return errors;
				!this.$v.cost.numeric && errors.push("Cost should be in numbers.");
				return errors;
			},
		},
		methods: {
			submit() {
				let $this = this;
				$this.$v.$touch();
				$this.loading = true;
				if ($this.$v.$invalid) {
					$this.loading = false;
					return false;
				} else {
					let editedObject = {
						image: $this.bannerImage,
						url: $this.bannerUrl,
						comment: $this.comment,
						cost: $this.cost,
					};
					if ($this.$store.dispatch("uploadBanner", editedObject)) {
						$this.loading = false;
					}
				}
			},
		},
	};
</script>
