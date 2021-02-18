<template>
  <div class="navbar">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <div class="left-menu">{{ displayName }}</div>
    <div class="right-menu">
      <span class="right-menu-item">{{ userInfo.displayName }}</span>
    </div>
    <div class="right-menu">
      <!-- <template v-if="device !== 'mobile'"> -->
      <template>
        <!-- <error-log class="errLog-container right-menu-item" /> -->

        <!-- <el-tooltip content="全屏" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item" />
        </el-tooltip> -->

        <!-- <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select class="international right-menu-item" />
        </el-tooltip> -->

        <!-- <el-tooltip content="换肤" effect="dark" placement="bottom">
          <theme-picker class="theme-switch right-menu-item" />
        </el-tooltip> -->
      </template>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="myAvatar" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <!-- <a target="_blank" href="https://github.com/xxred/Easy.Admin">
            <el-dropdown-item>
              项目地址
            </el-dropdown-item>
          </a> -->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/views/layout/components/hamburger'
// import SizeSelect from 'src/components/SizeSelect'
// import ThemePicker from 'src/components/ThemePicker'

export default {
  components: {
    Hamburger,
    // Screenfull,
    // SizeSelect,
    // ThemePicker,
  },
  computed: {
    ...mapGetters(['sidebar', 'userInfo', 'sysConfig', 'urls']),
    myAvatar() {
      let vm = this
      let avatar = vm.userInfo.avatar
      if (avatar) {
        if (avatar.indexOf('http') !== 0) {
          avatar = vm.urls.baseUrl + avatar
        }
        return avatar
      }
      return 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
    },
    displayName() {
      let vm = this
      if (vm.sysConfig && vm.sysConfig.displayName) {
        return vm.sysConfig.displayName
      }
      return ''
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('Logout').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
  },
}
</script>

<style acoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  -webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}

.navbar .left-menu {
  line-height: 48px;
  height: 50px;
  float: left;
  padding: 0 10px;
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
  border-radius: 10px;
}
.navbar .right-menu .avatar-container .avatar-wrapper .el-icon-caret-bottom {
  cursor: pointer;
  position: absolute;
  right: -20px;
  top: 25px;
  font-size: 12px;
}
</style>
