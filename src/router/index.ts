import fileContext from '@/services/file-context';
import {
  createRouter as create,
  createWebHashHistory,
  NavigationGuardWithThis,
  NavigationHookAfter,
  Router,
  RouterOptions,
} from 'vue-router';
import beforeEachFn from './beforeEach';

const Layout = () => import('@/layouts/index.vue');

export const constantRouterMap = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path*',
  //       component: () => import('src/views/redirect'),
  //     },
  //   ],
  // },
  {
    path: '/login',
    component: () => Promise.resolve(fileContext('@/views/account/login.vue')),
    hidden: true,
  },
  {
    path: '/auth-redirect',
    component: () =>
      Promise.resolve(fileContext('@/views/account/auth-redirect.vue')),
    hidden: true,
  },
  {
    path: '',
    redirect: '/Admin/User/Info',
    component: Layout,
    children: [
      {
        path: '/Admin/User/Info',
        component: () =>
          Promise.resolve(fileContext('@/views/Admin/User/info.vue')),
        name: 'UserInfo',
        meta: {
          title: '个人信息',
          noCache: true,
        },
      },
    ],
  },
  // {
  //   path: '/404',
  //   component: () => import('src/views/errorPage/404'),
  //   hidden: true,
  // },
  // {
  //   path: '/401',
  //   component: () => import('src/views/errorPage/401'),
  //   hidden: true,
  // },
  {
    path: '',
    component: Layout,
    // redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () =>
          Promise.resolve(fileContext('@/views/Admin/Index/Main.vue')),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
          noCache: true,
        },
      },
    ],
  },
  {
    path: '/Admin/Index/Main',
    redirect: 'dashboard',
  },
];

export const asyncRouterMap = [
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];

export const routerOptions = {
  history: createWebHashHistory(),
  scrollBehavior: () => ({
    top: 0,
  }),
  routes: constantRouterMap,
};

/**
 * 安装路由
 * @param app vue app实例
 * @param options 配置方法，可自定义修改
 * @beforeEach 路由前执行，比如 (to, from, next)=>{}
 * @returns Router实例
 */
export const createRouter = (
  app: any,
  configure: ((routerOptions: RouterOptions) => void) | undefined | null = null,
  beforeEach: NavigationGuardWithThis<undefined> | undefined | null = null,
  afterEach: NavigationHookAfter | undefined | null = null,
): Router => {
  if (configure) {
    configure(routerOptions);
  }

  const router = create(routerOptions);
  app.use(router);

  if (beforeEach) {
    router.beforeEach(beforeEach);
  } else {
    router.beforeEach(beforeEachFn);
  }

  if (afterEach) {
    router.afterEach(afterEach);
  }

  return router;
};
