<template>
  <div class="navbar">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <div class="left-menu">
      <a href="/">
        <span style="display: inline-block">{{ displayName }}</span>
      </a>
    </div>
    <div class="right-menu">
      <!-- <template v-if="device !== 'mobile'"> -->
      <template>
        <!-- <error-log class="errLog-container right-menu-item" /> -->

        <!-- <el-tooltip content="全屏" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item" />
        </el-tooltip>-->

        <!-- <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select class="international right-menu-item" />
        </el-tooltip>-->

        <!-- <el-tooltip content="换肤" effect="dark" placement="bottom">
          <theme-picker class="theme-switch right-menu-item" />
        </el-tooltip>-->
      </template>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <span>
            <el-avatar :size="35">
              <img v-if="myAvatar" :src="myAvatar" class="user-avatar" />
              <img v-else src="@/assets/img/user.png" />
            </el-avatar>
          </span>
          <span class="user-info">
            {{ userInfo && userInfo.displayName }}
            <br />
            [{{ userInfo && userInfo.roleNames }}]
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
  </div>
</template>

<script lang="ts">
import { ElDropdown } from 'element-plus';
import { defineComponent } from 'vue';
import Hamburger from './hamburger.vue';

export default defineComponent({
  components: {
    Hamburger,
    ElDropdown,
    // Screenfull,
    // SizeSelect,
    // ThemePicker,
  },
  computed: {
    store() {
      return this.$store;
    },
    sidebar() {
      return this.$store.getters.sidebar;
    },
    userInfo() {
      return this.$store.getters.userInfo || {};
    },
    sysConfig() {
      return this.$store.getters.sysConfig;
    },
    urls() {
      return this.$store.getters.urls;
    },
    myAvatar() {
      const vm = this as any;
      let avatar = vm.userInfo && vm.userInfo.avatar;
      if (avatar) {
        if (avatar.indexOf('http') !== 0) {
          avatar = vm.urls.baseUrl + avatar;
        }
        return avatar;
      }
      return '';
    },
    displayName() {
      const vm = this as any;
      if (vm.sysConfig && vm.sysConfig.displayName) {
        return vm.sysConfig.displayName;
      }
      return '';
    },
  },
  methods: {
    toggleSideBar() {
      this.store.dispatch('toggleSideBar');
    },
    logout() {
      const vm = this as any;
      vm.$api.user.logout().then(() => {
        vm.store.dispatch('logout');
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
  },
});
</script>

<style acoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* background: #fff; */
  background: #1d5e91;
  -webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}

.navbar .left-menu {
  line-height: 48px;
  height: 50px;
  float: left;
  padding: 0 10px;
}

.navbar .left-menu a:link {
  font-size: 18px;
}
.navbar .left-menu a:visited {
  text-decoration: none;
  color: #606266;
}

.navbar .hamburger-container {
  line-height: 58px;
  height: 50px;
  float: left;
  padding: 0 10px;
}
.navbar .breadcrumb-container {
  float: left;
}
.navbar .errLog-container {
  display: inline-block;
  vertical-align: top;
}
.navbar .right-menu {
  line-height: 48px;
  float: right;
  height: 100%;
}
.navbar .right-menu:focus {
  outline: none;
}
.navbar .right-menu .right-menu-item {
  display: inline-block;
  margin: 0 8px;
}
.navbar .right-menu .screenfull {
  height: 20px;
}
.navbar .right-menu .international {
  vertical-align: top;
}
.navbar .right-menu .theme-switch {
  vertical-align: 15px;
}
.navbar .right-menu .avatar-container {
  height: 50px;
  margin-right: 30px;
}

.navbar .right-menu .avatar-container .avatar-wrapper {
  margin-top: 5px;
  position: relative;
}
.navbar .right-menu .avatar-container .avatar-wrapper .user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
.navbar .right-menu .avatar-container .avatar-wrapper .user-info {
  max-width: 150px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  vertical-align: top;
  line-height: 16px;
  position: relative;
  top: 1px;
  margin-left: 5px;
  color: #c7c7c7;
}
.navbar .right-menu .avatar-container .avatar-wrapper .el-icon-caret-bottom {
  cursor: pointer;
  position: absolute;
  right: -20px;
  top: 25px;
  font-size: 12px;
  color: #c7c7c7;
}

.avatar-dropdown a:visited {
  text-decoration: none;
  color: #606266;
}
.avatar-dropdown a:hover {
  color: inherit;
}
</style>
