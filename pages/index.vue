<template>
  <div>
    <div v-if="token">
      <p>
        You are authenticated. You can login to system!
        <NuxtLink to="/system"> Click Here </NuxtLink>
      </p>
    </div>
    <p v-else>
      Please
      <NuxtLink to="/login"> login </NuxtLink>.
    </p>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  layout: "login",
  middleware: "authenticate",
  data() {
    return {
      token: localStorage.token
    };
  }
};
</script>
