<template>
  <div>
    <v-row>
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-card elevation="2" outlined tile class="mx-auto">
          <v-card-text>
            <div>Register your banner</div>
            <div class="text--primary">
              <form>
                <v-row>
                  <v-col cols="12" lg="6" md="6" sm="12">
                    <v-file-input
                      accept="image/*"
                      label="Your banner"
                      v-model="bannerImage"
                      :error-messages="bannerImageErrors"
                      required
                      @input="$v.bannerImage.$touch()"
                      @blur="$v.bannerImage.$touch()"
                    ></v-file-input>
                  </v-col>

                  <v-col cols="12" lg="6" md="6" sm="12">
                    <v-text-field
                      v-model="bannerUrl"
                      :error-messages="urlErrors"
                      label="Banner URL"
                      required
                      @input="$v.bannerUrl.$touch()"
                      @blur="$v.bannerUrl.$touch()"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </form>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="teal accent-4"
              @click="submit"
              :loading="loading"
            >
              Submit
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
import { required, url } from "vuelidate/lib/validators";

export default {
  name: "UploadComponent",
  data: () => ({
    bannerImage: null,
    bannerUrl: null,
    loading: false
  }),
  mixins: [validationMixin],
  validations: {
    bannerImage: { required },
    bannerUrl: { required, url }
  },
  computed: {
    ...mapGetters({
      dashboard: "getDashboard"
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
      !this.$v.bannerUrl.url && errors.push("URL is not correct.");
      return errors;
    }
  },
  methods: {
    submit() {
      let $this = this;
      $this.$v.$touch();
      $this.loading = true;
      if ($this.$v.$invalid) {
        $this.loading = false;
        return false;
      }
      setTimeout(() => {
        if (
          $this.$store.dispatch("uploadBanner", {
            image: $this.bannerImage,
            url: $this.bannerUrl
          })
        ) {
          $this.loading = false;
        }
      }, 1000);
    }
  }
};
</script>