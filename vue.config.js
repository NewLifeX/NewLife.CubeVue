const isProduction = process.env.NODE_ENV === 'production'
console.log(isProduction)

module.exports = {
  chainWebpack: (config) => {
    // console.log(config.plugins.store)
    if (isProduction) {
      // 如果是生产环境，将在index.html中自动引用下面的js、css
      // const htmlPlugin = config.plugin('html')
      // if (htmlPlugin.store.get('plugin')) {
      // htmlPlugin.tap((args) => {
      //   // args[0].title = '这里设置标题'
      //   args[0].cdn = {
      //     js: [
      //       'https://cdn.jsdelivr.net/npm/vue',
      //       'https://unpkg.com/vue-router/dist/vue-router.js',
      //       'https://cdn.bootcss.com/vuex/3.6.2/vuex.min.js',
      //       'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js',
      //       'https://unpkg.com/element-ui@2.15.0/lib/index.js',
      //     ],
      //     css: [
      //       'https://unpkg.com/element-ui@2.15.0/lib/theme-chalk/index.css',
      //     ],
      //   }
      //   console.log(args[0])
      //   return args
      // })
      // }
    }
  },
  configureWebpack: (config) => {
    if (isProduction) {
      config.externals = {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'element-ui': 'ELEMENT',
        'json-bigint': 'JsonBigint'
      }
    }
  }
}
