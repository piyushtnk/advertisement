<template>
  <div>
    <div v-if="$store.state.auth">
      <p>
        You are authenticated. You can see the
        <NuxtLink to="/system/secret"> secret page </NuxtLink>!
      </p>
      <button @click="logout">
        Logout
      </button>
    </div>
    <p v-else>
      Please
      <NuxtLink to="/system/login"> login </NuxtLink>.
    </p>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "authenticate",
  methods: {
    logout() {
      Cookie.remove("auth");
      this.$store.commit("setAuth", null);
    }
  }
};
</script>
