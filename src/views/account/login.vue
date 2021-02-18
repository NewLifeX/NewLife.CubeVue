<template>
  <el-row type="flex" justify="center">
    <el-col class="login-col">
      <!-- Login -->
      <div>
        <!-- Logo-->
        <el-row>
          <el-col :span="24" class="login-logo">
            <i class="el-icon-cloudy"></i>
          </el-col>
        </el-row>
        <template v-if="setting.allowLogin">
          <el-form :model="loginForm" size="medium" class="cube-login">
            <!-- 登录-->
            <span class="heading text-primary"
              >{{ sysConfig.displayName }} 登录</span
            >
            <el-form-item label="">
              <el-input
                v-model="loginForm.username"
                placeholder="用户名 / 邮箱"
                prefix-icon="el-icon-user"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="">
              <el-input
                v-model="loginForm.password"
                placeholder="密码"
                prefix-icon="el-icon-lock"
                show-password
              >
              </el-input>
            </el-form-item>
            <el-form-item label="">
              <el-checkbox
                class="text text-primary"
                v-model="loginForm.remember"
                >记住我</el-checkbox
              >

              <template v-if="setting.allowRegister">
                <div
                  style="display: inline-block; margin-top: 5px; float: right;"
                >
                  <a
                    href="#Register"
                    data-toggle="tab"
                    style="margin-left: auto; margin-right: auto; position: static; font-size: 15px; margin-top: 5px;"
                  >
                    <span>我要注册</span>
                  </a>
                </div>
              </template>
            </el-form-item>
          </el-form>

          <button class="btn" @click="login">
            登录
          </button>
        </template>
      </div>
      <!-- Login3 -->
      <div v-if="setting.autoRegister && ms.length > 0">
        <el-row>
          <el-col :span="24" class="text-center">
            <p class="login3">
              <span class="left"></span>
              第三方登录
              <span class="right"></span>
            </p>
            <el-row>
              <el-col :sm="24">
                <template v-for="(mi, i) in ms">
                  <a :key="i" @click="ssoClick(getUrl(mi))">
                    {{ mi.name }}
                  </a>
                </template>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['sysConfig', 'urls']),
    redirect() {
      return this.$route.query.redirect
    },
  },
  data() {
    return {
      loginForm: {
        username: null,
        password: null,
        remember: true,
      },
      setting: {
        allowLogin: true,
        allowRegister: true,
        autoRegister: true,
      },
      ms: [
        {
          name: 'NewLife',
        },
      ],
      dic: {
        newLife: '新生命',
        baidu: '百度',
        weixin: '微信',
        taobao: '淘宝',
        ding: '钉钉',
      },
    }
  },
  methods: {
    login() {
      let vm = this
      vm.$store
        .dispatch('Login', vm.loginForm)
        .then(() => {
          vm.$router.push({ path: vm.redirect || '/' })
        })
        .catch(() => {})
    },
    ssoClick(url) {
      location.href = this.urls.baseUrl + url
      // location.href = urls.ssoUrl + url
    },
    getUrl(mi) {
      console.log(mi)
      let vm = this
      // let name = 'NewLife.Cube'
      let url = `/Sso/Login?name=${mi.name}&state=front-end`
      // let url = `/sso/authorize?response_type=token&client_id=${name}`
      let redirect_uri = encodeURIComponent(
        location.origin +
          '/auth-redirect' +
          (vm.redirect ? '?redirect=' + vm.redirect : '')
      )
      url += `&redirect_uri=${redirect_uri}`
      return url
    },
    getName(mi) {
      let vm = this
      let nickName = vm.dic[mi.name]
      if (nickName == null) {
        nickName = mi.name
      }
      return nickName
    },
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
  },
}
</script>

<!-- Login -->
<style scoped>
.login-logo {
  text-align: center;
  font-size: 130px;
  color: #4ca6ff;
  margin-top: 50px;
}

.cube-login {
  background: #fff;
  padding-bottom: 0;
  border-radius: 15px;
  text-align: center;
}

.cube-login .heading {
  display: block;
  font-size: 24px;
  font-weight: 700;
  padding: 5px 0;
  margin-bottom: 20px;
  text-align: center;
}

.cube-login input {
  border-radius: 20px;
  box-shadow: none;
  padding: 0 20px 0 45px;
  height: 40px;
  transition: all 0.3s ease 0s;
}

.cube-login .text {
  float: left;
  margin-left: 7px;
  line-height: 20px;
  padding-top: 5px;
  text-transform: capitalize;
}

.cube-login a {
  position: absolute;
  top: 12px;
  right: 0px;
  font-size: 17px;
  color: #c8c8c8;
  transition: all 0.5s ease 0s;
  color: #4ca6ff;
}

.el-input input {
  border-radius: 20px;
  box-shadow: none;
  padding: 0 20px 0 45px;
  height: 40px;
  transition: all 0.3s ease 0s;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
}

.btn {
  float: right;
  font-size: 14px;
  color: #fff;
  background: #00b4ef;
  /* border-radius: 30px; */
  border-radius: 4px;
  padding: 8px 50px;
  border: none;
  text-transform: capitalize;
  transition: all 0.5s ease 0s;
  margin: -25px 0 15px 0;
  width: 100%;
}

.text-primary {
  color: #337ab7;
}

label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: 700;
}
</style>
<!-- Login3 -->
<style scoped>
.text-center {
  text-align: center;
}

p.login3 {
  font-size: 22px;
  position: relative;
  width: 100%;
  color: #333;
}

p.login3 span {
  height: 1px;
  position: absolute;
  background-color: #928f8f;
  width: 35%;
  top: 50%;
}

p.login3 span.right {
  right: 65%;
}

p.login3 span.left {
  left: 65%;
}

@media screen and (max-width: 680px) {
  .login-col {
    width: 80%;
  }
}

@media screen and (min-width: 680px) and (max-width: 1680px) {
  .login-col {
    width: 30%;
  }
}

@media screen and (min-width: 1680px) {
  .login-col {
    width: 445px;
  }
}
</style>
