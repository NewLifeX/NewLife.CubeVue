// import { createApp } from 'vue'
// import App from './App.vue'
import { createCubeUI } from './index';

import 'element-plus/dist/index.css';

// export const router: RouterConfig = {
//   // @ts-ignore
//   scrollBehavior(to, from) {
//     console.log('scrollBehavior', to, from);
//   },
// };

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
}
