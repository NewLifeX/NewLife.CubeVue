<template>
  <div class="box">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="false"
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
  name: 'Menu',
  components: { SidebarItem },
  computed: {
    ...mapGetters(['menuRouters']),
  },
  data() {
    return {
      active: '1-1-1',
      data: [],
    }
  },
  created() {
    console.log(this.menuRouters)
  },
  methods: {
    activeMenu() {
      console.log(this.$route)
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
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
