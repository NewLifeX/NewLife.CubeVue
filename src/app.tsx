// import { createApp } from 'vue'
// import App from './App.vue'
import { createCubeUI } from './index';
import { getMenu } from './utils/menu';
import { routerOptions } from './router';
import beforeEachFn from './router/beforeEach';

export const router = {
  // @ts-ignore
  scrollBehavior(to, from) {
    console.log('scrollBehavior', to, from);
  },
};

export function onMounted({ app, router }: any) {
  console.log('onMounted', app, router);
  app.provide('umi-hello', {
    h: 'hello',
    w: 'word',
  });

  const cubeUI = createCubeUI();

  // const app = createApp(App)
  app.use(cubeUI);

  const store = app.config.globalProperties.$store;

  // store.dispatch('setUrls', { baseUrl: 'http://localhost:5000' })
  store.dispatch('setUrls', { baseUrl: 'https://cube.newlifex.com' });

  // 配置路由
  const accessedRouters = getMenu();
  let menuRouters: any[] = [];
  if (accessedRouters && accessedRouters.length > 0) {
    // 设置路由信息
    store.dispatch('generateRoutes', accessedRouters);

    // 添加路由信息
    menuRouters = store.getters.addRouters;
  }

  console.log('addRoute', router, menuRouters);
  for (let i = 0; i < menuRouters.length; i++) {
    router.addRoute(menuRouters[i]);
  }

  for (let i = 0; i < routerOptions.routes.length; i++) {
    router.addRoute(routerOptions.routes[i]);
  }

  router.beforeEach(beforeEachFn);
}
