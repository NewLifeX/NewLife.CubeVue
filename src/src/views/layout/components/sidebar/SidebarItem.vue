<template>
  <div v-if="item.visible">
    <template
      v-if="
        onlyOneChild &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <router-link v-if="onlyOneChild" :to="onlyOneChild.path || onlyOneChild.url">
        <el-menu-item
          :index="onlyOneChild.path || onlyOneChild.url"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item :title="onlyOneChild.displayName" />
        </el-menu-item>
      </router-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="item.path || item.url" popper-append-to-body>
      <template v-slot:title>
        <item v-if="item" :icon="item.meta && item.meta.icon" :title="item.displayName" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="child.path"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Item from './Item.vue'

export default defineComponent({
  name: 'SidebarItem',
  components: { Item },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    onlyOneChild() {
      let vm = this as any
      let children = vm.item.children
      let parent = vm.item
      let showingChildren = []
      let child = null
      if (children) {
        showingChildren = children.filter((item: any) => {
          if (item.hidden) {
            return false
          } else {
            // Temp set(will be used if only has one showing child)
            child = item

            return true
          }
        })
      }

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return child
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        child = { ...parent, /*: '',*/ noShowingChildren: true }
        return child
      }

      return null
    }
  },
  // methods: {
  //   hasOneShowingChild(children: any[] = [], parent: any) {
  //     let showingChildren = []
  //     if (children) {
  //       showingChildren = children.filter((item) => {
  //         if (item.hidden) {
  //           return false
  //         } else {
  //           // Temp set(will be used if only has one showing child)
  //           this.onlyOneChild = item

  //           return true
  //         }
  //       })
  //     }

  //     // When there is only one child router, the child router is displayed by default
  //     if (showingChildren.length === 1) {
  //       return true
  //     }

  //     // Show parent if there are no child router to display
  //     if (showingChildren.length === 0) {
  //       this.onlyOneChild = { ...parent, /*: '',*/ noShowingChildren: true }
  //       return true
  //     }

  //     return false
  //   }
  // }
})
</script>
