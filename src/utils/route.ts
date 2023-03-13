import Layout from '@/layouts/index.vue';
import { h } from 'vue';

/**
 * 将菜单转化成路由
 * @param {*} routes 请求返回菜单
 */
export function formatRoutes(files: any, routes: any[], depth = 0) {
  routes.forEach((router) => {
    router.path = router.url;
    if (router.path.startsWith('~')) {
      router.path = router.path.substr(1);
    }
    router.displayName = router.displayName || router.name;
    if (router.visible === undefined) {
      console.log(router.name + ' visible为空');
    }
    if (router.meta) {
      router.meta.menuId = router.id;
      router.meta.permissions = router.permissions;
    } else {
      router.meta = { menuId: router.id, permissions: router.permissions };
    }

    // 第一层使用布局模板
    if (depth === 0) {
      // 如果是第一层，使用布局模板
      // TODO 如果页面自身指定了layout，则使用自身的layout
      router.component = () => Promise.resolve(h(Layout, {}));
    } else {
      // 处理名称，避免冲突
      router.name = router.path.replace(/\//g, '');

      // 目前只按照两层处理
      let filePath = `@/views${router.path}/list.vue`;
      // router.component = () => import('@/views/common/list.vue')
      // router.component = () => {
      //   return <div>123</div>
      // }
      // router.component = () => Promise.resolve(files('@/views/common/list.vue'))

      router.component = () => {
        // 先尝试加载自定义视图，不存在使用默认视图
        // 同时注入同目录下的config.ts文件

        let props = {};
        const configPath = `@/views${router.path}/config.tsx`;

        if (files.resolve(configPath)) {
          props = files(configPath);
        }

        if (!files.resolve(filePath)) {
          filePath = '@/views/common/list.vue';
        }

        return Promise.resolve(h(files(filePath).default, { ...props }));
      };

      // 添加、编辑页路由
      routes.push(getEditRoute(files, router, router.path));
    }

    let children = router.children;
    if (children && children instanceof Array) {
      router.hasChildren = true;
      children = formatRoutes(files, children, depth + 1);
    } else {
      router.hasChildren = false;
    }

    router.children = children;
  });

  return routes;
}

function getEditRoute(files: any, router: any, path: string) {
  // 添加、编辑页路由
  const r = {
    visible: false,
    path: `${path}/:type(Edit|Add|Detail)/:id?`,
    // path: `User/Edit/:id?`,
    name: router.name + 'Form',
    isFormRoute: true, // 是否表单路由
    component: () => {
      // 先尝试加载自定义视图，不存在使用默认视图
      const filePath = `@/views${path}/form.vue`;
      if (files.resolve(filePath)) {
        return Promise.resolve(files(filePath));
      } else {
        return Promise.resolve(files('@/views/common/form.vue'));
      }
    },
  };

  return r;
}
