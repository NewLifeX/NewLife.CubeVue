<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="基本信息" name="UserInfo">
      <div class="objform">
        <el-form
          label-position="right"
          label-width="120px"
          ref="form"
          :model="form"
        >
          <el-form-item label="头像" prop="avatar">
            <img
              v-if="form.avatar"
              style="height: 100px; width: 100px"
              :src="$store.getters.urls.baseUrl + form.avatar"
            />
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="显示名" prop="displayName">
            <el-input v-model="form.displayName"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" filterable>
              <el-option :key="0" label="未知" :value="0"></el-option>
              <el-option :key="1" label="男" :value="1"></el-option>
              <el-option :key="2" label="女" :value="-1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" prop="mail">
            <el-input v-model="form.mail"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="代码" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="name">
            <span>{{ form.roleNames }}</span>
          </el-form-item>
          <el-form-item label="登录次数" prop="name">
            <span>{{ form.logins }}</span>
          </el-form-item>
          <el-form-item label="最后登录时间" prop="name">
            <span>{{ form.lastLogin }}</span>
          </el-form-item>
          <el-form-item label="最后登录IP" prop="name">
            <span>{{ form.lastLoginIP }}</span>
          </el-form-item>

          <el-form-item prop label-name>
            <div
              style="
                position: fixed;
                margin: 30px;
                float: right;
                bottom: 0px;
                right: 0px;
                z-index: 1;
              "
            >
              <el-button type="primary" @click="confirm">保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane label="修改密码" name="ChangePassword">
      <div class="objform">
        <el-form
          label-position="right"
          label-width="120px"
          ref="form2"
          :model="form2"
        >
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="password" v-model="form2.oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="form2.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="newPassword2">
            <el-input type="password" v-model="form2.newPassword2"></el-input>
          </el-form-item>
          <el-form-item prop label-name>
            <div
              style="
                position: fixed;
                margin: 30px;
                float: right;
                bottom: 0px;
                right: 0px;
                z-index: 1;
              "
            >
              <el-button type="primary" @click="confirm2">保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane label="第三方授权" name="OAuthConfig">3</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: ['path'],
  data() {
    return {
      form: {} as any,
      form2: {} as any,
      properties: [],
      activeName: 'UserInfo',
    };
  },
  computed: {
    currentPath() {
      return this.path;
    },
  },
  watch: {
    $route: {
      handler() {
        this.init();
      },
      immediate: true,
    },
  },
  methods: {
    init() {
      this.query();
    },
    query() {
      const vm = this as any;
      vm.$api.user.getUserInfo().then((resp: any) => {
        const data = resp.data;
        // 设置用户信息，本页修改信息后再掉此方法刷新
        vm.$store.dispatch('setUserInfo', data);
        vm.form = data;
      });
    },
    confirm() {
      let vm = this as any;
      vm.$api.user.updateUserInfo(vm.form).then(() => {
        const msg = '保存成功';

        vm.$message({
          message: msg,
          type: 'success',
          duration: 3 * 1000,
        });

        // 刷新用户信息
        vm.query();
      });
    },
    confirm2() {
      let vm = this as any;
      vm.$api.user.changePassword(vm.form2).then(() => {
        const msg = '保存成功';

        vm.$message({
          message: msg,
          type: 'success',
          duration: 3 * 1000,
        });

        vm.form2 = {};
      });
    },
  },
});
</script>

<style scoped>
.objform {
  max-height: -moz-calc(100vh - 200px);
  max-height: -webkit-calc(100vh - 200px);
  max-height: calc(100vh - 200px);
  overflow: auto;
  box-shadow: 1px 1px 4px rgb(0 21 41 / 8%);
}

.objform h2 {
  margin: 35px 0;
}

.el-input,
.el-switch {
  width: 380px;
  margin-right: 15px;
}
</style>
