<template>
  <div>
    <div>{{ typeMap[type] }}</div>
    <el-form
      ref="form"
      v-model="form"
      label-position="right"
      label-width="120px"
      :inline="true"
      class="form-container"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="启用" prop="enable">
        <el-switch
          v-model="form.enable"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </el-form-item>
      <el-form-item label="系统" prop="isSystem">
        <el-switch
          v-model="form.isSystem"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input :rows="4" type="textarea" v-model="form.remark" />
      </el-form-item>

      <el-form-item>
        <div
          style="
            position: fixed;
            margin: 20px;
            float: right;
            bottom: 0px;
            right: 0px;
            z-index: 1;
          "
        >
          <el-button @click="returnIndex">返回</el-button>
          <el-button type="primary" @click="confirm">保存</el-button>
        </div>
      </el-form-item>
      <el-table
        v-if="!isAdd"
        :data="tableData"
        :tree-props="{
          children: 'children',
          hasChildren: 'hasChildren',
        }"
        row-key="id"
        border
        default-expand-all
      >
        >
        <el-table-column prop="name" label="名称" width="200" />
        <el-table-column prop="displayName" label="显示名" width="100" />
        <!-- <el-table-column label="授权" width="60">
          <template v-slot="scope">
            <el-checkbox
              v-model="form['p' + scope.row.id]"
              @change="handleCheckAllChange"
            />
          </template>
        </el-table-column>-->
        <el-table-column label="操作">
          <template v-slot="scope">
            <template v-if="Object.entries(scope.row.permissions).length > 0">
              <el-checkbox
                :indeterminate="imObj[scope.row.id]"
                v-model="form['p' + scope.row.id]"
                @change="checkAllChange(scope.row)"
              >
                全选
              </el-checkbox>
              <el-checkbox
                v-for="(item, key) in scope.row.permissions"
                :key="scope.row.id + '' + key"
                :label="item"
                v-model="form['pf' + scope.row.id + '_' + key]"
                @change="checkChange(scope.row)"
              ></el-checkbox>
            </template>
            <template v-else>
              <!-- 父级全选 -->
              <el-checkbox
                :indeterminate="imObj[scope.row.id]"
                v-model="form['p' + scope.row.id]"
                @change="parentCheckAllChange(scope.row)"
              >
                全选
              </el-checkbox>
              <!-- <el-checkbox>读写</el-checkbox> -->
              <el-checkbox
                v-model="form['pc_readonly_' + scope.row.id]"
                @change="roCheck(scope.row)"
              >
                只读
              </el-checkbox>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      form: {} as any,
      fields: [],
      imObj: {} as any, // 父级全选半选状态
      typeMap: { Add: '新增', Detail: '查看', Edit: '编辑' } as any,
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    currentPath() {
      const vm = this as any;
      const rplStr = `/${vm.type}${vm.id === undefined ? '' : '/' + vm.id}`;
      return this.$route.path.replace(rplStr, '');
    },
    type() {
      return this.$route.params.type as any;
    },
    isAdd() {
      return (this as any).type === 'Add';
    },
    isDetail() {
      return (this as any).type === 'Detail';
    },
    rolePermissions() {
      // 角色菜单权限
      const vm = this;
      // permission格式: 1#255,2#255。#前为菜单id，#后为权限值
      const permission = vm.form.permission;
      const pObj = {} as any;
      if (!permission) {
        return pObj;
      }
      const mlist = permission.split(',');
      for (const key in mlist) {
        if (Object.prototype.hasOwnProperty.call(mlist, key)) {
          const m = mlist[key];
          const p = m.split('#');
          pObj[p[0]] = p[1];
        }
      }
      return pObj;
    },
    tableData() {
      // console.log('init')
      // 角色菜单数据
      const vm = this;
      const menuRouters: any[] = vm.$store.getters.menuRouters;
      const menus: any[] = [];
      menuRouters.map((i: any) => {
        const menu = {
          id: i.id,
          name: i.name,
          displayName: i.displayName,
          permissions: i.permissions,
          parentID: i.parentID,
        } as any;

        // // 父级全选勾选框是否勾选
        // let pCheck = false

        if (i.hasChildren) {
          menu.children = [];
          i.children.map((j: any) => {
            // 表单路由不处理
            if (j.isFormRoute) {
              return;
            }
            const menuChild = {
              id: j.id,
              name: j.name,
              displayName: j.displayName,
              permissions: j.permissions,
              parentID: j.parentID,
            };

            // // 全选勾选框是否勾选，取决于子项是否有勾选
            // let pc = false
            // // 子项勾选个数
            // let checkChildCount = 0

            // // 设置操作勾选框
            // menuChild.permissions.map((p) => {
            //   let c = (p.k & vm.rolePermissions[j.id]) !== 0
            //   if (c) checkChildCount = checkChildCount + 1
            //   vm.form['pf' + j.id + '_' + p.k] = c
            //   pc = pc || c
            // })

            // // 设置全选勾选框
            // vm.form['p' + j.id] = pc
            // pCheck = pCheck || pc

            menu.children.push(menuChild);

            // 更新勾选框状态
            // vm.checkChange(menuChild)
          });
        } else {
          // pCheck = true
        }

        // 设置授权勾选框
        // vm.form['p' + i.id] = pCheck
        menus.push(menu);
      });

      return menus;
    },
  },
  // watch: {
  //   $route: {
  //     handler: function () {
  //       this.init()
  //     },
  //     immediate: true
  //   }
  // },
  created() {
    this.init();
  },
  activated() {
    this.init();
  },
  methods: {
    init() {
      if (!this.isAdd) {
        this.query();
      }
    },
    query() {
      const vm = this;
      vm.$api.base.getDetailData(vm.currentPath, vm.id).then((res: any) => {
        vm.form = res.data;
        vm.allCheckUpdate();
      });
    },
    confirm() {
      const vm = this;
      if (vm.isAdd) {
        vm.$api.base.add(vm.currentPath, vm.form).then(() => {
          vm.$message({
            message: '新增成功',
            type: 'success',
            duration: 5 * 1000,
          });
          vm.$router.go(-1);
        });
      } else {
        vm.$api.base.edit(vm.currentPath, vm.form).then(() => {
          vm.$message({
            message: '保存成功',
            type: 'success',
            duration: 5 * 1000,
          });
          vm.$router.go(-1);
        });
      }
    },
    returnIndex() {
      this.$router.push(this.currentPath);
    },
    checkChange({ id, permissions, parentID }: any) {
      // console.log('checkChange', id)
      // 子权限项勾选，
      const vm = this;
      let pCheck = false;
      let checkCount = 0;
      for (const key in permissions) {
        if (Object.prototype.hasOwnProperty.call(permissions, key)) {
          const c = vm.form['pf' + id + '_' + key];
          if (c) {
            checkCount = checkCount + 1;
          }
          pCheck = pCheck || c;
        }
      }
      // permissions.forEach((e: any) => {
      //   const c = vm.form['pf' + id + '_' + e.k];
      //   if (c) {
      //     checkCount = checkCount + 1;
      //   }
      //   pCheck = pCheck || c;
      // });

      vm.form['p' + id] = pCheck;
      vm.imObj[id] =
        checkCount > 0 && checkCount < Object.entries(permissions).length;

      // 更新父级全选
      vm.parentCheckUpdate(parentID);
    },
    checkAllChange({ id, permissions, parentID }: any) {
      // console.log('checkAllChange', id, permissions)
      // 子权限项全勾选，更新子级级勾选
      const vm = this;
      const pCheck = vm.form['p' + id];
      for (const key in permissions) {
        if (Object.prototype.hasOwnProperty.call(permissions, key)) {
          vm.form['pf' + id + '_' + key] = pCheck;
        }
      }
      // permissions.forEach((e: any) => {
      //   vm.form['pf' + id + '_' + e.k] = pCheck;
      // });

      vm.imObj[id] = false;

      // 更新父级全选
      vm.parentCheckUpdate(parentID);
    },
    parentCheckAllChange({ id, children }: any) {
      // console.log('parentCheckAllChange', id, children)

      // 父级全选，勾选所有子权限项
      const vm = this;
      const pCheck = vm.form['p' + id];
      children.forEach((e: any) => {
        vm.form['p' + e.id] = pCheck;
        vm.checkAllChange({
          id: e.id,
          permissions: e.permissions,
          parentID: e.parentID,
        });
      });

      vm.imObj[id] = false;
    },
    parentCheckUpdate(parentID: any) {
      // console.log('parentCheckUpdate', parentID)

      // 父级勾选状态更新
      const vm = this;
      let parentCheck = false;
      let parentIm = false;
      const parent = vm.tableData.find((f) => f.id === parentID);
      parent.children.forEach((e: any) => {
        const c = vm.form['p' + e.id];
        const im = vm.imObj[e.id];
        parentCheck = parentCheck || c || false;
        parentIm = parentIm || !c || im || false;
        // console.log(parentCheck, !parentIm, !c)
      });

      if (!parentCheck) {
        parentIm = false;
      }

      vm.form['p' + parentID] = parentCheck;
      vm.imObj[parentID] = parentIm;
    },
    roCheck({ id, children }: any) {
      // 只读勾选，勾选所有子权限只读项
      const vm = this;
      const pCheck = vm.form['pc_readonly_' + id];
      children.forEach((e: any) => {
        vm.form['pf' + e.id + '_' + 1] = pCheck;
        vm.checkChange(e);
      });
    },
    allCheckUpdate() {
      // console.log('allCheckUpdate', this.tableData)
      // 更新所有勾选框状态
      const vm = this;
      vm.tableData.map((menu) => {
        // console.log('0', menu)

        // 处理当前菜单权限勾选
        if (menu.permissions) {
          for (const key in menu.permissions) {
            if (Object.prototype.hasOwnProperty.call(menu.permissions, key)) {
              // const p = menu.permissions[key];
              const c =
                // tslint:disable-next-line:no-bitwise
                (parseInt(key, 10) &
                  parseInt(vm.rolePermissions[menu.id], 10)) !==
                0;
              // console.log('allCheckUpdate1', menu.id, p.k, c)
              vm.form['pf' + menu.id + '_' + key] = c;
            }
          }
          // menu.permissions.map((p: any) => {
          //   // console.log('1', p)

          //   let c = (p.k & vm.rolePermissions[menu.id]) !== 0
          //   // console.log('allCheckUpdate1', menu.id, p.k, c)
          //   vm.form['pf' + menu.id + '_' + p.k] = c
          // })
        }

        // 子菜单
        if (menu.children) {
          menu.children.map((j: any) => {
            // console.log('2', j)
            // 设置操作勾选框
            for (const key in j.permissions) {
              if (Object.prototype.hasOwnProperty.call(j.permissions, key)) {
                const p = j.permissions[key];

                const c =
                  // tslint:disable-next-line:no-bitwise
                  (parseInt(key, 10) &
                    parseInt(vm.rolePermissions[j.id], 10)) !==
                  0;
                // console.log('allCheckUpdate2', j.id, p.k, c)

                vm.form['pf' + j.id + '_' + parseInt(key, 10)] = c;
              }
            }
            // j.permissions.map((p: any) => {
            //   // console.log('3', p)

            //   const c = (p.k & vm.rolePermissions[j.id]) !== 0;
            //   // console.log('allCheckUpdate2', j.id, p.k, c)

            //   vm.form['pf' + j.id + '_' + p.k] = c;
            // });
            vm.checkChange(j);
          });
        }
      });
    },
  },
});
</script>

<style scoped>
.form-container {
  margin-left: 50px;
  margin-bottom: 75px;
  max-height: -moz-calc(100vh - 160px);
  max-height: -webkit-calc(100vh - 160px);
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  box-shadow: 1px 1px 4px rgb(0 21 41 / 8%);
}
.el-switch,
.el-input,
.el-textarea {
  width: 220px;
}
</style>
