<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    let $this = this;
    console.log($this.$route.params.id);
  }
};
</script>
