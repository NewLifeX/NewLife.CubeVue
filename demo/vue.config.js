const path = require('path')

// 拼接路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set(
      'newlife-cube-vueui',
      resolve('src/newlife-cube-vueui')
    )
  },
}
