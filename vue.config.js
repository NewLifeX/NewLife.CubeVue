const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction);

module.exports = {
  chainWebpack: (config) => {},
  configureWebpack: (config) => {
    if (isProduction) {
      config.externals = {
        vue: {
          root: 'Vue', // 指向全局变量
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue',
        },
        vuex: {
          root: 'Vuex', // 指向全局变量
          commonjs: 'vuex',
          commonjs2: 'vuex',
          amd: 'vuex',
        },

        'vue-router': {
          root: 'VueRouter', // 指向全局变量
          commonjs: 'vue-router',
          commonjs2: 'vue-router',
          amd: 'vue-router',
        },
        axios: 'axios',
        'element-plus': {
          root: 'ElementPlus', // 指向全局变量
          commonjs: 'element-plus',
          commonjs2: 'element-plus',
          amd: 'element-plus',
        },
        '@element-plus/icons-vue': {
          root: 'ElementPlusIcons', // 指向全局变量
          commonjs: '@element-plus/icons-vue',
          commonjs2: '@element-plus/icons-vue',
          amd: '@element-plus/icons-vue',
        },
      };
    }

    // 源码映射，用于调试
    config.devtool = 'source-map';
  },
};
