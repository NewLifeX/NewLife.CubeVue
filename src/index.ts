import { createApi } from '@/api';
import LayoutAntdv from '@/layouts/antdv/index.vue';
import { AppMain, Navbar, Sidebar } from '@/layouts/default/components/index';
import LayoutDefault from '@/layouts/default/index.vue';
import '@/styles/index.scss'; // global css
import { createAxios } from '@/utils/request';
import * as ElementIcons from '@element-plus/icons-vue';
import * as Element from 'element-plus';
import { createRouter } from './router';
import { fileContext } from './services/file-context';
import { createStore } from './store';
import { getMenu } from './utils/menu';

// const files = require.context('@/', true, /^.*\.(vue|tsx)$/);
// tslint:disable-next-line:whitespace
const files = import.meta.glob('@/**/*.(vue|tsx)', { eager: true });

// 注入视图文件
fileContext.addFiles(files);

const install: any = (app: any) => {
  if (install.installed) {
    return;
  }
  install.installed = true;

  app.component('LayoutDefault', LayoutDefault);
  app.component('LayoutAntdv', LayoutAntdv);
  app.component('Navbar', Navbar);
  app.component('Sidebar', Sidebar);
  app.component('AppMain', AppMain);

  const store = createStore(app);

  // 注册组件
  store.dispatch('setFiles', files);

  // 注册请求封装和api，注入$http
  const axios = createAxios(app, undefined, (options) => {
    // options.response = (res) => {
    //   return Promise.resolve(res)
    // }
    // options.responseError = (err) => {}
  });
  axios.interceptors.request.use((config) => {
    config.baseURL = store.getters.urls.getBaseUrl();
    return config;
  });

  // 创建api，公用接口,注入$api
  createApi(app, axios);

  store.dispatch('setMessage', Element.ElMessage);
  store.dispatch('setMessageBox', Element.ElMessageBox);

  // 尝试从本地缓存加载菜单
  const accessedRouters = getMenu();
  let menuRouters: any[] = [];
  if (accessedRouters && accessedRouters.length > 0) {
    // 设置路由信息
    store.dispatch('generateRoutes', accessedRouters);

    // 添加路由信息
    menuRouters = store.getters.addRouters;
  }

  // 配置路由
  const router = createRouter(app, (options) => {
    // options.history = createWebHashHistory()
    // 从本地缓存加载的路由必须在这里添加
    // 否则在已登录的情况，先进行导航再动态添加路由，导致找不到页面
    options.routes = menuRouters.concat(options.routes);
  });

  app.use(Element, { size: store.state.app.size });
  for (const key in ElementIcons) {
    if (Object.prototype.hasOwnProperty.call(ElementIcons, key)) {
      const e = (ElementIcons as any)[key];
      app.component(e.name, e);
    }
  }

  app.config.globalProperties.$message = Element.ElMessage;
  app.config.globalProperties.$messageBox = Element.ElMessageBox;
  app.config.globalProperties.$warn = (config: any) => {
    Element.ElMessage.warning(config);
  };

  // 注入的计算属性自动解包
  app.config.unwrapInjectedRef = true;
};

export const createCubeUI = () => {
  return {
    install,
  };
};
export default {
  version: '1.0',
  install,
};

export * from './components/index';
export * from './services/file-context';
export * from './utils';
export { LayoutDefault, LayoutAntdv, Navbar, Sidebar, AppMain };
export { createStore, createRouter, createAxios, createApi };
