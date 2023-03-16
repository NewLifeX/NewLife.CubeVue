<template>
  <pro-layout
    :locale="locale"
    v-bind="layoutConf"
    v-model:openKeys="state.openKeys"
    v-model:collapsed="state.collapsed"
    v-model:selectedKeys="state.selectedKeys"
  >
    <template #rightContentRender>
      <div style="margin-right: 12px; display: flex; align-items: center">
        <el-dropdown class="avatar-container right-menu-item" trigger="hover">
          <div class="avatar-wrapper">
            <span>
              <img
                :src="myAvatar"
                style="
                  cursor: pointer;
                  width: 35px;
                  height: 35px;
                  border-radius: 10px;
                "
              />
            </span>
            <span class="user-info">
              {{ userInfo && userInfo.displayName }}
              <!-- <br />
              [{{ userInfo && userInfo.roleNames }}] -->
            </span>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="avatar-dropdown">
              <router-link to="/">
                <el-dropdown-item>
                  <span style="display: inline-block">首页</span>
                </el-dropdown-item>
              </router-link>

              <router-link to="/Admin/User/Info">
                <el-dropdown-item divided>
                  <span style="display: inline-block">个人信息</span>
                </el-dropdown-item>
              </router-link>

              <el-dropdown-item divided>
                <span style="display: block" @click="logout">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>

    <template #breadcrumbRender="{ route, params, routes }">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{ 1111 }}
      </span>
      <router-link v-else :to="{ path: route.path, params }">
        {{ 2222 }}
      </router-link>
    </template>

    <router-view />
  </pro-layout>
</template>

<script setup lang="ts">
import ProLayout from '@ant-design-vue/pro-layout';
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const locale = (i18n: string) => i18n;

function getMenu(routers: any) {
  // 不展示的菜单过滤掉，部分菜单传进去后渲染报错
  const list = routers.filter((item: any) => item.visible === true);
  return list.map((item: any) => {
    if (item.children) {
      return {
        ...item,
        meta: {
          ...item.meta,
          title: item.displayName,
        },
        children: getMenu(item.children),
      };
    }

    return {
      ...item,
      meta: {
        ...item.meta,
        title: item.displayName,
      },
    };
  });
}

const menus = computed(() => {
  return getMenu(store.getters.menuRouters);
  //   return [
  //     {
  //       path: '/Admin',
  //       name: 'Admin',
  //       meta: {
  //         title: 'menu.result.success',
  //       },
  //       children: [
  //         {
  //           path: '/Admin/User/Info',
  //           name: 'UserInfo',
  //           meta: {
  //             title: 'menu.result.success',
  //           },
  //         },
  //         {
  //           path: '/Admin/User',
  //           name: 'AdminUser',
  //           meta: {
  //             title: 'menu.result.success',
  //           },
  //         },
  //       ],
  //     },
  //   ];
});

const state = reactive({
  collapsed: false, // default value
  openKeys: ['/dashboard'],
  selectedKeys: ['/welcome'],
});

const layoutConf = reactive({
  title: '魔方',
  logo: '/leaf.png',
  menuData: menus,
  navTheme: 'light',
  headerTheme: 'light',
  layout: 'mix',
});

const userInfo = computed(() => {
  return store.getters.userInfo;
});

const myAvatar = computed(() => {
  let avatar = userInfo.value && userInfo.value.avatar;
  if (avatar) {
    if (avatar.indexOf('http') !== 0) {
      avatar = store.getters.urls.baseUrl + avatar;
    }
    return avatar;
  }

  return '/leaf.png';
});

function logout() {
  store.dispatch('logout');
  location.reload(); // 为了重新实例化vue-router对象 避免bug
}
</script>

<style>
.ant-pro-basicLayout-content {
  height: -moz-calc(100vh - 96px);
  height: -webkit-calc(100vh - 96px);
  height: calc(100vh - 96px);
}
</style>
