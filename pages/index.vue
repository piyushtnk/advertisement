<template>
	<v-container fill-height fluid>
		<v-row align="center" justify="center">
			<v-col>
				<v-card class="mx-auto px-5 py-5" max-width="500" flat>
					<v-card-text>
						<div class="text-center">
							<v-icon size="100"
								>mdi-account-arrow-right-outline</v-icon
							>
						</div>
						<form v-on:submit.prevent="submit">
							<v-text-field
								v-model="email"
								:error-messages="emailErrors"
								:counter="20"
								label="Email"
								required
								@input="$v.email.$touch()"
								@blur="$v.email.$touch()"
							></v-text-field>
							<v-text-field
								:append-icon="
									showPassword ? 'mdi-eye' : 'mdi-eye-off'
								"
								v-model="password"
								:error-messages="passwordErrors"
								label="Password"
								required
								@click:append="showPassword = !showPassword"
								:type="showPassword ? 'text' : 'password'"
								@input="$v.password.$touch()"
								@blur="$v.password.$touch()"
							></v-text-field>

							<v-btn
								outlined
								text
								large
								class="mt-5"
								type="submit"
							>
								Login
								<v-icon right> mdi-login </v-icon>
							</v-btn>
						</form>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
</style>

<script>
	import { validationMixin } from "vuelidate";
	import { required, minLength, email } from "vuelidate/lib/validators";
	export default {
		layout: "auth",
		middleware: "notAuthenticate",
		mixins: [validationMixin],

		validations: {
			email: { required, email },
			password: { required, minLength: minLength(4) },
		},

		data: () => ({
			email: "",
			password: "",
			showPassword: false,
		}),

		computed: {
			emailErrors() {
				const errors = [];
				if (!this.$v.email.$dirty) return errors;
				!this.$v.email.email && errors.push("Email must be correct");
				!this.$v.email.required && errors.push("Email is required.");
				return errors;
			},
			passwordErrors() {
				const errors = [];
				if (!this.$v.password.$dirty) return errors;
				!this.$v.password.minLength &&
					errors.push("Password must be at minimum 4 characters long");
				!this.$v.password.required && errors.push("Password is required.");
				return errors;
			},
		},
		methods: {
			async submit(e) {
				this.$v.$touch();
				const formData = {
					email: this.email,
					password: this.password,
				};
				const success = await this.$store.dispatch("auth/login", formData);
				if (success) {
					this.$router.push(this.localePath("/system"));
				}
			},
		},
	};
</script>
