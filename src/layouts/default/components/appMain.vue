<template>
  <section class="app-main">
    <!-- <keep-alive :include="cachedViews"> -->
    <router-view :key="key" />
    <!-- </keep-alive> -->
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppMain',
  computed: {
    // cachedViews() {
    //   return this.$store.state.tagsView.cachedViews
    // },
    key() {
      return this.$route.fullPath;
    },
  },
});
</script>

<style scoped>
.app-main {
  height: -moz-calc(100vh - 81px);
  height: -webkit-calc(100vh - 81px);
  height: calc(100vh - 81px);
  /* min-height: 100%; */
  /* width: 100%; */
  position: relative;
  overflow: hidden;
  margin: 15px;
}
</style>
