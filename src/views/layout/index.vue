<template>
  <div class="app-wrapper">
    <div>
      <sidebar class="sidebar sidebar-container" />
      <navbar />
      <div class="main">
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout/components'

export default {
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
}
</script>

<style>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.sidebar {
  position: fixed;
  top: 50px;
  bottom: 0;
  height: 100%;
}

.main {
  position: fixed;
  top: 50px;
  left: 210px;
  bottom: 0;
  height: 100%;
  width: calc(100% - 240px);
}
</style>
