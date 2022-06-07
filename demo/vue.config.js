const isProduction = process.env.NODE_ENV === 'production'
console.log(isProduction)

const path = require('path')

// 拼接路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  filenameHashing: false,
  chainWebpack: (config) => {
    config.resolve.alias.set('CubeUI', resolve('src/CubeUI'))
    // console.log(config.plugins.store)
    if (isProduction) {
      // 如果是生产环境，将在index.html中自动引用下面的js、css
      const htmlPlugin = config.plugin('html')
      if (htmlPlugin.store.get('plugin')) {
        htmlPlugin.tap((args) => {
          // args[0].title = '这里设置标题'
          args[0].cdn = {
            js: [
              // 'https://cdn.jsdelivr.net/npm/vue',
              'https://cdn.bootcdn.net/ajax/libs/vue/3.2.20/vue.min.js',
              'https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.12/vue-router.cjs.min.js',
              'https://cdn.bootcdn.net/ajax/libs/vuex/4.0.2/vuex.cjs.min.js',
              'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js',
              'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.8/index.min.js'
            ],
            css: [
              'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.8/theme-chalk/index.min.css'
            ]
          }
          console.log(args[0])
          return args
        })
      }
    }
  },
  configureWebpack: (config) => {
    if (isProduction) {
      config.externals = {
        vue: {
          root: 'Vue', // 指向全局变量
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue'
        },
        // vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'element-ui': 'ELEMENT'
      }
    }

    // 源码映射，用于调试
    config.devtool = 'source-map'
  }
}
