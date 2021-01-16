<template>
  <div>
    <div v-if="$store.state.user">
      <p>
        You are authenticated. You can see the
        <NuxtLink to="/"> Home </NuxtLink>!
      </p>
      <button @click="logout">
        Logout
      </button>
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
                <form>
                  <v-text-field
                    v-model="username"
                    :error-messages="nameErrors"
                    :counter="10"
                    label="Username"
                    required
                    @input="$v.username.$touch()"
                    @blur="$v.username.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :error-messages="passwordErrors"
                    label="Password"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  ></v-text-field>
                </form>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn outlined text float-right large @click="submit">
                Login
              </v-btn>
            </v-card-actions>
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
    username: { required, minLength: minLength(4) },
    password: { required, minLength: minLength(4) }
  },

  data: () => ({
    username: "",
    password: ""
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.minLength &&
        errors.push("Username must be at minimum 4 characters long");
      !this.$v.username.required && errors.push("Username is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be at minimum 4 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    }
  },
  methods: {
    submit(e) {
      this.$v.$touch();
      const formData = {
        username: this.username,
        password: this.password
      };
      this.$store.dispatch("login", formData);
    }
  }
};
</script>
