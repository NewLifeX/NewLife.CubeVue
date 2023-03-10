import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import app1 from './app.js';
import App from './App.vue';
import { createCubeUI } from './index';

const cubeUI = createCubeUI();

const app = createApp(App);
app.use(cubeUI);
app.use(app1);

const store = app.config.globalProperties.$store;

// store.dispatch('setUrls', { baseUrl: 'http://localhost:5000' })
store.dispatch('setUrls', { baseUrl: 'https://cube.newlifex.com' });

console.log('app1', app1);

app.mount('#app');
