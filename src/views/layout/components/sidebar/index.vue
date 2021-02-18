<template>
  <div class="box">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        :unique-opened="false"
        active-text-color="#409EFF"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in menuRouters"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  name: 'Sidebar',
  components: { SidebarItem },
  computed: {
    ...mapGetters(['menuRouters', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    },
  },
  data() {
    return {
      active: '1-1-1',
      data: [],
    }
  },
  created() {
    window.menuRouters = this.menuRouters
    console.log(this.menuRouters)
  },
}
</script>

<style scoped>
.box-wrap {
  display: flex;
  height: auto;
}
.box {
  width: auto;
}
</style>
