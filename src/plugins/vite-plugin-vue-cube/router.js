import fileContext from '@/services/file-context';
import { getMenu } from '@/utils/menu';
import { formatRoutes } from '@/utils/route';
import { getToken } from '@/utils/token';
import { createRouter as create, createWebHistory } from 'vue-router';

const whiteList = ['/login', '/auth-redirect']; // no redirect whitelist

let beforeEachFn = (to, from, next) => {
  if (getToken()) {
    // 有token，又去登录页，跳回主页
    if (to.path === '/login') {
      next({
        path: '/',
      });
    } else {
      next();
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
    }
  }
};

const Layout = () => import('@/layouts/default/index.vue');

// 尝试从本地缓存加载菜单
const accessedRouters = getMenu();
let menuRouters = [];
if (accessedRouters && accessedRouters.length > 0) {
  menuRouters = formatRoutes(fileContext, accessedRouters);
}

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
    component: () => import('@/views/account/login.vue'),
    hidden: true,
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/account/auth-redirect.vue'),
    hidden: true,
  },
  {
    path: '',
    redirect: '/Admin/User/Info',
    component: Layout,
    children: [
      {
        path: '/Admin/User/Info',
        component: () => import('@/views/Admin/User/info.vue'),
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
  history: createWebHistory(),
  scrollBehavior: () => ({
    top: 0,
  }),
  routes: accessedRouters.concat(constantRouterMap),
};

/**
 * 安装路由
 * @param app vue app实例
 * @param options 配置方法，可自定义修改
 * @beforeEach 路由前执行，比如 (to, from, next)=>{}
 * @returns Router实例
 */
export const createRouter = (
  app,
  configure = null,
  beforeEach = null,
  afterEach = null,
) => {
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

export const useRouter = (
  configure = null,
  beforeEach = null,
  afterEach = null,
) => {
  return {
    install(app) {
      createRouter(app, configure, beforeEach, afterEach);
    },
  };
};
