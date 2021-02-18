<template>
	<div>
		<v-row>
			<v-col cols="12" lg="12" md="12" sm="12">
				<v-card elevation="2" outlined tile class="mx-auto">
					<v-card-text>
						<div>{{ $t("registerYourBanner") }}</div>
						<div class="text--primary">
							<form v-on:submit.prevent="submit">
								<v-row>
									<v-col cols="12" lg="12" md="12" sm="12">
										<v-text-field
											v-model="url"
											:error-messages="urlErrors"
											:label="$t('destinationURL')"
											required
											@input="$v.url.$touch()"
											@blur="$v.url.$touch()"
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
	import { required } from "vuelidate/lib/validators";

	export default {
		name: "UploadBannerComponent",
		data: () => ({
			url: null,
			loading: false,
		}),
		mixins: [validationMixin],
		validations: {
			url: { required },
		},
		computed: {
			...mapGetters({
				bannerDomains: "getBannerDomains",
			}),
			urlErrors() {
				const errors = [];
				if (!this.$v.url.$dirty) return errors;
				!this.$v.url.required && errors.push("url is required.");
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
					if (
						$this.$store.dispatch("addDomainName", {
							domainName: $this.url,
						})
					) {
						$this.loading = false;
					}
				}
			},
		},
	};
</script>
