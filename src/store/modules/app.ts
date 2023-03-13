import urls from '@/api/constant';
import Storage from '@/utils/storage';
const loginConfig = Storage.getItem('loginConfig');
const app = {
  state: {
    layout: 'layout-default',
    sidebar: {
      opened: true, // !+Storage.getItem('sidebarStatus'),
      withoutAnimation: false,
    },
    device: 'desktop',
    size: Storage.getItem('size') || 'default',
    urls,
    // 系统配置
    sysConfig: undefined,
    // 登录页面配置
    loginConfig: loginConfig ? JSON.parse(loginConfig) : null,
    // 是否隐藏布局
    hiddenLayout: false,
    // 信息弹窗
    message: undefined,
    // 确认框弹窗
    messageBox: undefined,
  },
  mutations: {
    TOGGLE_SIDEBAR: (state: any) => {
      if (state.sidebar.opened) {
        Storage.setItem('sidebarStatus', 1);
      } else {
        Storage.setItem('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    },
    CLOSE_SIDEBAR: (state: any, withoutAnimation: any) => {
      Storage.setItem('sidebarStatus', 1);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state: any, device: any) => {
      state.device = device;
    },
    SET_SIZE: (state: any, size: any) => {
      state.size = size;
      Storage.setItem('size', size);
    },
    SET_URLS: (state: any, urls: any) => {
      Object.assign(state.urls, urls);
    },
    SET_SYSCONFIG: (state: any, cfg: any) => {
      state.sysConfig = cfg;
    },
    SET_LOGINCONFIG: (state: any, cfg: any) => {
      state.loginConfig = cfg;
      Storage.setItem('loginConfig', JSON.stringify(cfg));
    },
    SET_HIDDENLAYOUT: (state: any, hidden: any) => {
      state.hiddenLayout = hidden;
    },
    SET_MESSAGE: (state: any, message: any) => {
      state.message = message;
    },
    SET_MESSAGEBOX: (state: any, messageBox: any) => {
      state.messageBox = messageBox;
    },
  },
  actions: {
    toggleSideBar({ commit }: any) {
      commit('TOGGLE_SIDEBAR');
    },
    closeSideBar({ commit }: any, { withoutAnimation }: any) {
      commit('CLOSE_SIDEBAR', withoutAnimation);
    },
    toggleDevice({ commit }: any, device: any) {
      commit('TOGGLE_DEVICE', device);
    },
    setSize({ commit }: any, size: any) {
      commit('SET_SIZE', size);
    },
    setUrls({ commit }: any, urls: any) {
      commit('SET_URLS', urls);
    },
    setHiddenLayout({ commit }: any, hidden: any) {
      commit('SET_HIDDENLAYOUT', hidden);
    },
    setSysConfig({ commit }: any, cfg: any) {
      commit('SET_SYSCONFIG', cfg);
    },
    setLoginConfig({ commit }: any, cfg: any) {
      commit('SET_LOGINCONFIG', cfg);
    },
    setMessage({ commit }: any, message: any) {
      commit('SET_MESSAGE', message);
    },
    setMessageBox({ commit }: any, messageBox: any) {
      commit('SET_MESSAGEBOX', messageBox);
    },
  },
};

export default app;
