import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import beforeEach from './beforeEach'

const Layout = () => import('@/views/layout/index.vue')

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
    component: () => import('@/views/account/login'),
    hidden: true,
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/account/authRedirect'),
    hidden: true,
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
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/Admin/Index/Main.vue'),
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
]

export const asyncRouterMap = [
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRouterMap,
})

router.beforeEach(beforeEach)

export default router
