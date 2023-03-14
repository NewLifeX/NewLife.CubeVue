<template>
  <component :is="layout"> </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const layout = computed(() => store.state.app.layout);
</script>
