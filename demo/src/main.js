import { createCubeUI, fileContext } from 'CubeUI';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import '../lib/CubeUI.css';
import App from './App.vue';

let cubeUI = createCubeUI();

const app = createApp(App);
app.use(cubeUI);

let store = app.config.globalProperties.$store;

// 注册组件
const files = require.context('@/', true, /^.*\.(vue|tsx)$/);
store.dispatch('setFiles', files);

fileContext.addFiles(files);

// store.dispatch('setUrls', { baseUrl: 'http://localhost:5000' })
store.dispatch('setUrls', { baseUrl: 'https://cube.newlifex.com' });

app.mount('#app');
