<template>
  <div class="box">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        :unique-opened="true"
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

<script lang="ts">
import { getMenu } from '@/utils/menu'
import { defineComponent } from 'vue'
import SidebarItem from './SidebarItem.vue'

export default defineComponent({
  name: 'Sidebar',
  components: { SidebarItem },
  computed: {
    menuRouters() {
      let vm = this
      let menuRouters = vm.$store.getters.menuRouters

      if (menuRouters && menuRouters.length > 0) {
        return menuRouters
      }

      const menus = getMenu()
      if (menus && menus.length > 0) {
        // 将菜单数据转化成路由以及菜单信息
        const accessedRouters = menus

        // 设置路由信息
        vm.$store.dispatch('generateRoutes', accessedRouters)

        // 添加路由信息
        const addRouters = vm.$store.getters.addRouters
        if (addRouters) {
          addRouters.forEach((e: any) => {
            vm.$router.addRoute(e) // 动态添加可访问路由表
          })
        }
      }

      menuRouters = vm.$store.getters.menuRouters

      return menuRouters
    },
    sidebar() {
      return this.$store.getters.sidebar
    },
    isCollapse() {
      return !(this as any).sidebar.opened
    }
  },
  data() {
    return {
      active: '1-1-1',
      data: []
    }
  },
  created() {
    // window.menuRouters = this.menuRouters
    // console.log(this.menuRouters)
  }
})
</script>

<style scoped>
.box-wrap {
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;
  height: auto;
}
.box {
  width: auto;
}
</style>
