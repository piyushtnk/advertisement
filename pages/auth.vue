<template>
	<div>
		<div v-if="$store.state.user">
			<p>
				You are authenticated. You can see the
				<NuxtLink :to="localePath('/')"> Home </NuxtLink>!
			</p>
			<button @click="logout">Logout</button>
		</div>
		<p v-else class="mt-15">
			<v-row no-gutters>
				<v-col cols="12">
					<v-card class="mx-auto" max-width="500" outlined>
						<v-list-item three-line>
							<v-list-item-content>
								<div class="overline mb-4">
									Login with your credential
								</div>
								<!-- Form -->
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
											showPassword
												? 'mdi-eye'
												: 'mdi-eye-off'
										"
										v-model="password"
										:error-messages="passwordErrors"
										label="Password"
										required
										@click:append="
											showPassword = !showPassword
										"
										:type="
											showPassword ? 'text' : 'password'
										"
										@input="$v.password.$touch()"
										@blur="$v.password.$touch()"
									></v-text-field>

									<v-btn
										outlined
										text
										float-right
										large
										class="float-right mt-5"
										type="submit"
									>
										Login
									</v-btn>
								</form>
							</v-list-item-content>
						</v-list-item>
					</v-card>
				</v-col>
			</v-row>
		</p>
	</div>
</template>

<script>
	import { validationMixin } from "vuelidate";
	import { required, minLength, email } from "vuelidate/lib/validators";
	export default {
		layout: "login",
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
				const success = await this.$store.dispatch("login", formData);
				if (success) {
					this.$router.push(this.localePath("/system"));
				}
			},
		},
	};
</script>
