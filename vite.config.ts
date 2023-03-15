import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'CubeUI',
      fileName: (format) => `CubeUI.js`,
      formats: ['es'],
    },
    sourcemap: true,
    rollupOptions: {
      external: [
        '@element-plus/icons-vue',
        '@ant-design-vue/pro-layout',
        '@ant-design/icons-vue',
        'axios',
        'element-plus',
        'vue',
        'vue-router',
        'vuex',
      ],
      output: {
        exports: 'named',
        globals: {
          '@element-plus/icons-vue': 'ElementPlusIconsVue',
          '@ant-design-vue/pro-layout': 'ProLayout',
          '@ant-design/icons-vue': 'IconsVue',
          axios: 'axios',
          'element-plus': 'ElementPlus',
          vue: 'Vue',
          'vue-router': 'VueRouter',
          vuex: 'Vuex',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'], // 默认后缀支持vue
  },
  plugins: [
    vue({}),
    vueJsx(),
    //  vueCubePlugin()
  ],
});
